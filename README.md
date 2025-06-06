# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Commit your code to the `main` branch on GitHub.
2. GitHub Actions will build the project and publish the contents of the
   `dist` folder to the **gh-pages** branch.
3. Enable GitHub Pages from the repository settings and select the `gh-pages`
   branch as the source.

The deployment workflow is defined in
[`deploy.yml`](.github/workflows/deploy.yml).
