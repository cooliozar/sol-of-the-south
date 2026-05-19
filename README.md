# Sol of the South

Official website for Sol of the South — Heavy Riffs. Soulful Melodies.

## Tech Stack

- **Vite 6** + **React 18**
- **Tailwind CSS v3** + **shadcn/ui** (Radix UI)
- **React Router v6** (BrowserRouter)
- **TanStack Query v5**
- **Framer Motion**

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deployment

Deployed via **Vercel**. The `vercel.json` at the repo root handles SPA client-side routing rewrites.

Build settings:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`


**About**

View and Edit  your app on [Base44.com](http://Base44.com) 

This project contains everything you need to run your app locally.

**Edit the code in your local development environment**

Any change pushed to the repo will also be reflected in the Base44 Builder.

**Prerequisites:** 

1. Clone the repository using the project's Git URL 
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

Run the app: `npm run dev`

**Publish your changes**

Open [Base44.com](http://Base44.com) and click on Publish.

**Docs & Support**

Documentation: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)

Support: [https://app.base44.com/support](https://app.base44.com/support)
