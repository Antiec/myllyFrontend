import React, { Component, } from 'react'
import axios from 'axios'
import { Form, FormGroup, FormControl,
  Col, ControlLabel, Button, } from 'react-bootstrap'

class GrinderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {grinder: '', currentValue: 0};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleSubmit(event) {
    axios.put('http://localhost:3000/api/grinder/set', {
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

  componentDidMount(){
    axios.get('http://localhost:3000/api/grinder/')
      .then((response) => {
        this.setState({currentValue: response.data.currentValue, isDataLoaded: true});
        console.log(this.state.data, this.state.isDataLoaded, );
        //console.log(response);
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const inputs = [
      { objectID: 'grinder', placeHolder:'New grinder value', type: 'number'},
    ];

    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          { inputs.map(item =>
            <FormGroup controlId={item.objectID} key={item.objectID}>
              <Col componentClass={ControlLabel} sm={2}>
                {item.placeHolder}
              </Col>
              <Col sm={3}>
                <FormControl type={item.type} name={item.objectID} value={this.state[item.objectID]} onChange={this.handleChange} placeholder={this.state.currentValue}/>
              </Col>
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

class GrinderSettings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="extractions">
        <br/>
        <GrinderForm />
      </div>
    )
  }
}

export default GrinderSettings;