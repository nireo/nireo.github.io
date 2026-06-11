# wr.labs

A minimal, premium, monochrome landing page for **wr.labs**—a highly intelligent machine learning model designed to estimate win probability in League of Legends using flat game-state vectors.

This site is built using pure, semantic HTML5, vanilla CSS, and modern client-side JavaScript. It has zero external dependencies, making it extremely fast, fully responsive, and easy to deploy on platforms like **GitHub Pages**.

## Project Structure

*   `index.html` — The main structure of the landing page, incorporating semantic HTML5 and SEO metadata.
*   `style.css` — Custom minimalist dark-mode stylesheets using standard system-level typography. Includes scroll-reveals and animations.
*   `app.js` — Client-side interaction logic, tab controls, clipboard integrations, and a live training simulator.

## Local Preview

To preview the landing page locally, you can spin up a quick local server.

Using Python:
```bash
python3 -m http.server 8000
```
Or using Node.js:
```bash
npx serve
```
Then open `http://localhost:8000` (or `http://localhost:3000` for node) in your browser.

## Deployment to GitHub Pages

Since this project uses only static assets, deploying it is straightforward:

1.  Initialize a Git repository (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initialize wr.labs landing page"
    ```
2.  Create a repository on GitHub.
3.  Add the remote repository and push your code:
    ```bash
    git remote add origin https://github.com/yourusername/wrlabs.git
    git branch -M main
    git push -u origin main
    ```
4.  Navigate to your repository settings on GitHub, select **Pages** on the left menu, choose the `main` branch as the source, and click **Save**.
5.  Your site will be live at `https://yourusername.github.io/wrlabs/` within a few minutes.
