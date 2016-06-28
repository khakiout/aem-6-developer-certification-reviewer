import React from 'react'

export default class Score extends React.Component {

  constructor(props) {
      super(props)
  }

  render() {
    const {
      score, numberOfQuestions
    } = this.props
    
    return (    
      <div className="card-panel hoverable lime lighten-2">
        <h4>Score: <b>{score}/{numberOfQuestions}</b></h4>
        <p className="section">
          Congratulations, you finished the quiz!
        </p>
      </div>
    )
  }
}