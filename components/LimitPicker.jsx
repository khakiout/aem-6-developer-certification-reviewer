import React from 'react'

const LimitPicker = ({
  onSubmit
}) => {
  return (
    <div className="card-panel">
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s3">
              <select id="itemcount" name="itemcount">
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>30</option>
              </select>
              <label htmlFor="itemcount">Materialize Select</label>
            </div>
          </div>
          <div className="row">
            <button onClick={onSubmit} className="waves-effect waves-light btn">Start</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LimitPicker
