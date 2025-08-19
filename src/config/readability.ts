// Typography and Readability Configuration
// Optimized for accessibility and reading comfort

export const readabilityConfig = {
  // Base font sizes (rem units for accessibility)
  fontSize: {
    xs: '0.875rem',    // 14px - small labels, captions
    sm: '1rem',        // 16px - base body text (minimum for readability)
    base: '1.125rem',  // 18px - optimal body text
    lg: '1.25rem',     // 20px - large body text, small headings
    xl: '1.5rem',      // 24px - medium headings
    '2xl': '2rem',     // 32px - large headings
    '3xl': '2.5rem',   // 40px - hero headings
    '4xl': '3rem',     // 48px - display headings
  },

  // Line heights optimized for readability
  lineHeight: {
    tight: '1.25',     // Headings
    normal: '1.5',     // Base text
    relaxed: '1.6',    // Body paragraphs
    loose: '1.8',      // Long-form content
  },

  // Reading-optimized widths (characters per line)
  maxWidth: {
    reading: '65ch',   // Optimal: 45-75 characters
    narrow: '45ch',    // Short content
    wide: '80ch',      // Wide content
  },

  // Color contrast ratios (WCAG AA compliant)
  colors: {
    text: {
      primary: '#2d4a22',     // High contrast on light bg
      secondary: '#4d6b3c',   // Medium contrast
      muted: '#6b7f5c',       // Low emphasis text
      inverse: '#ffffff',     // Text on dark backgrounds
      accent: '#6b4f2a',      // Brand accent text
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8f6f2',
      muted: 'rgba(255, 255, 255, 0.8)',
    }
  },

  // Typography scales for different content types
  scales: {
    article: {
      title: '2.5rem',
      subtitle: '1.5rem', 
      body: '1.125rem',
      caption: '1rem',
      lineHeight: '1.6',
    },
    card: {
      title: '1.5rem',
      body: '1rem',
      lineHeight: '1.5',
    },
    legal: {
      title: '2rem',
      heading: '1.25rem',
      body: '1rem',
      lineHeight: '1.7',
    }
  }
};

// Media query breakpoints for responsive typography
export const breakpoints = {
  mobile: '(max-width: 768px)',
  tablet: '(max-width: 1024px)',
  desktop: '(min-width: 1025px)',
};

// Accessibility helpers
export const a11y = {
  focusOutline: '2px solid #8bab5d',
  skipLink: 'position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;',
  srOnly: 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;',
};
