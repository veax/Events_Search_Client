import React, { Component } from 'react'
import { getCurrentPosition } from '../helperFunctions/geolocation'

class OptionsList extends Component {
    state = {
        valueType: '',
        valueLocation:'5',  // 5 is default value
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
        getCurrentPosition().then(position => {
            const { latitude, longitude } = position.coords
            const radius = this.state.valueLocation
            const coords = [latitude, longitude, radius]
            this.props.handleSelectChange(coords)
            // fetch('http://localhost:8080/eventsByLocation', {
            //     method: 'POST',
            //     headers : new Headers(),
            //     body:JSON.stringify({latitude, longitude, radius})
            // }).then((res) => res.json())
            // .then((data) =>  {
                // this.setState({
                //     eventsResultLoc: data
                // })
            //     this.props.loadEventsLoc(data)
            // })
            // .catch((err)=>console.log(err))
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { selectedOption } = this.props
        if (selectedOption !== 'location'){
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

export default OptionsList
