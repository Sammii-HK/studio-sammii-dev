(function() {
  const theme = localStorage.getItem('theme') || 'system';
  let effectiveTheme = theme;
  
  if (theme === 'system') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(effectiveTheme);
})();

