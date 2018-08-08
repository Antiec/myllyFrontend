import React, { Component } from 'react'
import { Table, } from 'react-bootstrap'

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
    },
    {
      name: 'Hesun Herkku',
      roaster: 'Hesu~',
      roast_level: 'Full City',
      roast_date: 2017,
      objectID: 2,
    },
];

class CoffeesTable extends Component {
    render(){
        const { coffeeList, } = this.props

        return (
          <div style={{ width: "60%", paddingLeft: "17%"}}>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Coffee Name</th>
                  <th>Roaster</th>
                  <th>Roast Level</th>
                  <th>Roast Date</th>
                </tr>
              </thead>
              <tbody>
                { coffeeList.map(item =>
                    <tr key={item.objectID}>
                        <td>{item.name}</td>
                        <td>{item.roaster}</td>
                        <td>{item.roast_level}</td>
                        <td>{item.roast_date}</td>
                    </tr>
                )}
              </tbody>
            </Table>
          </div>
        )
    }
}

class Coffees extends Component {
    constructor(props) {
        super(props)

        this.state = { coffeeList, }

    }

    render() {
        const { coffeeList, } = this.state
        return (
          <div id="coffees">
            <CoffeesTable coffeeList={coffeeList} />
          </div>
        )
    }
}

export default Coffees;