import { useState } from 'react'
const Header = (props) => <h1>{props.header}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statisticline= ({text,value}) => <p>{text} {value}</p>

const Statistics = ({good,bad,neutral}) => {
  const all=good+bad+neutral
  if(all===0){
    return(
      <p>No Feedback given</p>
    )
  }
  return (
    <>
    <h2>Statistics</h2>
    <table>
    <tbody>
    <tr><td><Statisticline text="Good" value={good}/></td></tr>
    <tr><td><Statisticline text="Neutral" value={neutral}/></td></tr>
    <tr><td><Statisticline text="Bad" value={bad}/></td></tr>
    <tr><td><Statisticline text="All" value={all}/></td></tr>
    <tr><td><Statisticline text="Average" value={(good-bad)/all||0}/></td></tr>
    <tr><td><Statisticline text="Positive" value={(100/all)*good+"%"}/></td></tr>
    </tbody>
    </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header="Give Feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App