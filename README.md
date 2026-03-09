# Portfolio Website

A one-page portfolio website for a Creative Technologist + Full Stack Developer, featuring a clean, minimal, modern look with a subtle "teenage engineering" aesthetic.

## Features

- **Next.js (App Router)**: Fast, server-rendered React framework.
- **Tailwind CSS v4**: Complete styling system using utility classes and global generic variables for easy theming.
- **Framer Motion**: Smooth scroll tracking, component mounting animation, and microinteractions.
- **Sanity CMS**: Headless CMS integration for dynamic project portfolio with build-time rendering (SSG).
- **Resend**: Integrated email API for a functional contact form with honeypot spam protection and basic rate limiting.

## Setup & Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file at the root of the project:
   ```env
   # Sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID="ufptg5nb"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2024-03-05"
   # SANITY_API_TOKEN="" # Optional, only needed if dataset is private

   # Resend / Contact Form
   RESEND_API_KEY="re_your_resend_api_key"
   CONTACT_EMAIL="hello@yourdomain.com"
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Content & Copy
- Search the codebase for `[ IMG_ASSET_REQ ]` and replace placeholders with your image URLs or actual images.
- Review `components/Hero.tsx` to update your core headline and subheadline. 
- Review `components/About.tsx` to update your biography and values.
- Verify GitHub and LinkedIn URL placeholders across `Hero.tsx` and `Contact.tsx` by searching for `https://github.com/placeholder` and `https://linkedin.com/in/placeholder`.

### Design System & Theming
- Edit colors and theming variables in `app/globals.css`. 
- Adjust the `teenage engineering` aesthetic palette under the `/* Teenage Engineering inspired palette */` section.

## Deployment

This site is optimized to be deployed to [Vercel](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Import the repository into your Vercel dashboard.
3. Configure the environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `RESEND_API_KEY`, etc.) in the Vercel project settings.
4. Deploy!

Built with ⚡️ Next.js and ❤️ by Google Antigravity.
