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

export default Course