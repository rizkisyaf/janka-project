export const criticalCSS = `
  /* Add only the essential styles needed for initial render */
  :root {
    --font-geist-sans: 'GeistSans', system-ui, sans-serif;
    --font-geist-mono: 'GeistMono', monospace;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-geist-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Add any other critical styles needed for above-the-fold content */
`; 