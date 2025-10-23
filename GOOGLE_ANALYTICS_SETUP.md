# Google Analytics Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for the Sanjoy Mukherjee Portfolio website.

## 🚀 Quick Setup

### Step 1: Create Google Analytics Account

1. **Visit Google Analytics**: Go to [https://analytics.google.com](https://analytics.google.com)
2. **Sign in** with your Google account
3. **Create Account**: Click "Start measuring"
4. **Account Setup**:
   - Account name: "Sanjoy Mukherjee Portfolio"
   - Data sharing settings: Choose as per your preference

### Step 2: Create Property

1. **Property Setup**:
   - Property name: "Sanjoy Portfolio Website"
   - Reporting time zone: Select your timezone
   - Currency: Select your currency (e.g., USD, INR)

2. **Business Information**:
   - Industry: "Technology" or "Professional Services"
   - Business size: Select appropriate size
   - Business objectives: Select "Get baseline reports"

### Step 3: Set Up Data Stream

1. **Choose Platform**: Select "Web"
2. **Website Details**:
   - Website URL: `https://www.sanjoymukherjee.dev`
   - Stream name: "Sanjoy Portfolio Website"
3. **Enhanced measurement**: Keep enabled (recommended)

### Step 4: Get Your Measurement ID

After creating the data stream, you'll see your **Measurement ID** in the format: `G-XXXXXXXXXX`

**Copy this ID** - you'll need it for the next steps.

## 🔧 Local Development Setup

### Step 1: Update Environment Variable

1. **Open `.env.local`** in your project root
2. **Replace the placeholder** with your actual Measurement ID:
   ```bash
   NEXT_PUBLIC_GA_ID=G-YOUR-ACTUAL-ID-HERE
   ```

### Step 2: Test Locally

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Open browser** and navigate to `http://localhost:3000`

3. **Check Google Analytics**:
   - Go to your GA4 property
   - Navigate to "Reports" > "Realtime"
   - You should see your visit in real-time

## 🌐 Production Deployment (Vercel)

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. **Select your project**: "sanjoy-portfolio"
3. **Go to Settings** > **Environment Variables**
4. **Add new variable**:
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: `G-YOUR-ACTUAL-ID-HERE`
   - Environments: Select "Production", "Preview", and "Development"
5. **Save** the variable
6. **Redeploy**: Go to "Deployments" and redeploy the latest deployment

### Method 2: Vercel CLI

```bash
# Add environment variable via CLI
vercel env add NEXT_PUBLIC_GA_ID production
# Enter your GA4 Measurement ID when prompted

# Redeploy to production
vercel --prod
```

## 📊 Verify Setup

### 1. Check Real-time Reports
- Visit your live website: `https://www.sanjoymukherjee.dev`
- Go to Google Analytics > Reports > Realtime
- You should see active users

### 2. Check Page Views
- Navigate through different pages on your site
- In GA4, go to Reports > Engagement > Pages and screens
- You should see page views being tracked

### 3. Check Events
The portfolio includes custom event tracking for:
- **External link clicks** (LinkedIn, email, etc.)
- **Section views** (About, Experience, etc.)
- **Resource downloads** (whitepapers, etc.)
- **Contact interactions**
- **Newsletter subscriptions**

## 🎯 Custom Events Implemented

### Portfolio-Specific Tracking

1. **Section Views**: Tracks when users view different portfolio sections
2. **External Links**: Tracks clicks on LinkedIn, email, and other external links
3. **Resource Downloads**: Tracks whitepaper and resource downloads
4. **Contact Interactions**: Tracks email clicks and contact form usage
5. **Newsletter Subscriptions**: Tracks newsletter sign-ups

### Event Categories

- **Portfolio**: Section views and navigation
- **Engagement**: External links, subscriptions
- **Resources**: Downloads and resource access
- **Contact**: Contact form and email interactions

## 🔒 Privacy & Compliance

The implementation includes privacy-friendly settings:
- **IP Anonymization**: Enabled
- **Google Signals**: Disabled
- **Ad Personalization**: Disabled
- **Cookieless Tracking**: Where possible

## 🛠 Troubleshooting

### Common Issues

1. **No data in GA4**:
   - Check if `NEXT_PUBLIC_GA_ID` is set correctly
   - Verify the Measurement ID format (G-XXXXXXXXXX)
   - Check browser console for errors

2. **Environment variable not working**:
   - Ensure the variable name is exactly `NEXT_PUBLIC_GA_ID`
   - Restart development server after adding the variable
   - For production, redeploy after adding the variable

3. **Events not tracking**:
   - Check browser console for JavaScript errors
   - Verify that gtag is loaded (check Network tab)
   - Test in incognito mode to avoid ad blockers

### Debug Mode

To enable debug mode, add this to your `.env.local`:
```bash
NEXT_PUBLIC_GA_DEBUG=true
```

## 📈 Recommended Reports

### Key Metrics to Monitor

1. **Audience Overview**: Total users, sessions, page views
2. **Acquisition**: How users find your site
3. **Engagement**: Page views, session duration, bounce rate
4. **Popular Pages**: Most visited portfolio sections
5. **Real-time**: Current active users

### Custom Reports

Consider setting up custom reports for:
- **Portfolio Performance**: Which sections get most engagement
- **Professional Inquiries**: Contact form and email interactions
- **Resource Downloads**: Most popular whitepapers and resources
- **Speaking Engagement Interest**: Conference page engagement

## 🎉 Next Steps

After setup is complete:

1. **Set up Goals**: Define conversion goals (contact form submissions, etc.)
2. **Create Audiences**: Segment users by behavior and interests
3. **Set up Alerts**: Get notified of traffic spikes or issues
4. **Regular Monitoring**: Check reports weekly to understand your audience

---

**Need Help?** 
- Google Analytics Help: [https://support.google.com/analytics](https://support.google.com/analytics)
- Vercel Environment Variables: [https://vercel.com/docs/concepts/projects/environment-variables](https://vercel.com/docs/concepts/projects/environment-variables)