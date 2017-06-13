import React from "react"
import { observer } from "mobx-react"

@observer
export default class CoffeeList extends React.Component {
  createNew(e){
    if( e.which === 13 ){
      this.props.store.createCoffee(e.target.value)
        e.target.value = ""
    }
  }

  filter(e){
      this.props.store.filter = e.target.value
  }

  toggleComplete(coffee){
      coffee.complete = !coffee.complete
  }



  render() {

    const { clearComplete, filter, filteredCoffees, coffees } = this.props.store
    const coffeeLis = filteredCoffees.map( coffee => (
        <li key={coffee.id}>
            <input type="checkbox" value={coffee.complete} onChange={this.toggleComplete.bind(this, coffee)} checked={coffee.complete} />{coffee.value}</li>
      ))

      return <div>
          <h1>Coffees</h1>
        <input className="create" onKeyPress={this.createNew.bind(this)} />
          <input className="filter" value={filter} onChange={this.filter.bind(this)} />
          <ul>{coffeeLis}</ul>
          <a href="#" onClick={clearComplete}>Clear Complete</a>
        </div>
  }
}
