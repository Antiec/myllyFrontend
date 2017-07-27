import React, { Component, fetch } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Form, FormGroup, FormControl,
  Col, ControlLabel, Button, } from 'react-bootstrap'

class NewExtractionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffee: '',
      date: moment().format('YYYY-MM-DD'),
      grinder: '',
      weight: 20.0,
      extractionTime: '',
      grade: '',
      notes: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGrinderMove = this.handleGrinderMove.bind(this);
  }

  handleChange(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleSubmit(event) {

    axios.post('http://localhost:3000/api/extractions', {
      coffee: this.state.coffee,
      grinder: this.state.grinder,
      extractionTime: this.state.extractionTime,
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

  handleGrinderMove(event){
    axios.post('http://localhost:3000/api/grinder/move', {
      grinder: this.state.grinder,
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
      { objectID: 'coffee', placeHolder: 'Coffee name', type: 'text'},
      { objectID: 'date', placeHolder:'Current Date', type: 'date'},
      { objectID: 'grinder', placeHolder:'Grinder setting', type: 'number'},
      { objectID: 'weight', placeHolder:'Coffee weight', type: 'number'},
      { objectID: 'extractionTime', placeHolder: 'Extraction time', type: 'number'},
      { objectID: 'grade', placeHolder: 'Extraction grade', type: 'number'},
      { objectID: 'notes', placeHolder: 'Other notes', type: 'text'},
    ];

    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          { inputs.map(item =>
            <FormGroup controlId={item.objectID} key={item.objectID}>
              <Col componentClass={ControlLabel} sm={2}>
                {item.placeHolder}:
              </Col>
              <Col sm={ item.objectID === 'date' ? 2 : 3 }>
                <FormControl type={item.type} name={item.objectID} value={this.state[item.objectID]} onChange={this.handleChange} placeholder={item.placeHolder}/>
              </Col>
              { item.objectID === "grinder" ? <Button onClick={this.handleGrinderMove}>Move</Button> : '' }
              { item.objectID === 'date' ? <Col componentClass={ControlLabel} sm={2}>{moment("25072017", "DDMMYYYY").fromNow('dd')} old</Col> : '' }
            </FormGroup>
          )}

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default NewExtractionForm;