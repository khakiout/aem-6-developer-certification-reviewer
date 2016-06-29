import React from 'react'
import $ from 'jquery'

import Question from './Question'
import Answer from './Answer'
import Score from './Score'

export default class Quiz extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        quiz: {},
        index: 0,
        answers: []
      }
  }

  componentDidMount() {
    $.getJSON('./data/quiz.json', function(result) {
      let quiz = {
        title: result.title,
        size : result.size,
        questions: []
      }
      
      function addQuestion(question) {
        quiz.questions.push(question)
      }
      
      let deferredRequests = []
      for (var i=1; i<=quiz.size; i++) {
        deferredRequests.push($.getJSON('./data/questions/' + i + '.json', addQuestion))
      }
      
      // call the jsons
      $.when.apply(
        $, deferredRequests
      ).then(function() {
        this.setState({quiz: quiz})        
      }.bind(this))
    }.bind(this))
  }

  handleSubmit() {
    if (this.state.index < this.state.quiz.questions.length) {
      this.setState({'index': this.state.index + 1})
    } else {
      let score = this.state.score || 0
      this.state.answers.map((answer, i) => (
        score = score + this.state.quiz.questions[i].options[answer].point
      ))
      this.setState({'score': score})
    }
  }

  handleAnswerSelected(event, question) {
    var answer = {
        id : question.id,
        item : parseInt(event.target.value)
    }
    let list = [...this.state.answers.slice(0, this.state.index),
                answer,
                ...this.state.answers.slice(this.state.index + 1)]
    this.setState({'answers': list})
  }
    
  getAnswer(id) {
    let answer = this.state.answers.find(answer => answer.id === id)
    
    return answer
  }

  render() {
    const {
      quiz, index, answers
    } = this.state

    let completed = (quiz.questions && (index === quiz.questions.length)) ? true : false
    let numberOfQuestions = quiz.questions ? quiz.questions.length : 0
    let score = 0
      
    if (completed) {
      quiz.questions.map((question, i) => {
        let answer = this.getAnswer(question.id)
        if (answer != undefined) {
          score += question.options[answer.item].point
        }
      })
    }

    return (
      <div className="card-panel">
        <h3>{quiz.title}</h3>
        <div className="divider"></div>
        {completed ?
          <div className="section">
            <Score
              score={score}
              numberOfQuestions={numberOfQuestions}
            />
            <br/>
            {quiz.questions.map((question, i) =>
              <Answer
                question={question}
                answer={this.getAnswer(question.id)}
                key={i}
              />
            )}
          </div>
        :
          <div className="section">
          <h4>Question {index + 1} of {numberOfQuestions}</h4>
          {quiz.questions && index < numberOfQuestions ?
            <Question
              question={quiz.questions[index]}
              index={index}
              onAnswerSelected={(event) => this.handleAnswerSelected(event, quiz.questions[index])}
              onSubmit={() => this.handleSubmit()}
            />
          : ''}
          </div>
        }
      </div>
    )
  }
}