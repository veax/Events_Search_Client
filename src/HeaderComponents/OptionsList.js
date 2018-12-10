import React, { Component } from 'react'
import { getCurrentPosition } from '../helperFunctions/geolocation'

class OptionsList extends Component {
    state = {
        // valueType: this.props[this.props.selectedOption][0],   type by default on first loading  
        valueType: '',
        valueLocation:'0.5',  // 5 is default value
        // list: this.props[this.props.selectedOption]
    }
    // componentWillReceiveProps(nextProps){   // to update default valueType on changing checkbox
    //     const { selectedOption } = nextProps
    //     if (selectedOption !== 'location' && selectedOption !== this.props.selectedOption){
    //         this.setState({
    //             valueType: nextProps[nextProps.selectedOption][0],
    //             list: nextProps[nextProps.selectedOption]
    //         })
    //     }
    //     this.props.handleSelectChange('')
    // }

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
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { selectedOption } = this.props
        const events = this.props[this.props.selectedOption]
        if (selectedOption !== 'location'){
            const list = events.map(option => {
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
                        <option value="0.5">500m</option>
                        <option value="1">1km</option>
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
