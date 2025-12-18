import { useState, useEffect } from 'react'
import tree from '../assets/img/tree.png'
import gift from '../assets/img/gift.png'
import santa from '../assets/img/santa.png'
import cane from '../assets/img/cane.png'
import reindeer from '../assets/img/reindeer.png'
import sled from '../assets/img/sled.png'

const cardImages = [
  { src: tree, matched: false },
  { src: gift, matched: false },
  { src: santa, matched: false },
  { src: cane, matched: false },
  { src: reindeer, matched: false },
  { src: sled, matched: false },
]

function MemoryGame({ onClose }) {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [matches, setMatches] = useState(0)

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setMatches(0)
  }

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        setMatches(prev => prev + 1)
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Start game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-green-900 to-blue-950 text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 md:px-6 md:py-3 rounded-lg font-bold transition text-sm md:text-base"
          >
            ← Volver
          </button>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-300">Memory Game 🎄</h2>

          <button
            onClick={shuffleCards}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 md:px-6 md:py-3 rounded-lg font-bold transition text-sm md:text-base"
          >
            Nuevo Juego
          </button>
        </div>

        {matches === 8 && (
          <div className="bg-yellow-400 text-black p-4 md:p-6 rounded-lg mb-4 md:mb-6 text-center font-bold text-lg md:text-2xl">
            🎉 ¡Ganaste! Completado en {turns} turnos!
          </div>
        )}

        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 max-w-3xl mx-auto">
          {cards.map(card => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card)
    }
  }

  return (
    <div className="relative aspect-square w-full">
      <div
        className={`absolute inset-0 transition-all duration-500 transform ${
          flipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-lg md:rounded-xl cursor-pointer hover:scale-105 transition-transform flex items-center justify-center text-3xl md:text-4xl lg:text-5xl ${
            flipped ? 'invisible' : 'visible'
          }`}
          onClick={handleClick}
          style={{ backfaceVisibility: 'hidden' }}
        >
          ❄️
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 bg-white rounded-lg md:rounded-xl shadow-lg p-2 md:p-3 lg:p-4 ${
            flipped ? 'visible' : 'invisible'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            src={card.src}
            alt="card"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default MemoryGame
