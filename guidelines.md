# Guidelines

A small, static personal/group/conference website split into separate HTML pages and shared assets.

## Personal/Group Contents

1. About - Resources - News
2. News-Blog
3. Publications
4. Teaching
5. Collaborators - People - Group - Gallery
6. Projects - Research - Funding - Grant
7. Join Us - Open Positions

## Project structure

```sh
./
├── index.html
├── news.html
├── projects.html
├── publications.html
├── teaching.html
├── assets/
│   ├── css/
│   │   └── style.css
|   ├── python/                    # python scripts
│   ├── js/
│   │   └── main.js
│   ├── images/                    # images, icons, favicon, etc.
│   └── docs/
│       ├── cv.pdf                 # CV
│       ├── research/              # BIBs, PDFs, graphics  
|       └── others/                # Others file
└── ...
```

## Preview locally

Open `index.html` in a browser. No build step or package installation is required.

For a local web server, run this command from the project directory:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

* Links marked `#` are placeholders and should be replaced with real destinations or removed.