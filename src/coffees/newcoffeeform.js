// @flow

import React, { Component } from "react";
import moment from "moment";
import update from "immutability-helper";
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Button
} from "react-bootstrap";

class NewCoffeeForm extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      roaster,
      roastLevel,
      roastDate,
      country,
      area,
      mainSpecies,
      secondarySpecies,
      growthHeight,
      processMethod
    } = this.props.copiedCoffee;

    let coffee = {
      name: name && "",
      roaster: roaster && "",
      roastLevel: roastLevel && "",
      roastDate: roastDate && null,
      country: country && "",
      area: area && "",
      mainSpecies: mainSpecies && "",
      secondarySpecies: secondarySpecies && "",
      growthHeight: growthHeight && 0,
      processMethod: processMethod && ""
    };

    this.state = {
      coffee,
      isMobile: false
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  handleChange = event => {
    let newState = update(this.state, {
      coffee: {
        [event.target.name]: { value: { $set: event.target.value } }
      }
    });
    this.setState(newState);
  };

  updateDimensions() {
    this.setState({ isMobile: window.innerWidth <= 770 });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  handleSubmit = event => {
    event.preventDefault();
    let values = {};
    Object.keys(this.state.coffee).map(
      key => (values[key] = this.state.coffee[key])
    );
    console.log("Sending object:", values);
    this.props.addCoffee(values);

    //alert(`A name was submitted: ${this.state.Coffee}, ${this.state.CoffeeGrinder}, ${this.state.ExtractionTime}`);
  };

  render() {
    console.log(this.state.isMobile);
    const coffee = this.state.coffee;
    return (
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="name">
            <Col componentClass={ControlLabel} sm={2}>
              Name:
            </Col>
            <Col sm={6}>
              <FormControl
                type="string"
                name="name"
                value={coffee.name.value}
                onChange={this.handleChange}
                placeholder="Coffee Name"
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Save</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default NewCoffeeForm;
