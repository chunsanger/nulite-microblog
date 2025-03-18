document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Set the initial theme based on user preference or system preference
  function setInitialTheme() {
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Apply saved preference
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
  }
  
  // Toggle theme function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Set the theme attribute
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save user preference
    localStorage.setItem('theme', newTheme);
    
    // Dispatch event for other scripts to listen to
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
  }
  
  // Initialize
  setInitialTheme();
  
  // Add click event listener to the theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    // Only update if user hasn't explicitly set a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = event.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    }
  });
}); 