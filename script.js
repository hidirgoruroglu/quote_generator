const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

let apiQuotes = [];

function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    }
    else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author;
    complate();
}

function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent}%0A%0A-${authorText.textContent}`;
    window.open(twitterURL, "_blank");
}

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complate() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        
    }
}


twitterBtn.addEventListener("click",tweetQuote);
newQuoteBtn.addEventListener("click",newQuote);

getQuotes();