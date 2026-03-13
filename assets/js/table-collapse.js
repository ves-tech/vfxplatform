// Collapsible table category sections with localStorage persistence
(function() {
  var STORAGE_KEY = 'tableCollapsed';
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getCollapsedState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveCollapsedState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage unavailable
    }
  }

  function hideRows(rows) {
    rows.forEach(function(el) {
      el.classList.add('category-row-hidden');
    });
  }

  function setCategory(categoryId, collapsed, animate) {
    var headers = document.querySelectorAll('.category-header[data-category="' + categoryId + '"]');
    var rows = document.querySelectorAll('[data-category-row="' + categoryId + '"]');

    headers.forEach(function(el) {
      el.classList.toggle('collapsed', collapsed);
      el.setAttribute('aria-expanded', String(!collapsed));
    });

    if (collapsed) {
      if (animate && !prefersReducedMotion) {
        // Fade out then hide
        rows.forEach(function(el) { el.style.opacity = '0'; });
        setTimeout(function() { hideRows(rows); }, 150);
      } else {
        hideRows(rows);
      }
    } else {
      // Show then fade in
      rows.forEach(function(el) {
        el.classList.remove('category-row-hidden');
        if (animate && !prefersReducedMotion) {
          el.style.opacity = '0';
          // Force reflow so transition triggers
          el.offsetHeight;
          el.style.opacity = '';
        }
      });
    }
  }

  function toggleCategory(categoryId) {
    var state = getCollapsedState();
    var collapsed = !state[categoryId];
    state[categoryId] = collapsed;
    if (!collapsed) delete state[categoryId];
    saveCollapsedState(state);
    setCategory(categoryId, collapsed, true);
  }

  // Apply saved state on load (no animation)
  var state = getCollapsedState();
  Object.keys(state).forEach(function(categoryId) {
    if (state[categoryId]) {
      setCategory(categoryId, true, false);
    }
  });

  // Add click and keyboard listeners to category headers
  document.querySelectorAll('.category-header[data-category]').forEach(function(header) {
    header.addEventListener('click', function() {
      toggleCategory(this.getAttribute('data-category'));
    });
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCategory(this.getAttribute('data-category'));
      }
    });
  });
})();
