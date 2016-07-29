import React from 'react'

export default class Answer extends React.Component {

  constructor(props) {
      super(props)
  }

  componentDidMount() {
    // is this the right way to do this?
    let me = $(this.refs.itemcount)
    me.material_select();
  }

  render() {
    const {
      onSubmit
    } = this.props

    return (
      <div className="card-panel">
        <div className="input-field col s3">
          <select ref="itemcount" id="itemcount" name="itemcount">
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>30</option>
          </select>
          <label htmlFor="itemcount">Enter number of questions</label>
        </div>
        
        <div className="input-field col s3">
          <button onClick={onSubmit} className="waves-effect waves-light btn">Start</button>
        </div>
      </div>
    )
  }
}