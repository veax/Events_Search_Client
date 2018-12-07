import React from 'react'
import AdvancedSearch from './AdvancedSearch'

const SearchEventBar = props => {

    const updateSearch = (e) => {
        props.onChangeTextFilter(e.target.value)
    }
    return (
        <div className="container">
            <div className="search-wrapper center">
                <div className="search-box">
                    <input type="text" placeholder="search for events..." id="search"  onChange={updateSearch} />
                    <i className="material-icons">search</i>
                </div>
            </div>
            <AdvancedSearch />
        </div>
    )
}

export default SearchEventBar
