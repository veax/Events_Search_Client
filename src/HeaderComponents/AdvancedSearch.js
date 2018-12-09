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
    const typesName = ['date', 'type', 'location']
    const name = ['By date', 'By type of event', 'By location']

    const checkBoxForm = typesName.map((type, i) => {
      return (
        <p key={i}>
          <label>
            <input name="group1" type="radio" value={type}  onChange={this.handleOptionChange} />
            <span>{name[i]}</span>
          </label>
        </p>
      )
    })

    let options = null
    if (this.state.selectedOption){
      options = <OptionsList selectedOption={this.state.selectedOption} date={dates} type={types} handleSelectChange={this.handleSelectChange} />
    }

    return (
      <div className="filter_options container">
        <p>or use advanced filters instead: </p>
        <form action="#" className="advanced_filters_form">
            {checkBoxForm}
        </form>
        {options}
      </div>
    )
  }
}

export default AdvancedSearch
