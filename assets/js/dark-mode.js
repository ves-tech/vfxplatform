// Dark mode toggle functionality
(function() {
  var toggles = document.querySelectorAll('.dark-mode-toggle');
  var icons = document.querySelectorAll('.dark-mode-icon');

  var sunPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';
  var moonPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';

  function updateIcons() {
    var isDark = document.documentElement.classList.contains('dark');
    icons.forEach(function(icon) {
      icon.innerHTML = isDark ? sunPath : moonPath;
    });
  }

  function toggleTheme() {
    var isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcons();
  }

  // Initialize
  updateIcons();

  // Event listeners for all toggle buttons
  toggles.forEach(function(toggle) {
    toggle.addEventListener('click', toggleTheme);
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      updateIcons();
    }
  });
})();
