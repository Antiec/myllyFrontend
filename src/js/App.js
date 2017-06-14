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

function isSearched(searchTerm){
    return function(item){
        return !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())
    }
}

class Button extends Component {
    render () {
        const { onClick , className = '' , children , } = this.props
        return (
            <button
                onClick={ onClick }
                className={ className }
                type="button"
            >
                { children }
            </button>
        )
    }
}

const Search = ({value, onChange, children})=>
            <form>
                {children}<input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </form>


class Table extends Component{
    render(){
        const { coffeeList, pattern, onDismiss } = this.props
        return (
            <div>
            { coffeeList.filter(isSearched(pattern)).map(item =>
                <div key={item.objectID}>
                    <span>{item.name}</span>
                    <span>{item.roaster}</span>
                    <span>{item.roast_level}</span>
                    <span>{item.roast_date}</span>
                    <span>
                                <Button onClick={() => onDismiss(item.objectID)}>
                                    Dismiss
                                </Button>
                            </span>
                </div>
            )}
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { coffeeList, searchTerm: '',}

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(event){
        this.setState({ searchTerm: event.target.value })
    }

    onDismiss(id){
        const isNotId = item => item.objectID !== id
        const updatedList = this.state.coffeeList.filter(isNotId)
        this.setState({ coffeeList: updatedList })
    }

    render() {
        const { coffeeList, searchTerm } = this.state
        return (
            <div className="page">
                <div className="interactions">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                >Search:</Search>
                </div>
                <Table
                    coffeeList={coffeeList}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />



            </div>
        )
    }
}

export default App