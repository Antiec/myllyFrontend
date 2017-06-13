import React, { Component } from 'react'
import '../css/App.css'

const coffeeList = [
    {
        name: 'Beans & Roses',
        roaster: 'Cafetoria',
        roast_level: 'City+',
        roast_date: 2017,
        objectID: 0,
    },
    {
        name: 'Brazil, vaalea',
        roaster: 'Paulig',
        roast_level: 'City+',
        roast_date: 2016,
        objectID: 1,
    }
]

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { coffeeList, }
    }

    onDismiss(id){
        const isNotId = item => item.objectID !== id
        const updatedList = this.state.coffeeList.filter(isNotId)
        this.setState({ coffeeList: updatedList })
    }

    render() {
        return (
            <div className="App">
                { this.state.coffeeList.map(item =>
                        <div key={item.objectID}>
                            <span>{item.name}</span>
                            <span>{item.roaster}</span>
                            <span>{item.roast_level}</span>
                            <span>{item.roast_date}</span>
                            <span>
                                <button onClick={() => this.onDismiss(item.objectID)} type="button"> Dismiss </button>
                            </span>
                        </div>
                )}
            </div>
        )
    }
}

export default App