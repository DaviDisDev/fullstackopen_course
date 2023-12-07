const Header = (props) => {
  return (

    <h1>{props.course}</h1>

  )
}
const Part = (props) => {
  return (

    <p>
      {props.part} {props.exercises}
    </p>

  )
}

const Content = (props) => {
  return (

    <>
      <Part part={props.exercises[0].part} exercises={props.exercises[0].exercise} />
      <Part part={props.exercises[1].part} exercises={props.exercises[1].exercise} />
      <Part part={props.exercises[2].part} exercises={props.exercises[2].exercise} />
    </>

  )
}

const Total = (props) => {
  return (

    <p>
      Number of exercises {props.totalExercises}
    </p>

  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />

      <Content exercises={[
        { part: part1, exercise: exercises1 },
        { part: part2, exercise: exercises2 },
        { part: part3, exercise: exercises3 },
      ]} />

      <Total totalExercises={exercises1 + exercises2 + exercises3} />

    </div>
  )
}

export default App