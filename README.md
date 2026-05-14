# Portfolio (Next.js)

This project has been migrated to Next.js (App Router) with static export enabled for GitHub Pages.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - create production static export (`out/`)
- `npm run start` - run Next production server (after build)
- `npm run lint` - run ESLint

## GitHub Pages deployment

Deployment is handled by GitHub Actions:

- Workflow: `.github/workflows/deploy-pages.yml`
- Build output artifact path: `out/`
- Trigger: push to `main` / `master` or manual run

In GitHub repository settings, ensure:

1. `Settings -> Pages -> Source` is set to `GitHub Actions`
2. Actions are allowed to deploy Pages
