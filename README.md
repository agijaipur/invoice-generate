# Document Generator

A React-based document generator with real-time preview and PDF export.

## Prerequisites

- **Node.js**: You must have Node.js installed to run this project. Download from [nodejs.org](https://nodejs.org).

## Setup & Run

1.  Open this folder in VS Code.
2.  Open a terminal (Ctrl+` or Terminal > New Terminal).
3.  Run the following command to install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open the link shown (typically `http://localhost:5173`) in your browser.

## Customization

- **Form Images**: Place your high-res form images (PNG/JPG) in `public/forms/`.
- **Coordinates**: Edit `src/data/coordinates.js` to adjust field positions for your specific images.
- **Admin Password**: Default is `Admin123`.

## Features
- Glassmorphism Login
- Dashboard for Dispute Forms, Refund Invoices, etc.
- Real-time text overlay editor
- Dynamic transaction rows
- High-quality PDF export
