import { useState } from 'react'
const MostVoted = (props) => {
  if (props.votes.find((element) => element >= 1)) {
    const valueHigh = Math.max(...props.votes);
    const valueHighIndex = props.votes.findIndex((v) => v === valueHigh);
    return (
      <>
        <h1>Anecdotes with most votes</h1>

        <p>{props.anecdotes[valueHighIndex]}</p>

        <p> Has {props.votes[valueHighIndex]} votes</p>
      </>)
  }
  return (<h1> There are still no notes with votes</h1>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleClickRandom = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber)
  };

  const handleClickVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes</p>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickRandom} >next anecdote</button>

      <MostVoted votes={votes} anecdotes={anecdotes} />

    </div>
  )
}

export default App