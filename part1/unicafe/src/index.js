import React, { useState } from 'react'
import ReactDOM from 'react-dom'
// Functions
const getAverage = (good, bad, all) => all ? (good * 1 - bad * 1) / all : 0
const getPositive = (good, all) => all ? good / all * 100 : 0

// Components
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({good, neutral, bad, all}) => {
  if(all) {
    return (
      <table>
        <thead><tr><th>statistics</th></tr></thead>
        <tbody>
          <Statistic text="good" value ={good} />
          <Statistic text="neutral" value ={neutral} />
          <Statistic text="bad" value ={bad} />
          <Statistic text="all" value ={all} />
          <Statistic text="average" value ={getAverage(good, bad, all)} />
          <Statistic text="positive" value ={getPositive(good, all)} />
        </tbody>
      </table>
    )
  }
  return  <p>No feedback given</p>
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + bad + neutral

  const handleClick = (feedbackValue) => () => {
    if(feedbackValue === 'good') {
      setGood(good + 1)      
    } else if(feedbackValue === 'bad') {
      setBad(bad + 1)
    } else if(feedbackValue === 'neutral') {
      setNeutral(neutral + 1)
    } else {
      console.log("TCL: handleClick -> feedbackValue something else:", feedbackValue)
    }
    all++
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text='good' handleClick={handleClick('good')} />
        <Button text='neutral' handleClick={handleClick('neutral')} />
        <Button text='bad' handleClick={handleClick('bad')} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)