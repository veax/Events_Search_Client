import React, {Component} from 'react'


class SearchEventBar extends Component {
    render(){
        const updateSearch = (e) => {
            this.props.onChangeTextFilter(e.target.value, 'text')
        }
        return (
            <div className="container">
                <div className="search-wrapper center">
                    <div className="search-box">
                        <input type="text" placeholder="search for events..." id="search"  onChange={updateSearch} />
                        <i className="material-icons">search</i>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default SearchEventBar
