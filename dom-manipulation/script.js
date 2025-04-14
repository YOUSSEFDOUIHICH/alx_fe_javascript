let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Creativity is intelligence having fun.", category: "Inspiration" },
    { text: "Do not wait for opportunity. Create it.", category: "Motivation" }
  ];
  
  // Fonction pour afficher une citation aléatoire avec createElement / appendChild
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ""; // On vide le conteneur
  
    if (quotes.length === 0) {
      const noQuote = document.createElement('p');
      noQuote.textContent = "No quotes available.";
      quoteDisplay.appendChild(noQuote);
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    const quoteParagraph = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `${quote.category}: `;
  
    quoteParagraph.appendChild(strong);
    quoteParagraph.append(`"${quote.text}"`);
    quoteDisplay.appendChild(quoteParagraph);
  }
  
  // Fonction pour ajouter une nouvelle citation dynamiquement
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (!quoteText || !quoteCategory) {
      alert("Please fill in both fields.");
      return;
    }
  
    quotes.push({ text: quoteText, category: quoteCategory });
  
    alert("Quote added successfully!");
  
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  
    showRandomQuote(); // Optionnel : on peut montrer la nouvelle citation ajoutée
  }
  
  // Événements
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteButton').addEventListener('click', addQuote);
  
  // Afficher une citation automatiquement au démarrage
  showRandomQuote();