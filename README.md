Konnectik – Connecting Communities

A static, responsive landing page for Konnectik, designed to communicate the vision, proof-of-concept, and investor opportunity.

✨ Features

Single-page layout with smooth scroll navigation (index.html).

Brand styling:

Primary color: #E42320

Secondary color: #003366

Inline SVG logo (editable via CSS).

Hero section with optimized <img> preload + gradient overlay for readability.

About section with tabbed storytelling (Why / How / What) + illustration.

Coverage section with PoC cards + clear CTA.

Apps section with App Store / Play Store badges and phone preview.

Contact section with Netlify-powered forms and social badges.

Accessible hover/focus styles for buttons and links.

Animations with IntersectionObserver for reveal effects.

🛠️ Development

Requirements

No build step is needed.

Any static server or direct index.html open works.

Run locally

Open directly in a browser:

open index.html

Or serve with a local static server:

npx serve .

📂 Project Structure

Konnectik Website/
│
├── index.html        # Main single-page site
├── assets/
│   ├── css/          # Stylesheets (main.css)
│   ├── js/           # Scripts (main.js)
│   ├── img/          # Images and icons
│
├── _headers          # Netlify headers (optional, for caching)
├── _redirects        # Netlify redirects (optional, for routing)
├── README.md         # This file

📬 Forms & User Input

Forms are powered by Netlify Forms:

newsletter → Newsletter subscription

contact → Contact form

⚡️ After first deployment, Netlify auto-detects these forms.Set up notifications:

In Netlify Dashboard → Forms → Notifications

Add Email (to receive submissions).

Optionally add Slack, Zapier, Airtable integrations.

🚀 Deployment (Netlify)

Push repo to GitHub / GitLab / Bitbucket.

Connect repo in Netlify.

Build command: none

Publish directory: .

Add _headers and _redirects (optional but recommended):

/*
  Cache-Control: no-cache

/assets/*
  Cache-Control: public, max-age=31536000, immutable

Verify forms in Netlify dashboard after first submission.

🔧 Customization

Images: replace files in assets/img/ (keep names or append ?v=2 to bust cache).

Colors: adjust in assets/css/main.css.

Contact Links: update in index.html.

About Tabs: texts + corresponding illustrations set in index.html.

🤝 Contributing

We welcome contributions to improve the Konnectik site.

How to Contribute

Fork the repo.

Create a new branch: git checkout -b feature/your-feature-name.

Commit changes: git commit -m 'Add feature: your feature name'.

Push branch: git push origin feature/your-feature-name.

Open a Pull Request.

Guidelines

Keep HTML semantic and accessible.

Ensure CSS is mobile-first and responsive.

Test changes locally before pushing.

Write clean, well-documented commits.

📌 Notes

Single-page app: nav links (#about, #coverage, #apps, #contact) scroll to sections.

No separate about.html or other sub-pages.

Ensure images are consistent in dimensions for best layout.

