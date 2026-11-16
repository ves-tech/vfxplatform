// History page view toggle (Table / Cards) with localStorage persistence
(function() {
  var STORAGE_KEY = 'historyView';
  var tableView = document.getElementById('table-view');
  var cardView = document.getElementById('card-view');
  var btnTable = document.getElementById('view-table');
  var btnCards = document.getElementById('view-cards');

  if (!tableView || !cardView || !btnTable || !btnCards) return;

  function setView(view, animate) {
    var isTable = view === 'table';
    tableView.classList.toggle('hidden', !isTable);
    cardView.classList.toggle('hidden', isTable);
    btnTable.classList.toggle('active', isTable);
    btnCards.classList.toggle('active', !isTable);
    btnTable.setAttribute('aria-pressed', isTable ? 'true' : 'false');
    btnCards.setAttribute('aria-pressed', isTable ? 'false' : 'true');
    if (animate) {
      var shown = isTable ? tableView : cardView;
      shown.classList.add('view-fade-in');
      shown.addEventListener('animationend', function() {
        shown.classList.remove('view-fade-in');
      }, { once: true });
    }
    try { localStorage.setItem(STORAGE_KEY, view); } catch (e) {}
  }

  // Year anchors (#CY2023) live on the table column headers. When the card
  // view is showing, the browser can't scroll to them, so scroll to the
  // matching card instead.
  function scrollToYearCard(instant) {
    if (cardView.classList.contains('hidden')) return;
    var match = /^#(CY\d{4})$/.exec(window.location.hash);
    if (!match) return;
    var card = document.getElementById(match[1] + '-card');
    if (card) card.scrollIntoView(instant ? { behavior: 'instant' } : undefined);
  }

  btnTable.addEventListener('click', function() { setView('table', true); });
  btnCards.addEventListener('click', function() { setView('cards', true); });
  window.addEventListener('hashchange', function() { scrollToYearCard(false); });

  // Initialize from saved preference (default: table), without animation
  var saved = 'table';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'table'; } catch (e) {}
  setView(saved, false);
  scrollToYearCard(true);
})();
