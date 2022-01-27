import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "./img/helmet-1.png", matched: false },
  { "src": "./img/potion-1.png", matched: false },
  { "src": "./img/ring-1.png", matched: false },
  { "src": "./img/scroll-1.png", matched: false },
  { "src": "./img/shield-1.png", matched: false },
  { "src": "./img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [disabled, setDisabled] = useState(false)

  // choice states
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        console.log(`cards doesn't match`)
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increment turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, []);
  

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
        ))}

      </div>
      
      <p>Turns: {turns}</p>

      <div className="footer">
          <h3>Made with 💖 by Alper Emre Eren</h3>
      </div>
    </div>
  );
}

export default App;
