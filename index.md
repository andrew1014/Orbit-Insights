---
title: "Welcome to Orbit Insights"
layout: home
custom_css: true
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root {
      --dark-bg: #0f0f0f;
      --card-bg: #1a1a2e;
      --accent: #00f2f2;
      --accent-light: #00e6e6;
      --text: #e0e0e0;
      --text-muted: #aaaaaa;
      --border: #2a3f5f;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: var(--dark-bg);
      color: var(--text);
      font-family: 'Segoe UI', sans-serif;
      line-height: 1.6;
    }

    .stars {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: #fff;
      border-radius: 50%;
    }

    .star.slow {
      animation: twinkle-slow 3s infinite alternate;
    }

    .star.medium {
      animation: twinkle-medium 2s infinite alternate;
    }

    .star.fast {
      animation: twinkle-fast 1.2s infinite alternate;
    }

    .star.large {
      width: 3px;
      height: 3px;
    }

    @keyframes twinkle-slow {
      0% { opacity: 0.1; }
      100% { opacity: 0.5; }
    }

    @keyframes twinkle-medium {
      0% { opacity: 0.15; }
      100% { opacity: 0.4; }
    }

    @keyframes twinkle-fast {
      0% { opacity: 0.2; }
      100% { opacity: 0.45; }
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    header {
      text-align: center;
      margin-bottom: 3rem;
      padding: 3rem 0;
    }

    header h1 {
      font-size: 3rem;
      color: var(--accent);
      margin-bottom: 0.5rem;
      text-shadow: 0 0 10px rgba(0, 242, 242, 0.3);
    }

    header p {
      font-size: 1.1rem;
      color: var(--text-muted);
      margin-bottom: 2rem;
    }

    .cta-button {
      display: inline-block;
      padding: 0.875rem 2rem;
      background: var(--accent);
      color: #000;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 0 15px rgba(0, 242, 242, 0.3);
    }

    .cta-button:hover {
      background: var(--accent-light);
      transform: translateY(-2px);
      box-shadow: 0 0 25px rgba(0, 242, 242, 0.5);
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin: 2rem 0;
    }

    section {
      margin-bottom: 3rem;
    }

    section h2 {
      font-size: 1.8rem;
      color: var(--accent);
      margin-bottom: 1.5rem;
      border-bottom: 2px solid var(--border);
      padding-bottom: 0.5rem;
    }

    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .post-card {
      background: rgba(26, 26, 46, 0.6);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .post-card:hover {
      border-color: var(--accent);
      box-shadow: 0 0 15px rgba(0, 242, 242, 0.2);
      transform: translateY(-4px);
    }

    .post-card h3 {
      color: var(--accent);
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    .post-date {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
      display: block;
    }

    .post-excerpt {
      color: var(--text);
      margin-bottom: 1rem;
      line-height: 1.7;
    }

    .read-more {
      display: inline-block;
      color: var(--accent);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .read-more:hover {
      color: var(--accent-light);
      margin-right: -5px;
    }

    .about {
      background: rgba(26, 26, 46, 0.4);
      border-left: 3px solid var(--accent);
      padding: 1.5rem;
      border-radius: 4px;
      margin-top: 2rem;
    }

    .about h3 {
      color: var(--accent);
      margin-bottom: 1rem;
    }

    .about p {
      color: var(--text);
      margin-bottom: 0.75rem;
    }

    .quote {
      font-style: italic;
      color: var(--text-muted);
      padding-left: 1rem;
      border-left: 2px solid var(--accent);
      margin-top: 1rem;
    }

    footer {
      text-align: center;
      padding: 2rem;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      margin-top: 3rem;
    }

    @media (max-width: 768px) {
      header h1 {
        font-size: 2rem;
      }

      .container {
        padding: 1rem;
      }

      .posts-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="stars">
    <div class="star slow" style="top: 10%; left: 5%;"></div>
    <div class="star fast large" style="top: 15%; left: 25%; animation-delay: 0.5s;"></div>
    <div class="star medium" style="top: 12%; left: 45%; animation-delay: 1s;"></div>
    <div class="star slow" style="top: 18%; left: 70%; animation-delay: 1.5s;"></div>
    <div class="star fast" style="top: 10%; left: 85%; animation-delay: 0.2s;"></div>

    <div class="star medium" style="top: 35%; left: 15%; animation-delay: 2s;"></div>
    <div class="star slow large" style="top: 40%; left: 35%; animation-delay: 2.5s;"></div>
    <div class="star fast" style="top: 32%; left: 55%; animation-delay: 1.2s;"></div>
    <div class="star medium" style="top: 45%; left: 75%; animation-delay: 0.8s;"></div>
    <div class="star slow" style="top: 38%; left: 90%; animation-delay: 3s;"></div>

    <div class="star fast" style="top: 62%; left: 10%; animation-delay: 1.8s;"></div>
    <div class="star medium" style="top: 70%; left: 30%; animation-delay: 2.2s;"></div>
    <div class="star slow large" style="top: 65%; left: 50%; animation-delay: 3.5s;"></div>
    <div class="star fast" style="top: 75%; left: 68%; animation-delay: 0.6s;"></div>
    <div class="star medium" style="top: 60%; left: 85%; animation-delay: 1.4s;"></div>

    <div class="star slow" style="top: 88%; left: 20%; animation-delay: 2.8s;"></div>
    <div class="star fast large" style="top: 90%; left: 75%; animation-delay: 0.9s;"></div>
  </div>

  <div class="container">
    <header>
      <h1>⚡ Orbit Insights</h1>
      <p>Exploring space technology, emerging subcultures, and the future of human expansion</p>
      <a href="/Orbit-Insights/subscribe" class="cta-button">Join the Mission 🚀</a>
    </header>

    <div class="divider"></div>

    <section>
      <h2>Latest from the Cosmos</h2>
      <div class="posts-grid">
        <div class="post-card">
          <h3>Subcultures & Space Tech Convergence</h3>
          <span class="post-date">July 11, 2026</span>
          <p class="post-excerpt">
            How digital subcultures mirror and accelerate space tech innovation. From cyberpunk aesthetics to 2025's Digital Underground, exploring the symbiotic relationship between artistic rebellion and scientific breakthroughs.
          </p>
          <a href="/Orbit-Insights/space-tech/subculture/2026/07/11/subculture-space-trends.html" class="read-more">Read Full Article →</a>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="about">
      <h3>🛰️ About This Mission</h3>
      <p>
        Orbit Insights is a deep dive into where space technology and emerging digital culture collide. We track the trends reshaping civilization — from SpaceX breakthroughs to underground digital movements — and reveal the patterns most are missing.
      </p>
      <p>
        Curated by <strong>Andrew</strong>, an AI engineer obsessed with the future of space, technology, and human expansion.
      </p>
      <p class="quote">
        "The best way to predict the future is to create it." — Peter Drucker
      </p>
    </section>
  </div>

  <footer>
    <p>&copy; 2026 Orbit Insights. Exploring the cosmos, one insight at a time.</p>
  </footer>
</body>
</html>
