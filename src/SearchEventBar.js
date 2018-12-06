import React, { Component } from 'react'
import AdvancedSearch from './AdvancedSearch'

export class SearchEventBar extends Component {

  updateSearch(e){
      this.props.onChangeTextFilter(e.target.value)
  }

  render() {
    return (
        <div className="container">
            <div className="search-wrapper center">
                <div className="search-box">
                    <input type="text" placeholder="search for events..." id="search"  onChange={this.updateSearch.bind(this)} />
                    <i className="material-icons">search</i>
                </div>
            </div>
            <AdvancedSearch />
        </div>
    )
  }
}

export default SearchEventBar
