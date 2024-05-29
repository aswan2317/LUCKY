// Number Facts Section

// 1. Get a fact about your favorite number
const favoriteNumber = 7;

fetch(`http://numbersapi.com/${favoriteNumber}?json`)
  .then(response => response.json())
  .then(data => {
    document.querySelector('#number-facts').innerHTML += `<p>${data.text}</p>`;
  })
  .catch(error => console.error('Error:', error));

// 2. Get data on multiple numbers
// const numbers = [3, 9, 27];

// fetch(`http://numbersapi.com/${numbers.join(',')}?json`)
//   .then(response => response.json())
//   .then(data => {
//     Object.values(data).forEach(fact => {
//       document.querySelector('#number-facts').innerHTML += `<p>${fact}</p>`;
//     });
//   })
//   .catch(error => console.error('Error:', error));

// 3. Get 4 facts about your favorite number
const promises = [];
for (let i = 0; i < 3; i++) {
  promises.push(fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(response => response.json()));
}

Promise.all(promises)
  .then(facts => {
    facts.forEach(fact => {
      document.querySelector('#number-facts').innerHTML += `<p>${fact.text}</p>`;
    });
  })
  .catch(error => console.error('Error:', error));


// Deck of Cards Section

// 1. Request a single card from a newly shuffled deck
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
  .then(response => response.json())
  .then(deck => {
    const deckId = deck.deck_id;
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  })
  .then(response => response.json())
  .then(data => {
    const card = data.cards[0];
    console.log(`${card.value} of ${card.suit}`);
  })
  .catch(error => console.error('Error:', error));

// 2. Request two cards from the same deck
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
  .then(response => response.json())
  .then(deck => {
    const deckId = deck.deck_id;
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(response => response.json())
      .then(data => {
        const card1 = data.cards[0];
        console.log(`${card1.value} of ${card1.suit}`);
        return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      })
      .then(response => response.json())
      .then(data => {
        const card2 = data.cards[0];
        console.log(`${card2.value} of ${card2.suit}`);
      });
  })
  .catch(error => console.error('Error:', error));

// 3. Build an HTML page that lets you draw cards from a deck
let deckId;

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
  .then(response => response.json())
  .then(deck => {
    deckId = deck.deck_id;
  })
  .catch(error => console.error('Error:', error));

document.getElementById('draw-card').addEventListener('click', () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
      if (data.cards.length === 0) {
        alert('No more cards left!');
      } else {
        const card = data.cards[0];
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
        
        // Calculate random rotation and position for the card
        const rotation = Math.random() * 60 - 30; // Rotate between -30 and +30 degrees
        const offsetX = Math.random() * 20 - 10;  // Horizontal offset between -10px and +10px
        const offsetY = Math.random() * 20 - 10;  // Vertical offset between -10px and +10px

        cardElement.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`;

        document.getElementById('cards').appendChild(cardElement);
      }
    })
    .catch(error => console.error('Error:', error));
});
