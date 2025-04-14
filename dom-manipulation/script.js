let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Creativity is intelligence having fun.", category: "Inspiration" },
    { text: "Do not wait for opportunity. Create it.", category: "Motivation" }
  ];
  
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
  
    const quoteParagraph = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `${quote.category}: `;
  
    quoteParagraph.appendChild(strong);
    quoteParagraph.append(`"${quote.text}"`);
    quoteDisplay.appendChild(quoteParagraph);
  }
  
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
  
    showRandomQuote();
  }
  
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
  
    const inputQuote = document.createElement('input');
    inputQuote.type = 'text';
    inputQuote.placeholder = 'Enter a new quote';
    inputQuote.id = 'newQuoteText';
  
    const inputCategory = document.createElement('input');
    inputCategory.type = 'text';
    inputCategory.placeholder = 'Enter quote category';
    inputCategory.id = 'newQuoteCategory';
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.id = 'addQuoteButton';
  
    formContainer.appendChild(inputQuote);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
  
    addButton.addEventListener('click', addQuote);
  }
  
  // Initial setup
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  createAddQuoteForm();
  showRandomQuote();