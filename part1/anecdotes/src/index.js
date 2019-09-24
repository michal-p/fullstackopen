import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

function generateRandomNumber(length) {
  return Math.floor(Math.random() * length)
}
const App = (props) => {
  // States
  const [selected, setSelected] = useState(generateRandomNumber(props.anecdotes.length))
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
  // Functions
  // TODO function getAnecdote(v) is not working and I do not know why. No error in console. After few clicks it stucks.
  // const getAnecdote = (value) => () => setSelected(value)
  const getRandomAnecdote = () => setSelected(generateRandomNumber(props.anecdotes.length))
  const setVoteToAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1  
    return setPoints(copy)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <p>has {points[selected]} votes</p>
      <Button text='vote' handleClick={setVoteToAnecdote} />
      {/* <Button text='next anecdote' handleClick={getAnecdote(generateRandomNumber(props.anecdotes.length))} /> */}
      <Button text='next anecdote' handleClick={getRandomAnecdote} />
      <h1>Anecdote with the most votes</h1>
      <div>{props.anecdotes[points.indexOf(Math.max(...points))]}</div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)