import React from 'react'

export default class LimitPicker extends React.Component {

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
        <div className="row">
        <div className="input-field col s6">
          <select ref="itemcount" id="itemcount" name="itemcount" defaultValue="5" >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <label htmlFor="itemcount">Enter number of questions</label>
        </div>
        
        <div className="input-field col s3">
          <button onClick={(count) => onSubmit(this.refs.itemcount.value)} className="waves-effect waves-light btn">Start</button>
        </div>
      </div>
      </div>
    )
  }
}