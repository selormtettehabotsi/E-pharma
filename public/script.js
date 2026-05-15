const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsGrid = document.getElementById('results');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');

// All drugs loaded once on page load
let allDrugs = [];

// Fetch all drugs from server once
async function loadAllDrugs() {
  try {
    const res = await fetch('/drugs');
    if (!res.ok) throw new Error('Failed to load drugs');
    allDrugs = await res.json();
  } catch (err) {
    console.error('Could not preload drugs:', err);
  }
}

// Start loading immediately
loadAllDrugs();

// Live filter as user types — instant, no network requests
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  clearBtn.classList.toggle('visible', query.length > 0);

  if (query.length === 0) {
    hideResults();
  } else if (query.length >= 1) {
    const filtered = allDrugs.filter(drug =>
      drug.name.toLowerCase().includes(query.toLowerCase())
    );
    displayResults(filtered, query, false);
  }
});

// Scroll to results on Enter
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
      const filtered = allDrugs.filter(drug =>
        drug.name.toLowerCase().includes(query.toLowerCase())
      );
      displayResults(filtered, query, true);
    }
  }
});

// Clear search
function clearSearch() {
  searchInput.value = '';
  clearBtn.classList.remove('visible');
  hideResults();
  searchInput.focus();
}

// Quick-search from popular tags — always scroll
function quickSearch(term) {
  searchInput.value = term;
  clearBtn.classList.add('visible');
  const filtered = allDrugs.filter(drug =>
    drug.name.toLowerCase().includes(term.toLowerCase())
  );
  displayResults(filtered, term, true);
}

// Render results
function displayResults(drugs, query, scroll = false) {
  resultsGrid.innerHTML = '';
  resultsSection.style.display = 'block';

  resultsTitle.textContent = query
    ? `Results for "${query}"`
    : 'Results';

  resultsCount.textContent = drugs.length
    ? `${drugs.length} drug${drugs.length !== 1 ? 's' : ''} found`
    : '';

  if (drugs.length === 0) {
    resultsGrid.innerHTML = `
      <div class="no-results">
        <div style="font-size:2rem;margin-bottom:.5rem">💊</div>
        <strong>No drugs found for "${escHtml(query)}"</strong>
        <p style="margin-top:.4rem;font-size:.9rem">Try a different name or check the full NHIS list.</p>
      </div>`;
    return;
  }

  drugs.forEach((drug, i) => {
    const card = document.createElement('div');
    card.className = 'drug-card';
    card.style.animationDelay = `${i * 40}ms`;
    card.innerHTML = `
      <h3>${escHtml(drug.name)}</h3>
      <div class="drug-price">GH₵ ${Number(drug.price).toFixed(2)}</div>
      <div class="drug-meta">
        ${drug.form     ? `<span>💊 <span class="pill">${escHtml(drug.form)}</span></span>` : ''}
        ${drug.strength ? `<span>⚗️ ${escHtml(String(drug.strength))}</span>` : ''}
        ${drug.pharmacy ? `<span>🏥 ${escHtml(drug.pharmacy)}</span>` : ''}
        ${drug.location ? `<span>📍 ${escHtml(drug.location)}</span>` : ''}
      </div>`;
    resultsGrid.appendChild(card);
  });

  if (scroll) {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function hideResults() {
  resultsSection.style.display = 'none';
  resultsGrid.innerHTML = '';
}

// Sanitise to avoid XSS
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
