// Initialisation des citations avec récupération du Local Storage
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
];

// Sélection des éléments DOM
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteButton = document.getElementById("addQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const exportJsonButton = document.getElementById("exportJson");
const importFileInput = document.getElementById("importFile");

// Fonction pour afficher une citation aléatoire
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerText = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerText = `"${randomQuote.text}" - ${randomQuote.category}`;
    
    // Stocker la dernière citation affichée en Session Storage
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Fonction pour ajouter une nouvelle citation
function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (!text || !category) {
        alert("Please enter both a quote and a category.");
        return;
    }

    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    
    newQuoteText.value = "";
    newQuoteCategory.value = "";
    alert("Quote added successfully!");
}

// Fonction pour enregistrer les citations dans Local Storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Fonction pour exporter les citations en JSON
function exportToJsonFile() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Fonction pour importer un fichier JSON
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            alert("Quotes imported successfully!");
        } catch (error) {
            alert("Invalid JSON format.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Charger la dernière citation affichée depuis Session Storage (si disponible)
const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
    quoteDisplay.innerText = `"${lastQuote.text}" - ${lastQuote.category}`;
}

// Ajouter les Event Listeners
document.addEventListener("DOMContentLoaded", showRandomQuote);
newQuoteButton.addEventListener("click", showRandomQuote);
addQuoteButton.addEventListener("click", addQuote);
exportJsonButton.addEventListener("click", exportToJsonFile);
importFileInput.addEventListener("change", importFromJsonFile);