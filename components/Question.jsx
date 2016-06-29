import React from 'react'

const Question = ({
  question,
  index,
  onAnswerSelected,
  onSubmit
}) => {
  return (
    <div className="card-panel">
      <h5>{question.question}</h5>
      <ol type="a">
      {question.options.map((answer, i) =>
        <li key={`${index}-${i}`}>
          <input type="radio" className="filled-in" name={`question_${index}`} id={`question_${index}_answer_${i}`} defaultChecked={false} value={i} onChange={onAnswerSelected} />
          <label htmlFor={`question_${index}_answer_${i}`}>{answer.label}</label>
        </li>
      )}
      </ol>
      <button onClick={onSubmit} className="waves-effect waves-light btn">Submit</button>
    </div>
  )
}

export default Question
