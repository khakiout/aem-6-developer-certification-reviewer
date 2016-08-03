import React from 'react'
import $ from 'jquery'

import Question from './Question'
import Answer from './Answer'
import Score from './Score'
import LimitPicker from './LimitPicker'

const QUIZ_STATUSES = {
  START : 'start',
  ON_GOING : 'on_going',
  END: 'end'
}

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
        status : QUIZ_STATUSES.START,
        questions: []
      }
      
      function addQuestion(question) {
        quiz.questions.push(question)
      }
      
      let deferredRequests = []
      for (var i=1; i<=quiz.size; i++) {
        deferredRequests.push($.getJSON('./data/questions/' + ('00'+ i).slice(-2) + '.json', addQuestion))
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
    }
  }

  goBack() {
    if (this.state.index < this.state.quiz.questions.length) {
      this.setState({'index': this.state.index - 1})
    }
  }

  skipQuiz() {
    let questions = this.state.quiz.questions
    if (questions)
      this.setState({'index' : questions.length})
  }

  handleAnswerSelected(event, question) {
    let answerIndex = this.state.answers.findIndex(answer => answer.id === question.id)
    let answer = {
      id : question.id,
      item : parseInt(event.target.value)
    }

    let list = this.state.answers
    if (answerIndex > -1) {
      list[answerIndex] = answer
    } else {
      list.push(answer)
    }
    this.setState({'answers': list})
    // console.log(this.state.answers)
  }
    
  getAnswer(id) {
    let answer = this.state.answers.find(answer => answer.id === id)
    
    return answer
  }

  startQuiz(count) {
    let quiz = this.state.quiz
    
    let maxCount = (count > quiz.questions.length ? quiz.questions.length : count)
    // shuffle first before splicing
    quiz.questions = this.shuffleArray(quiz.questions)
    quiz.questions = quiz.questions.slice(0, maxCount)

    quiz.status = QUIZ_STATUSES.ON_GOING
    
    this.setState({'quiz': quiz})
  }

  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

  render() {
    const {
      quiz, index
    } = this.state

    let completed = (quiz.questions && (index === quiz.questions.length)) ? true : false
    if (completed) {
      quiz.status = QUIZ_STATUSES.END
    }
    let numberOfQuestions = quiz.questions ? quiz.questions.length : 0
    let score = 0
      
    if (quiz.status == QUIZ_STATUSES.END) {
      quiz.questions.map((question) => {
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

        {(() => {
          switch (quiz.status) {
            case QUIZ_STATUSES.START: {
              return  <LimitPicker
                        onSubmit={(count) => this.startQuiz(count)}
                      />
            }
            case QUIZ_STATUSES.ON_GOING: {
              return  <div className="section">
                        <h4>Question {index + 1} of {numberOfQuestions}</h4>
                        {quiz.questions && index < numberOfQuestions ?
                          <Question
                            question={quiz.questions[index]}
                            answer={this.getAnswer(quiz.questions[index].id)}
                            index={index}
                            onAnswerSelected={(event) => this.handleAnswerSelected(event, quiz.questions[index])}
                            onBack={() => this.goBack()}
                            onSubmit={() => this.handleSubmit()}
                          />
                        : ''}
                        <button onClick={() => this.skipQuiz()} className="waves-effect waves-light btn grey">Skip Quiz</button>
                      </div>
            }
            case QUIZ_STATUSES.END: {
              return  <div className="section">
                        <Score
                          score={score}
                          numberOfQuestions={numberOfQuestions}
                        />
                        <button onClick={() => window.print()} className="waves-effect waves-light btn grey">Print</button>
                        <br/>
                        {quiz.questions.map((question, i) =>
                          <Answer
                            question={question}
                            answer={this.getAnswer(question.id)}
                            key={i}
                          />
                        )}
                      </div>
            }
            default:      return 'ERROR'
          }
        })()}

      </div>
    )
  }
}
