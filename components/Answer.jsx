import React from 'react'

export default class Answer extends React.Component {

  constructor(props) {
      super(props)
  }

  determineClassName(question, index) {
    let itemClassName = ''
    let answer = this.props.answer
    
    if (answer && (answer.item === index)) {
      if (this.isCorrect(question))
        itemClassName = 'green lighten-4'
      else 
        itemClassName = 'red lighten-4'
    }
        
    return itemClassName
  }
  
  isCorrect(question) {
    let answer = this.props.answer
    let isCorrect = false
    if (answer) {
      isCorrect = question.options[answer.item].point > 0
    }
        
    return isCorrect
  }

  render() {
    const {
      question, answer
    } = this.props
    
    return (    
      <div className="card-panel hoverable">
        <h5>{question.question}</h5>
        <ol type="a">
        {question.options.map((option, i) =>
          <li key={`${question.id}-${i}`} className={this.determineClassName(question, i)}>
            <input type="checkbox" name={`question_${question.id}`} id={`question_${question.id}_answer_${i}`} defaultChecked={option.point > 0} value={i} disabled />
            <label htmlFor={`question_${question.id}_answer_${i}`}>{(option.point>0) ? <b>{option.label}</b> : option.label}</label>
          </li>
        )}
        </ol>

        <div className="row">
          {question.tags.map((tag, i) =>
            <div key={i} className="chip blue lighten-5">{tag}</div>
          )}
        </div>
      </div>
    )
  }
}