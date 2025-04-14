let quotes = [];

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = "";

  if (quotes.length === 0) {
    const noQuote = document.createElement('p');
    noQuote.textContent = "No quotes available.";
    quoteDisplay.appendChild(noQuote);
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  sessionStorage.setItem('lastQuote', JSON.stringify(quote));

  const quoteParagraph = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = `${quote.category}: `;

  quoteParagraph.appendChild(strong);
  quoteParagraph.append(`"${quote.text}"`);
  quoteDisplay.appendChild(quoteParagraph);
}

function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const newQuote = {
    text: textInput.value.trim(),
    category: categoryInput.value.trim()
  };

  if (newQuote.text && newQuote.category) {
    quotes.push(newQuote);
    saveQuotes();
    textInput.value = "";
    categoryInput.value = "";
    showRandomQuote();
  } else {
    alert("Please fill in both fields.");
  }
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();

  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        showRandomQuote();
      } else {
        alert('Invalid JSON format');
      }
    } catch (err) {
      alert('Error reading JSON file');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initial load
loadQuotes();
showRandomQuote();

// Button Event
document.getElementById('newQuote').addEventListener('click', showRandomQuote);