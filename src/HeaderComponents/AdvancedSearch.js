import React, { Component } from 'react'
import OptionsList from './OptionsList'

export class AdvancedSearch extends Component {

  state = {
    selectedOption:''
  }

  handleOptionChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    })
  }

  handleSelectChange = (value) => {
    this.props.handleSelectChange(value, this.state.selectedOption)
  }

  render() {
    const { dates, types } = this.props
    return (
      <div className="filter_options container">
        <p>or use advanced filters instead: </p>
        <form action="#" className="advanced_filters_form">
            <p>
            <label>
                <input name="group1" type="radio" value='dates' checked={this.state.selectedOption === 'dates'} onChange={this.handleOptionChange} />
                <span>By date</span>
            </label>
            </p>
            <p>
            <label>
                <input name="group1" type="radio" value='types' checked={this.state.selectedOption === 'types'} onChange={this.handleOptionChange} />
                <span>By type of event</span>
            </label>
            </p>
            <p>
            <label>
                <input name="group1" type="radio" value='location' checked={this.state.selectedOption === 'location'} onChange={this.handleOptionChange} />
                <span>By location</span>
            </label>
            </p>
        </form>
        <OptionsList selectedOption={this.state.selectedOption} dates={dates} types={types} handleSelectChange={this.handleSelectChange}/>
      </div>
    )
  }
}

export default AdvancedSearch
