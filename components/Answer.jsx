import React from 'react'

const Answer = ({
  question,
  index
}) => {
  return (
    <div>
      <h3>{question.question}</h3>
      <ol type="a">
      {question.answers.map((answer, i) =>
        <li key={`${index}-${i}`}>
          <input type="checkbox" name={`question_${index}`} id={`question_${index}_answer_${i}`} defaultChecked={answer.point > 0} value={i} disabled />
          {' '}
          <label htmlFor={`question_${index}_answer_${i}`}>{answer.label}</label>
        </li>
      )}
      </ol>
    </div>
  )
}

export default Answer
