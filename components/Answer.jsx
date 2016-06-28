import React from 'react'

export default class Answer extends React.Component {

  constructor(props) {
      super(props)
      console.log(this.props);
  }

  getLabel(option, index) {
    var label = option.label
    if (index == this.props.answer.item) {
      label = <b>{option.label}</b>
    }
    
    return label
  }

  render() {
    const {
      question, answer
    } = this.props
    
    return (    
      <div>
        <h3>{question.question}</h3>
        <ol type="a">
        {question.options.map((option, i) =>
          <li key={`${question.id}-${i}`}>
            <input type="checkbox" name={`question_${question.id}`} id={`question_${question.id}_answer_${i}`} defaultChecked={option.point > 0} value={i} disabled />
            {' '}
            <label htmlFor={`question_${question.id}_answer_${i}`}>{this.getLabel(option, i)}</label>
          </li>
        )}
        </ol>
      </div>
    )
  }
}