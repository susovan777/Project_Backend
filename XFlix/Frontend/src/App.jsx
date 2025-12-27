import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Apply theme to html element
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Toggle dark class on html element
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save preference to localStorage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg  transition-colors duration-300">
      {/* Test Header */}
      <header className="bg-light-card dark:bg-dark-card shadow-md border-b border-light-border dark:border-dark-border">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">XFlix</h1>

            <button onClick={toggleTheme} className="btn btn-secondary">
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </header>

      {/* Test Content */}
      <main className="container-custom py-8">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold ">
            🎉 Vite + React + Tailwind Setup Complete!
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your XFlix frontend is ready to build
          </p>

          {/* Test Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="card p-6">
                <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Video Card {num}</h3>
                <div className="flex gap-2">
                  <span className="badge-genre">Education</span>
                  <span className="badge-rating">12+</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  👁 1.2M views • 2 days ago
                </p>
              </div>
            ))}
          </div>

          {/* Test Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
          </div>

          {/* Test Input */}
          <div className="max-w-md mx-auto mt-8">
            <input
              type="text"
              placeholder="Search videos..."
              className="input"
            />
          </div>

          {/* Environment Variable Test */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-800 dark:text-gray-300">
              <strong>Current Theme:</strong>{" "}
              {theme === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </p>
            <p className="text-sm text-gray-800 dark:text-gray-300 mt-2">
              <strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
        <div className="container-custom text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 XFlix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
