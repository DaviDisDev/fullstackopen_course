const Header = (props) => (<h1>{props.course}</h1>)

const Part = (props) => (<p>{props.part} {props.exercises}</p>)

const Content = (props) => {
  return (

    <>
      {props.parts.map(part => (

        <Part key={part.id} part={part.name} exercises={part.exercises} />

      ))}

    </>

  )
}

const Total = (props) => {

  var total = props.parts.reduce((acc, obj) => acc + obj.exercises, 0);

  return (<b>the exercises of course {total}</b>)
}

const Course = (props) => {

  return (
    <>
      <Header course={props.course.name} />

      <Content parts={props.course.parts} />

      <Total parts={props.course.parts} />
    </>
  )

}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4,
      }
    ],
  }

  return (
    <Course course={course} />
  )
}

export default App