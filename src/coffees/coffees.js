import React, { Component } from "react";
import { Table } from "react-bootstrap";

import NewCoffeeForm from "./newcoffeeform";

import { coffeeType } from "../utils/types";
import thunk from "redux-thunk";

const coffeeList = [
  {
    name: "Beans & Roses",
    roaster: "Cafetoria",
    roast_level: "City+",
    roast_date: 2017,
    country: "Kenya",
    area: "Rocko Mountain",
    mainSpecies: "Arabica",
    secondarySpecies: "Yirgacheffe",
    growthHeight: 2000,
    processMethod: "Natural",
    objectID: 0
  },
  {
    name: "Brazil, vaalea",
    roaster: "Paulig",
    roast_level: "City+",
    roast_date: 2016,
    country: "Columbia",
    area: "whateva",
    mainSpecies: "Arabica",
    secondarySpecies: "Yirgacheffe",
    growthHeight: 1200,
    processMethod: "Washed",
    objectID: 1
  },
  {
    name: "Hesun Herkku",
    roaster: "Hesu~",
    roast_level: "Full City",
    roast_date: 2017,
    country: "Indonesia",
    area: "Whateva",
    mainSpecies: "Arabica",
    secondarySpecies: "Yirgacheffe",
    growthHeight: 2000,
    processMethod: "Semi-Washed",
    objectID: 2
  }
];

class CoffeesTable extends Component {
  render() {
    const { coffeeList } = this.props;

    return (
      <div style={{ width: "60%", paddingLeft: "17%" }}>
        <NewCoffeeForm />
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Coffee Name</th>
              <th>Roaster</th>
              <th>Roast Level</th>
              <th>Roast Date</th>
              <th>Country</th>
              <th>Area</th>
              <th>Main Species</th>
              <th>Secondary Species</th>
              <th>Growth Height</th>
              <th>Process Method</th>
            </tr>
          </thead>
          <tbody>
            {coffeeList.map(item => (
              <tr key={item.objectID}>
                <td>{item.name}</td>
                <td>{item.roaster}</td>
                <td>{item.roast_level}</td>
                <td>{item.roast_date}</td>
                <td>{item.country}</td>
                <td>{item.area}</td>
                <td>{item.mainSpecies}</td>
                <td>{item.secondarySpecies}</td>
                <td>{item.growthHeight}</td>
                <td>{item.processMethod}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

class Coffees extends Component {
  constructor(props) {
    super(props);

    this.state = { coffeeList };
  }

  render() {
    const { coffeeList } = this.state;
    return (
      <div id="coffees">
        <CoffeesTable coffeeList={coffeeList} />
      </div>
    );
  }
}

export default Coffees;
