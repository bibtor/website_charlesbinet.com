import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const theme = localStorage.getItem('theme');
                let resolvedTheme = 'light';
                
                if (theme === 'dark') {
                  resolvedTheme = 'dark';
                } else if (theme === 'system' || !theme) {
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  resolvedTheme = systemTheme;
                }
                
                document.documentElement.classList.add(resolvedTheme);
              } catch (e) {
                // Fallback to light if there's an error
                document.documentElement.classList.add('light');
              }
            })();
          `,
        }}
      />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
