import { useState } from 'react'
const Display = props => <div>{props.text} {props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Title = (props) => (
  <h1>
    {props.text}
  </h1>
)
const StaticLine = (props) => {
  return (<tr><td>{props.text}</td><td>{props.value}</td></tr>)
}
const Statistics = (props) => {
  if (props.valGood != 0 || props.valNeutral != 0 || props.valBad != 0) {
    return (
      <table>
        <tbody>
          <StaticLine text="Good" value={props.valGood} />
          <StaticLine text="Neutral" value={props.valNeutral} />
          <StaticLine text="Bad" value={props.valBad} />

          <StaticLine text="All" value={props.valGood + props.valNeutral + props.valBad} />

          <StaticLine text="Average" value={(props.valGood * 1 + props.valNeutral * 0 + props.valBad * -1) / (props.valGood + props.valNeutral + props.valBad)} />
          <StaticLine text="Positive" value={(props.valGood / (props.valGood + props.valNeutral + props.valBad)) * 100 + " %"} />
        </tbody>
      </table>)
  }
  return (<div> No feedback given</div>)
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback" />

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Title text="statics" />



      <Statistics valGood={good} valNeutral={neutral} valBad={bad} />


    </div>
  )
}

export default App