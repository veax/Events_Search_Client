import React, { Component } from 'react'

export class AdvancedSearch extends Component {
  render() {
    return (
      <div className="filter_options">
        <p>or use advanced filters instead: </p>
        <form action="#" className="advanced_filters_form">
            <p>
            <label>
                <input name="group1" type="radio" />
                <span>By date</span>
            </label>
            </p>
            <p>
            <label>
                <input name="group1" type="radio" />
                <span>By type of event</span>
            </label>
            </p>
            <p>
            <label>
                <input name="group1" type="radio"  />
                <span>By location</span>
            </label>
            </p>
        </form>
      </div>
    )
  }
}

export default AdvancedSearch
