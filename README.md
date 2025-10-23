# Sanjoy Mukherjee — Professional Portfolio

A comprehensive multipage portfolio application showcasing expertise in enterprise architecture and pharmaceutical technology solutions. Built with modern web technologies and deployed on Vercel.

🌐 **Live Site**: [https://www.sanjoymukherjee.dev](https://www.sanjoymukherjee.dev)

## 🚀 Features

### **Multipage Architecture**
- **9 dedicated pages** following professional portfolio best practices
- **Responsive design** with mobile-first approach
- **Dark/Light mode** support with system preference detection
- **SEO optimized** with proper metadata and Open Graph tags
- **Static generation** for optimal performance

### **Professional Content Sections**
1. **About Me** - Professional background and expertise
2. **Professional Experience** - 16+ years career timeline with detailed achievements
3. **Membership** - Professional organization memberships and community involvement
4. **Awards** - Recognition and achievements in enterprise architecture
5. **Media Coverage** - Featured articles, interviews, and expert commentary
6. **Publications** - Research papers, technical articles, and case studies
7. **Conferences** - Speaking engagements, keynotes, and workshop leadership
8. **Newsletters** - Industry insights and thought leadership content
9. **Books & Whitepapers** - Published resources and technical documentation

### **Modern Design**
- Clean, professional layout inspired by industry-leading portfolio sites
- Interactive navigation with visual grid on homepage
- Smooth animations and hover effects
- Professional statistics and metrics display
- Mobile-responsive hamburger navigation

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Performance**: Static Site Generation (SSG)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ajitbubu/sanjoy-portfolio.git
cd sanjoy-portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📝 Content Management

### **Site Configuration**
All site content is centrally managed in `data/site.ts`:

- **Personal Information**: Name, tagline, description, contact details
- **Professional Experience**: Career timeline with roles and achievements
- **Projects**: Featured work with descriptions and technology stacks
- **Skills**: Organized by categories (Platforms, Architecture, Leadership, etc.)
- **Memberships**: Professional organizations and roles
- **Awards**: Recognition and achievements with descriptions
- **Media Coverage**: Press features, interviews, and commentary
- **Publications**: Research papers, articles, and abstracts
- **Conferences**: Speaking engagements with audience metrics
- **Newsletters**: Publication details and subscriber statistics
- **Books & Whitepapers**: Published resources with download links

### **Component Structure**
```
components/
├── sections/           # Page-specific components
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Membership.tsx
│   ├── Awards.tsx
│   ├── MediaCoverage.tsx
│   ├── Publications.tsx
│   ├── Conferences.tsx
│   ├── Newsletters.tsx
│   └── BooksWhitepapers.tsx
├── Navbar.tsx         # Navigation component
└── Footer.tsx         # Footer component
```

### **Page Structure**
```
app/
├── page.tsx           # Homepage with navigation grid
├── about/page.tsx     # About Me page
├── experience/page.tsx # Professional Experience
├── membership/page.tsx # Memberships
├── awards/page.tsx    # Awards & Recognition
├── media/page.tsx     # Media Coverage
├── publications/page.tsx # Publications
├── conferences/page.tsx # Speaking Engagements
├── newsletters/page.tsx # Newsletters
└── books/page.tsx     # Books & Whitepapers
```

## 🎨 Customization

### **Styling**
- Global styles: `app/globals.css`
- Tailwind configuration: `tailwind.config.ts`
- Color scheme: Blue primary with purple accents
- Typography: System fonts with proper font feature settings

### **Content Updates**
1. Edit `data/site.ts` to update personal information and content
2. Replace profile image at `public/profile-pic.jpeg`
3. Add award images to `public/awards/`
4. Add book covers to `public/books/`
5. Add organization logos to `public/logos/`

## 🔧 SEO & Analytics

### **SEO Configuration**
- Update site URL and metadata in `data/site.ts`
- Each page has optimized meta titles and descriptions
- Open Graph tags for social media sharing
- Structured data for better search engine understanding

### **Analytics Setup**
Set Google Analytics ID via environment variable:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### **Favicon**
Replace favicon files in `public/` directory:
- `icon.svg` - Main favicon
- Add additional favicon formats as needed

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Automatic Deployment**
   - Push to GitHub
   - Import repository on [Vercel](https://vercel.com)
   - Automatic deployments on every push to main branch

2. **Manual Deployment**
```bash
vercel --prod
```

3. **Environment Variables**
   - Add `NEXT_PUBLIC_GA_ID` for Google Analytics (optional)

### **Other Platforms**
The application can be deployed on any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📊 Performance

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Size**: Optimized with tree shaking and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [rahulbhatia.info](https://rahulbhatia.info/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)

---

**Live Site**: [https://www.sanjoymukherjee.dev](https://www.sanjoymukherjee.dev)

**Repository**: [https://github.com/ajitbubu/sanjoy-portfolio](https://github.com/ajitbubu/sanjoy-portfolio)


