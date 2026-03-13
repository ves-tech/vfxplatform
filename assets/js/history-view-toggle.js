// History page view toggle (Table / Cards) with localStorage persistence
(function() {
  var STORAGE_KEY = 'historyView';
  var tableView = document.getElementById('table-view');
  var cardView = document.getElementById('card-view');
  var btnTable = document.getElementById('view-table');
  var btnCards = document.getElementById('view-cards');

  if (!tableView || !cardView || !btnTable || !btnCards) return;

  function setView(view) {
    var isTable = view === 'table';
    tableView.classList.toggle('hidden', !isTable);
    cardView.classList.toggle('hidden', isTable);
    btnTable.classList.toggle('active', isTable);
    btnCards.classList.toggle('active', !isTable);
    btnTable.setAttribute('aria-pressed', isTable ? 'true' : 'false');
    btnCards.setAttribute('aria-pressed', isTable ? 'false' : 'true');
    try { localStorage.setItem(STORAGE_KEY, view); } catch (e) {}
  }

  btnTable.addEventListener('click', function() { setView('table'); });
  btnCards.addEventListener('click', function() { setView('cards'); });

  // Initialize from saved preference (default: table)
  var saved = 'table';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'table'; } catch (e) {}
  setView(saved);
})();
