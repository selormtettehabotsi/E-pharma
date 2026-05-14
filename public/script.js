const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsGrid = document.getElementById('results');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');

// Live search as user types — no scrolling while typing
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  clearBtn.classList.toggle('visible', query.length > 0);
  if (query.length > 1) {
    searchDrug(query, false); // false = don't scroll
  } else if (query.length === 0) {
    hideResults();
  }
});

// Search on Enter key — scroll to results
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchDrug(null, true);
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
  searchDrug(term, true);
}

// Main search function
// scroll = true  → scroll to results after rendering (explicit submit / popular tag)
// scroll = false → just update results in place (live typing)
async function searchDrug(query, scroll = false) {
  const q = query || searchInput.value.trim();
  if (!q) return;

  try {
    const res = await fetch(`/drugs/search?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    displayResults(data, q, scroll);
  } catch (err) {
    console.error('Search failed:', err);
    displayResults([], q, scroll);
  }
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
        <strong>No drugs found for "${query}"</strong>
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
