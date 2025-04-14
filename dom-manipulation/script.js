let quotes = [];

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }

  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    document.getElementById('categoryFilter').value = savedCategory;
  }
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function populateCategories() {
  const categorySet = new Set(quotes.map(q => q.category));
  const filterSelect = document.getElementById('categoryFilter');
  filterSelect.innerHTML = `<option value="all">All Categories</option>`;

  categorySet.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    filterSelect.appendChild(option);
  });

  // Restore selected value if it was saved
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    filterSelect.value = savedCategory;
  }
}

function filterQuotes() {
  const selected = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selected);

  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  showQuotes(filtered);
}

function showQuotes(list) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = "";

  if (list.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * list.length);
  const quote = list[randomIndex];
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));

  const p = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = `${quote.category}: `;
  p.appendChild(strong);
  p.append(`"${quote.text}"`);
  quoteDisplay.appendChild(p);
}

function showRandomQuote() {
  const selected = document.getElementById('categoryFilter').value;
  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  showQuotes(filtered);
}

function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories(); // Update categories dropdown
    filterQuotes();       // Show updated filtered quotes
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  } else {
    alert("Please enter both a quote and a category.");
  }
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Failed to read the file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initial setup
loadQuotes();
populateCategories();
filterQuotes();

document.getElementById('newQuote').addEventListener('click', showRandomQuote);