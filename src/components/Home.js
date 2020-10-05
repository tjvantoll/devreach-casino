import React from 'react';

const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['C', 'D', 'H', 'S'];
const cards = [];

suits.forEach(suit => {
  numbers.forEach(number => {
    cards.push(number + suit);
  })
})

function Home() {
  return (
    <div className="cards">
      {cards.map((card, index) => (
        <img
          key={card}
          alt={card}
          src={`/cards/${card}.png`} />
      ))}
    </div>
  )
}

export default Home;