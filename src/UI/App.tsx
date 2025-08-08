import React, { useState } from 'react';

// You should declare this in a types file (e.g., electron.d.ts) for better TypeScript support
declare global {
  interface Window {
    electronAPI: {
      login: (credentials: {
        username: string;
        password: string;
      }) => Promise<{ success: boolean; data?: string; error?: string }>;
    };
  }
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrapedContent, setScrapedContent] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setScrapedContent(null);

    const result = await window.electronAPI.login({ username, password });

    if (result.success) {
      setScrapedContent(result.data || '');
    } else {
      setError(result.error || 'An unknown error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>University Scraper 🚀</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} style={{ marginTop: '1rem' }}>
          {isLoading ? 'Logging In...' : 'Login and Scrape'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</p>}

      {scrapedContent && (
        <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h2>Scraped Content:</h2>
          {/* WARNING: This is necessary to render the HTML from the website.
            Only use this because you trust the source (your university website).
            Never use this with content from untrusted sources.
          */}
          <div dangerouslySetInnerHTML={{ __html: scrapedContent }} />
        </div>
      )}
    </div>
  );
}

export default App;