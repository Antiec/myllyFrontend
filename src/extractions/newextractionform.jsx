import React, { Component, fetch } from 'react'
import axios from 'axios'
import { Form, FormGroup, FormControl,
  Col, ControlLabel, Button, } from 'react-bootstrap'

class NewExtractionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {Coffee: '', 'Grinder': '', 'ExtractionTime': '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleSubmit(event) {

    axios.post('http://localhost:3000/extractions', {
      Coffee: this.state.Coffee,
      Grinder: this.state.Grinder,
      ExtractionTime: this.state.ExtractionTime,
    }, {headers:{'Access-Control-Allow-Origin': '*'}, })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    //alert(`A name was submitted: ${this.state.Coffee}, ${this.state.CoffeeGrinder}, ${this.state.ExtractionTime}`);
    event.preventDefault();
  }

  render() {
    const inputs = [
      { objectID: 'Coffee', placeHolder: 'Mikä kahvi?', },
      { objectID: 'Grinder', placeHolder:'Myllyn asetus', },
      { objectID: 'ExtractionTime', placeHolder: 'Kauanko uutossa meni?', },
    ];

    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          { inputs.map(item =>
            <FormGroup controlId={item.objectID} key={item.objectID}>
              <Col componentClass={ControlLabel} sm={2}>
                {item.objectID}:
              </Col>
              <Col sm={5}>
                <FormControl type="text" name={item.objectID} value={this.state[item.objectID]} onChange={this.handleChange} placeholder={item.placeHolder}/>
              </Col>
            </FormGroup>
          )}

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Tallenna
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default NewExtractionForm;