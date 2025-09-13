# IP Geolocation REST API (Enhanced Open Source)

A comprehensive REST API for IP geolocation using enhanced open source data sources. This API provides detailed geographical information about IP addresses including city, region, ISP, and organization data without relying on external commercial services.

## Features

- **Enhanced Open Source Data**: Uses MaxMind's GeoLite2 + IP2Location LITE databases
- **Comprehensive Geolocation**: City, region, ISP, domain, timezone, postal codes
- **No External Dependencies**: All processing done locally with offline databases
- **Privacy Focused**: No data sent to third-party services
- **Rate Limited**: Built-in protection against abuse
- **CORS Enabled**: Ready for web applications
- **Security Headers**: Helmet.js for enhanced security
- **Organization Data**: ISP, domain, and network information
- **Backward Compatible**: Supports legacy response formats

## Data Sources

This API uses enhanced open source data to ensure privacy and avoid external dependencies:

- **MaxMind GeoLite2**: Free IP geolocation database via geoip-lite npm package
- **IP2Location LITE**: Enhanced city, region, ISP, and organization data
- **IPtoASN Database**: Free ASN and organization mapping from iptoasn.com (updated hourly)
- **Country Mappings**: Static mappings for country names, currencies, and continent codes
- **Currency Data**: Open source currency code and name mappings
- **EU Membership**: Static list of European Union member countries
- **No External APIs**: No calls to commercial services, all data processed locally

### Limitations

While enhanced with IP2Location LITE, some limitations remain:

- **Database Updates**: Free databases updated monthly (vs daily for commercial)
- **IPv6 Support**: Limited for some data fields in free databases
- **Accuracy**: May be less precise than premium commercial databases
- **Coverage**: Some remote or new IP ranges may have incomplete data

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Download databases:
   ```bash
   mkdir -p databases
   
   # Download IP2Location LITE database (optional - sample included)
   # Download from https://lite.ip2location.com/ (free account required)
   # Or use the included sample database
   
   # Download IPtoASN database (automatic on first run, or manual):
   curl -o databases/ip2asn-v4.tsv.gz https://iptoasn.com/data/ip2asn-v4.tsv.gz
   gunzip databases/ip2asn-v4.tsv.gz
   ```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### Get IP Information
**GET** `/api/ip-info`

Returns comprehensive information about the user's IP address.

#### Response Example
```json
{
  "success": true,
  "data": {
    "ip": "8.8.8.8",
    "version": "IPv4",
    "city": "Mountain View",
    "region": "California",
    "region_code": "CA",
    "country_code": "US",
    "country_code_iso3": "USA",
    "country_name": "United States",
    "country_capital": "Washington D.C.",
    "country_tld": ".us",
    "continent_code": "NA",
    "in_eu": false,
    "postal": "94043",
    "latitude": 37.4419,
    "longitude": -122.1430,
    "timezone": "America/Los_Angeles",
    "utc_offset": "-08:00",
    "country_calling_code": "+1",
    "currency": "USD",
    "currency_name": "Dollar",
    "languages": "English",
    "country_area": "9629091",
    "country_population": "331002651",
    "asn": "AS15169",
    "org": "Google LLC",
    "hostname": "dns.google",
    "country": "United States",
    "location": {
      "city": "Mountain View",
      "region": "California",
      "country": "United States",
      "countryCode": "US",
      "coordinates": {
        "latitude": 37.4419,
        "longitude": -122.1430
      }
    },
    "organisation": {
      "isp": "Google LLC",
      "org": "Google LLC",
      "as": "AS15169 Google LLC"
    },
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### Health Check
**GET** `/health`

Returns the API health status.

#### Response Example
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Geo-API"
}
```

### API Documentation
**GET** `/`

Returns API documentation and available endpoints.

## Rate Limiting

The API includes rate limiting to prevent abuse:
- **Limit**: 100 requests per 15 minutes per IP address
- **Response**: HTTP 429 when limit exceeded

## Error Handling

The API returns structured error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Environment Variables

- `PORT`: Server port (default: 3000)

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **geoip-lite**: IP geolocation
- **axios**: HTTP client
- **express-rate-limit**: Rate limiting

## Development

### Project Structure
```
Geo-API/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
└── README.md         # Documentation
```

### Testing

You can test the API using curl:

```bash
# Get IP information
curl http://localhost:3000/api/ip-info

# Health check
curl http://localhost:3000/health
```

## License

MIT License

## Author

Ajit Sahu