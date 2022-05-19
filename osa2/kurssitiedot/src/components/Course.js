const Header= (props) => {
    return (
        <h1>{props.course}</h1>
    )
  }
  const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  const Content = ({parts}) => {
    return (
      <>
      {parts.map(part =>
        <Part key={part.id} part={part}/>
      )}
      </>
    )
  }
  
  
  const Total = ({parts}) => {
    const sum= parts.reduce((prevVal,{exercises}) => prevVal+exercises,0)
    return (
        <b><p>Total of excercises {sum}</p></b>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </>
    )
  }

export default Course