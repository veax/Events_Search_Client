import React, { Component } from 'react'
import geolocation from '../helperFunctions/geolocation'


class OptionsList extends Component {
    state = {
        valueType: '',
        valueLocation:''
    }

    changeType = (e) => {
        this.setState({
            valueType: e.target.value
        })
        this.props.handleSelectChange(e.target.value)
    }

    changeLoc = (e) => {
        this.setState({
            valueLocation: e.target.value
        })
    }

    handleLocSubmit = (e) => {
        e.preventDefault()
        geolocation()
        const lat = null
        const long = null
        const radius = this.state.valueLocation
        fetch('http://localhost:8080/eventsByLocation', {
                method: 'POST',
                headers : new Headers(),
                body:JSON.stringify({latitude: lat, longitude: long, radius})
            }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
    }

    render() {
    const { selectedOption } = this.props
    if (selectedOption === ''){
        return null
    }
    else if (selectedOption !== 'location'){
        // console.log(this.state.valueType)
        const values = this.props[selectedOption]
        const list = values.map(option => {
            return (
                <option key={`${option}`}>{option}</option>
            )  
        })
        return (
            <div className="input-field col s6">
                <select name="events" onChange={this.changeType} value={this.state.valueType}>
                    {list}
                </select>
            </div>
        )
    }
    else{
        // console.log(this.state.valueLocation)
        return (
            <div className="input-field col s6">
                <p>Events near by your position: </p>
                <form onSubmit={this.handleLocSubmit}>
                    <select name="events" onChange={this.changeLoc} value={this.state.valueLocation}>
                        <option value="5">5km</option>
                        <option value="10">10km</option>
                        <option value="15">15km</option>
                    </select>
                    <input type="submit" value="submit" className="btn teal waves-effect waves-light" id="locationSubmit"/>
                </form>
                
            </div>
        )
    }
    
  }
}

export default OptionsList
