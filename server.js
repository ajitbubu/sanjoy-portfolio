const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const geoip = require('geoip-lite');
const { IP2Location } = require('ip2location-nodejs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize IP2Location database
const dbPath = path.join(__dirname, 'databases', 'IP2LOCATION-LITE-DB11.BIN');
let ip2loc = null;
let ip2locationEnabled = false;
try {
  ip2loc = new IP2Location();
  ip2loc.open(dbPath);
  ip2locationEnabled = true;
  console.log('IP2Location database initialized successfully');
} catch (error) {
  console.error('Failed to initialize IP2Location database:', error.message);
  console.log('Continuing with geoip-lite only...');
}

// Load IPtoASN database
let asnDatabase = [];
const asnDbPath = path.join(__dirname, 'databases', 'ip2asn-v4.tsv');

try {
  const asnData = fs.readFileSync(asnDbPath, 'utf8');
  const lines = asnData.trim().split('\n');
  
  asnDatabase = lines.map(line => {
    const parts = line.split('\t');
    if (parts.length >= 5) {
      return {
        startIP: parts[0],
        endIP: parts[1],
        asn: parts[2] === '0' ? null : parts[2],
        country: parts[3] === 'None' ? null : parts[3],
        description: parts[4] === 'Not routed' ? null : parts[4]
      };
    }
    return null;
  }).filter(entry => entry !== null);
  
  console.log(`IPtoASN database loaded with ${asnDatabase.length} entries`);
} catch (error) {
  console.error('Failed to load IPtoASN database:', error.message);
  asnDatabase = [];
}

// Function to convert IP to integer for range comparison
function ipToInt(ip) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

// Function to lookup ASN data from local database
function lookupASN(ip) {
  if (asnDatabase.length === 0) return null;
  
  const ipInt = ipToInt(ip);
  
  for (const entry of asnDatabase) {
    const startInt = ipToInt(entry.startIP);
    const endInt = ipToInt(entry.endIP);
    
    if (ipInt >= startInt && ipInt <= endInt) {
      return {
        asn: entry.asn ? `AS${entry.asn}` : null,
        organization: entry.description,
        domain: null, // Not available in this database
        country: entry.country
      };
    }
  }
  
  return null;
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Helper function to detect IP version
function getIPVersion(ip) {
  // Remove IPv4-mapped IPv6 prefix if present
  const cleanIP = ip.replace(/^::ffff:/, '');
  
  // IPv4 pattern
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  
  // IPv6 pattern (simplified)
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
  
  if (ipv4Pattern.test(cleanIP)) {
    return 'IPv4';
  } else if (ipv6Pattern.test(ip) || ip.includes(':')) {
    return 'IPv6';
  } else {
    return 'Unknown';
  }
}

// Helper function to get real IP address
function getRealIP(req) {
  return req.headers['x-forwarded-for'] ||
         req.headers['x-real-ip'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         req.ip;
}

// Main API endpoint
app.get('/api/ip-info', async (req, res) => {
  try {
    // Check if IP is provided as query parameter
    let clientIP = req.query.ip;
    
    if (!clientIP) {
      // Get the real IP address
      clientIP = getRealIP(req);
      
      // Handle localhost/development environment
      if (clientIP === '::1' || clientIP === '127.0.0.1' || clientIP === '::ffff:127.0.0.1') {
        // For development, try to get public IP
        try {
          const response = await axios.get('https://api.ipify.org?format=json', { timeout: 5000 });
          clientIP = response.data.ip;
        } catch (error) {
          // Fallback to a sample IP for demonstration
          clientIP = '8.8.8.8';
        }
      }
    }
    
    // Clean the IP (remove IPv6 mapping if present)
    const cleanIP = clientIP.replace(/^::ffff:/, '');
    
    // Get IP version
    const ipVersion = getIPVersion(clientIP);
    
    // Get geolocation data using open source geoip-lite database
    const geo = geoip.lookup(cleanIP);
    
    // Get additional data from IP2Location if available
    let ip2locData = null;
    if (ip2locationEnabled && ip2loc) {
      try {
        ip2locData = ip2loc.getAll(cleanIP);
      } catch (error) {
        console.log('IP2Location lookup failed, using geoip-lite only:', error.message);
        ip2locData = null;
      }
    }  
    // Country code to country name mapping (open source data)
    const countryNames = {
      'US': 'United States', 'CA': 'Canada', 'GB': 'United Kingdom', 'DE': 'Germany',
      'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands', 'BE': 'Belgium',
      'CH': 'Switzerland', 'AT': 'Austria', 'SE': 'Sweden', 'NO': 'Norway', 'DK': 'Denmark',
      'FI': 'Finland', 'PL': 'Poland', 'CZ': 'Czech Republic', 'HU': 'Hungary', 'SK': 'Slovakia',
      'SI': 'Slovenia', 'HR': 'Croatia', 'RS': 'Serbia', 'BG': 'Bulgaria', 'RO': 'Romania',
      'GR': 'Greece', 'CY': 'Cyprus', 'MT': 'Malta', 'LU': 'Luxembourg', 'IE': 'Ireland',
      'PT': 'Portugal', 'IS': 'Iceland', 'LI': 'Liechtenstein', 'MC': 'Monaco', 'SM': 'San Marino',
      'VA': 'Vatican City', 'AD': 'Andorra', 'JP': 'Japan', 'KR': 'South Korea', 'CN': 'China',
      'IN': 'India', 'AU': 'Australia', 'NZ': 'New Zealand', 'BR': 'Brazil', 'MX': 'Mexico',
      'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia', 'PE': 'Peru', 'VE': 'Venezuela',
      'RU': 'Russia', 'UA': 'Ukraine', 'BY': 'Belarus', 'MD': 'Moldova', 'LT': 'Lithuania',
      'LV': 'Latvia', 'EE': 'Estonia', 'TR': 'Turkey', 'IL': 'Israel', 'SA': 'Saudi Arabia',
      'AE': 'United Arab Emirates', 'EG': 'Egypt', 'ZA': 'South Africa', 'NG': 'Nigeria',
      'KE': 'Kenya', 'GH': 'Ghana', 'MA': 'Morocco', 'TN': 'Tunisia', 'DZ': 'Algeria',
      'LY': 'Libya', 'SD': 'Sudan', 'ET': 'Ethiopia', 'UG': 'Uganda', 'TZ': 'Tanzania',
      'ZW': 'Zimbabwe', 'BW': 'Botswana', 'ZM': 'Zambia', 'MW': 'Malawi', 'MZ': 'Mozambique',
      'MG': 'Madagascar', 'MU': 'Mauritius', 'SC': 'Seychelles', 'RE': 'Reunion', 'YT': 'Mayotte'
    };
    
    // Currency mapping (open source data)
    const currencyData = {
      'US': { code: 'USD', name: 'Dollar' }, 'CA': { code: 'CAD', name: 'Canadian Dollar' },
      'GB': { code: 'GBP', name: 'Pound Sterling' }, 'DE': { code: 'EUR', name: 'Euro' },
      'FR': { code: 'EUR', name: 'Euro' }, 'IT': { code: 'EUR', name: 'Euro' },
      'ES': { code: 'EUR', name: 'Euro' }, 'NL': { code: 'EUR', name: 'Euro' },
      'JP': { code: 'JPY', name: 'Yen' }, 'KR': { code: 'KRW', name: 'Won' },
      'CN': { code: 'CNY', name: 'Yuan' }, 'IN': { code: 'INR', name: 'Rupee' },
      'AU': { code: 'AUD', name: 'Australian Dollar' }, 'NZ': { code: 'NZD', name: 'New Zealand Dollar' },
      'BR': { code: 'BRL', name: 'Real' }, 'MX': { code: 'MXN', name: 'Peso' },
      'RU': { code: 'RUB', name: 'Ruble' }, 'TR': { code: 'TRY', name: 'Lira' },
      'IL': { code: 'ILS', name: 'Shekel' }, 'SA': { code: 'SAR', name: 'Riyal' },
      'AE': { code: 'AED', name: 'Dirham' }, 'EG': { code: 'EGP', name: 'Pound' },
      'ZA': { code: 'ZAR', name: 'Rand' }, 'NG': { code: 'NGN', name: 'Naira' }
    };
    
    // Continent mapping (open source data)
    const continentData = {
      'US': 'NA', 'CA': 'NA', 'MX': 'NA', 'GT': 'NA', 'BZ': 'NA', 'SV': 'NA', 'HN': 'NA', 'NI': 'NA', 'CR': 'NA', 'PA': 'NA',
      'CU': 'NA', 'JM': 'NA', 'HT': 'NA', 'DO': 'NA', 'PR': 'NA', 'TT': 'NA', 'BB': 'NA', 'GD': 'NA', 'VC': 'NA', 'LC': 'NA',
      'DM': 'NA', 'AG': 'NA', 'KN': 'NA', 'BS': 'NA',
      'BR': 'SA', 'AR': 'SA', 'CL': 'SA', 'PE': 'SA', 'CO': 'SA', 'VE': 'SA', 'EC': 'SA', 'BO': 'SA', 'PY': 'SA', 'UY': 'SA',
      'GY': 'SA', 'SR': 'SA', 'GF': 'SA', 'FK': 'SA',
      'GB': 'EU', 'FR': 'EU', 'DE': 'EU', 'IT': 'EU', 'ES': 'EU', 'PL': 'EU', 'RO': 'EU', 'NL': 'EU', 'GR': 'EU', 'BE': 'EU',
      'PT': 'EU', 'CZ': 'EU', 'HU': 'EU', 'SE': 'EU', 'AT': 'EU', 'BY': 'EU', 'CH': 'EU', 'BG': 'EU', 'RS': 'EU', 'SK': 'EU',
      'DK': 'EU', 'FI': 'EU', 'NO': 'EU', 'IE': 'EU', 'HR': 'EU', 'BA': 'EU', 'SI': 'EU', 'LT': 'EU', 'LV': 'EU', 'EE': 'EU',
      'MD': 'EU', 'AL': 'EU', 'MK': 'EU', 'ME': 'EU', 'XK': 'EU', 'UA': 'EU', 'RU': 'EU',
      'CN': 'AS', 'IN': 'AS', 'ID': 'AS', 'PK': 'AS', 'BD': 'AS', 'JP': 'AS', 'PH': 'AS', 'VN': 'AS', 'TR': 'AS', 'IR': 'AS',
      'TH': 'AS', 'MM': 'AS', 'KR': 'AS', 'IQ': 'AS', 'AF': 'AS', 'UZ': 'AS', 'MY': 'AS', 'SA': 'AS', 'NP': 'AS', 'YE': 'AS',
      'KP': 'AS', 'LK': 'AS', 'KZ': 'AS', 'SY': 'AS', 'KH': 'AS', 'JO': 'AS', 'AZ': 'AS', 'AE': 'AS', 'TJ': 'AS', 'IL': 'AS',
      'LA': 'AS', 'LB': 'AS', 'SG': 'AS', 'OM': 'AS', 'KW': 'AS', 'GE': 'AS', 'MN': 'AS', 'AM': 'AS', 'QA': 'AS', 'BH': 'AS',
      'BT': 'AS', 'BN': 'AS', 'MV': 'AS', 'TM': 'AS', 'KG': 'AS',
      'NG': 'AF', 'ET': 'AF', 'EG': 'AF', 'ZA': 'AF', 'KE': 'AF', 'UG': 'AF', 'DZ': 'AF', 'SD': 'AF', 'MA': 'AF', 'AO': 'AF',
      'GH': 'AF', 'MZ': 'AF', 'MG': 'AF', 'CM': 'AF', 'CI': 'AF', 'NE': 'AF', 'BF': 'AF', 'ML': 'AF', 'MW': 'AF', 'ZM': 'AF',
      'SO': 'AF', 'SN': 'AF', 'TD': 'AF', 'ZW': 'AF', 'GN': 'AF', 'RW': 'AF', 'BJ': 'AF', 'TN': 'AF', 'BI': 'AF', 'GN': 'AF',
      'SL': 'AF', 'TG': 'AF', 'CF': 'AF', 'LY': 'AF', 'LR': 'AF', 'MR': 'AF', 'ER': 'AF', 'GM': 'AF', 'BW': 'AF', 'GA': 'AF',
      'LS': 'AF', 'GW': 'AF', 'GQ': 'AF', 'MU': 'AF', 'SZ': 'AF', 'DJ': 'AF', 'KM': 'AF', 'CV': 'AF', 'ST': 'AF', 'SC': 'AF',
      'AU': 'OC', 'PG': 'OC', 'NZ': 'OC', 'FJ': 'OC', 'NC': 'OC', 'SB': 'OC', 'VU': 'OC', 'PF': 'OC', 'WS': 'OC', 'KI': 'OC',
      'FM': 'OC', 'TO': 'OC', 'PW': 'OC', 'MH': 'OC', 'TV': 'OC', 'NR': 'OC'
    };
    
    // EU countries list (open source data)
    const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
    
    // Prepare comprehensive response using combined data sources
    const countryCode = geo?.country || 'Unknown';
    const countryName = countryNames[countryCode] || countryCode;
    const currency = currencyData[countryCode] || { code: 'Unknown', name: 'Unknown' };
    const continentCode = continentData[countryCode] || 'Unknown';
    const isInEU = euCountries.includes(countryCode);
    
    // Get ASN and organization data from local database
    const asnData = lookupASN(cleanIP);

    // Combine data from both sources, prioritizing IP2Location for detailed info
    const city = (ip2locData && ip2locData.city !== '-' && ip2locData.city !== 'INVALID_IP_ADDRESS') ? ip2locData.city : (geo?.city || 'Unknown');
    const region = (ip2locData && ip2locData.region !== '-' && ip2locData.region !== 'INVALID_IP_ADDRESS') ? ip2locData.region : (geo?.region || 'Unknown');
    const latitude = (ip2locData && ip2locData.latitude !== 0 && ip2locData.latitude !== 'INVALID_IP_ADDRESS' && !isNaN(parseFloat(ip2locData.latitude))) ? parseFloat(ip2locData.latitude) : (geo?.ll ? geo.ll[0] : null);
    const longitude = (ip2locData && ip2locData.longitude !== 0 && ip2locData.longitude !== 'INVALID_IP_ADDRESS' && !isNaN(parseFloat(ip2locData.longitude))) ? parseFloat(ip2locData.longitude) : (geo?.ll ? geo.ll[1] : null);
    const timezone = (ip2locData && ip2locData.timeZone !== '-' && ip2locData.timeZone !== 'INVALID_IP_ADDRESS') ? ip2locData.timeZone : (geo?.timezone || 'Unknown');
    const zipcode = (ip2locData && ip2locData.zipCode !== '-' && ip2locData.zipCode !== 'INVALID_IP_ADDRESS') ? ip2locData.zipCode : 'Unknown';
    const isp = (ip2locData && ip2locData.isp !== '-' && ip2locData.isp !== 'INVALID_IP_ADDRESS') ? ip2locData.isp : (asnData?.organization || 'Unknown');
    const domain = (ip2locData && ip2locData.domain !== '-' && ip2locData.domain !== 'INVALID_IP_ADDRESS') ? ip2locData.domain : (asnData?.domain || 'Unknown');
    const asn = asnData?.asn || 'Unknown';
    const organization = asnData?.organization || isp;
    
    const response = {
      ip: cleanIP,
      version: ipVersion,
      city: city,
      region: region,
      region_code: region,
      country_code: countryCode,
      country_code_iso3: 'Unknown',
      country_name: countryName,
      country_capital: 'Unknown',
      country_tld: countryCode !== 'Unknown' ? `.${countryCode.toLowerCase()}` : 'Unknown',
      continent_code: continentCode,
      in_eu: isInEU,
      postal: zipcode,
      latitude: latitude,
      longitude: longitude,
      timezone: timezone,
      utc_offset: 'Unknown',
      country_calling_code: 'Unknown',
      currency: currency.code,
      currency_name: currency.name,
      languages: 'Unknown',
      country_area: null,
      country_population: null,
      asn: asn,
      org: organization,
      hostname: domain !== 'Unknown' ? domain : 'Unknown',
      // Legacy fields for backward compatibility
      country: {
        name: countryName,
        code: countryCode
      },
      location: {
        city: city,
        region: region,
        country: countryName,
        countryCode: countryCode,
        coordinates: {
          latitude: latitude,
          longitude: longitude
        }
      },
      organisation: {
        isp: isp,
        org: organization,
        as: asn
      },
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: response
    });
    
  } catch (error) {
    console.error('Error processing IP info request:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Unable to process IP information request'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Geo-API'
  });
});

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Geo-API',
    description: 'REST API to get user IP information including IP address, version, and city location',
    endpoints: {
      '/api/ip-info': 'GET - Returns IP address, version (IPv4/IPv6), and location information',
      '/health': 'GET - Health check endpoint'
    },
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: 'The requested endpoint does not exist'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Geo-API server is running on port ${PORT}`);
  console.log(`📍 Access the API at: http://localhost:${PORT}/api/ip-info`);
  console.log(`📋 API documentation at: http://localhost:${PORT}`);
});

module.exports = app;