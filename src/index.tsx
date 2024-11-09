import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App';
import { ThemeProvider } from 'src/styles/ThemeProvider';

// reasonable CSS reset layered on top of modern-normalize
import '@zendeskgarden/css-bedrock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
