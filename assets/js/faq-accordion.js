// FAQ accordion - event delegation with smooth CSS animation
(function() {
  document.addEventListener('click', function(e) {
    var button = e.target.closest('.accordion-header');
    if (!button) return;

    var item = button.parentElement;
    if (!item) return;

    item.classList.toggle('open');
    var expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });
})();
