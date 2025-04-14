let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Creativity is intelligence having fun.", category: "Inspiration" },
    { text: "Do not wait for opportunity. Create it.", category: "Motivation" }
  ];
  
  // Affiche une citation aléatoire
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes available.</p>";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `
      <p><strong>${quote.category}:</strong> "${quote.text}"</p>
    `;
  }
  
  // Crée le formulaire pour ajouter une nouvelle citation (si besoin dynamique)
  // Ici on utilise un formulaire statique dans l'HTML, donc on n’utilise pas createAddQuoteForm
  
  // Ajoute une citation à la liste
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
  }
  
  // Événements
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteButton').addEventListener('click', addQuote);
  
  // Affiche une citation dès le chargement
  showRandomQuote();