# srckit-cors

<p align="center">
  <strong>Test, understand, and debug Cross-Origin Resource Sharing (CORS).</strong>
</p>

<p align="center">
  <a href="https://cors.srckit.org">Live Demo</a> ·
  <a href="https://github.com/srckit-org/srckit">SrKit Suite</a> ·
  <a href="https://github.com/srckit-org/srckit-cors/issues">Report Bug</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/MUI-9-007FFF?style=flat-square&logo=mui&logoColor=white" alt="MUI 9" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind 4" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/github/license/srckit-org/srckit-cors?style=flat-square" alt="License" />
</p>

---

## Overview

CORS errors are one of the most common frustrations in web development. srckit-cors helps you test any URL for CORS configuration, understand how preflight requests work, and learn how to fix CORS issues.

## Features

### CORS Tester
- Send **simple GET** requests to check `Access-Control-Allow-Origin`
- Send **preflight OPTIONS** requests to check CORS configuration
- Display all CORS-related response headers
- Clear pass/fail indicators

### Preflight Explained
- Visual flow diagram of preflight requests
- Request/response examples
- When browsers send preflight vs simple requests
- How to configure servers to allow cross-origin requests

### CORS Explained
- FAQ covering common questions:
  - What is CORS?
  - Why do I get CORS errors?
  - Simple vs Preflight requests?
  - How to fix CORS on the server?
  - CORS vs Content Security Policy?

## Getting Started

```bash
git clone https://github.com/srckit-org/srckit-cors.git
cd srckit-cors
npm install
npm run dev
```

## Common CORS Headers

| Header | Purpose |
|--------|---------|
| `Access-Control-Allow-Origin` | Which origins can access the resource |
| `Access-Control-Allow-Methods` | HTTP methods allowed |
| `Access-Control-Allow-Headers` | Headers allowed in requests |
| `Access-Control-Allow-Credentials` | Whether cookies can be sent |
| `Access-Control-Max-Age` | How long to cache preflight results |

## License

MIT © [srckit-org](https://github.com/srckit-org)
