# Heartland Plumbing AI Website

This repository contains the source code for the Heartland Plumbing website, featuring a Gemini-powered AI receptionist.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to Netlify

This project is pre-configured for easy deployment to Netlify.

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Netlify](https://app.netlify.com/) and click **"Add new site"** -> **"Import an existing project"**.
3. Connect your Git provider and select this repository.
4. Netlify will automatically detect the build settings from the `netlify.toml` file:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Important:** Before deploying, click on **"Advanced build settings"** (or go to Site Settings > Environment Variables after creation) and add your Gemini API key:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `your_api_key_here`
6. Click **"Deploy site"**.

Your site will now be live with a fully functional AI chatbot!
