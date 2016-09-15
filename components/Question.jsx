import React from 'react'

const Question = ({
  question,
  answer,
  index,
  onAnswerSelected,
  onBack,
  onSubmit
}) => {
  return (
    <div className="card-panel">
      <h5>{question.question}</h5>
      <ol type="a">
      {question.options.map((option, i) =>
        <li key={`${index}-${i}`}>
          <input type="radio" className="filled-in" name={`question_${index}`} id={`question_${index}_answer_${i}`} defaultChecked={(answer) ? (answer.item==i):false} value={i} onChange={onAnswerSelected} />
          <label htmlFor={`question_${index}_answer_${i}`}>{option.label}</label>
        </li>
      )}
      </ol>
      
      <div className="row">
        {question.tags.map((tag, i) =>
          <div className="chip blue lighten-5">{tag}</div>
        )}
      </div>

      {(index>0) ? <span><button onClick={onBack} className="waves-effect waves-light btn">Previous</button>&nbsp;&nbsp;</span> : ''}
      <button onClick={onSubmit} className="waves-effect waves-light btn">Next</button>
    </div>
  )
}

export default Question
