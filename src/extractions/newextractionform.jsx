import React, { Component, fetch } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Form, FormGroup, FormControl,
  Col, ControlLabel, Button, Panel, } from 'react-bootstrap'

class NewExtractionForm extends Component {
  constructor(props) {
    super(props);
    const fr = this.props.firstResult;
    if( fr !== undefined) {
      this.state = {
        coffee: fr.coffee,
        roastDate: fr.roastDate,
        extractionDate: moment().format('YYYY-MM-DD'),
        grinder: fr.grinder,
        dose: fr.dose,
        extractionTime: '',
        weight: '',
        grade: '',
        notes: '',
        isMobile: false,
      };
    } else {
      this.state = {
        coffee: '',
        roastDate: '',
        extractionDate: moment().format('YYYY-MM-DD'),
        grinder: '',
        dose: 20.5,
        extractionTime: '',
        weight: '',
        grade: '',
        notes: '',
        isMobile: false,
      };
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGrinderMove = this.handleGrinderMove.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  handleChange(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  updateDimensions(){
    this.setState({isMobile: window.innerWidth <= 770 })
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  handleSubmit(event) {
    const s = this.state;
    axios.post('http://192.168.10.48:3000/api/extractions', {
      coffee: s.coffee,
      roastDate: s.roastDate,
      extractionDate: s.extractionDate,
      grinder: s.grinder,
      dose: s.dose,
      extractionTime: s.extractionTime,
      weight: s.weight,
      grade: s.grade,
      notes: s.notes,
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
    axios.put('http://192.168.10.48:3000/api/grinder/move', {
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
      { objectID: 'roastDate', placeHolder: 'Roast Date', type: 'date'},
      { objectID: 'extractionDate', placeHolder:'Extraction Date', type: 'date'},
      { objectID: 'grinder', placeHolder:'Grinder setting', type: 'number'},
      { objectID: 'dose', placeHolder:'Coffee dose', type: 'number'},
      { objectID: 'extractionTime', placeHolder: 'Extraction time', type: 'number'},
      { objectID: 'weight', placeHolder: 'Extraction weight', type: 'number'},
      { objectID: 'grade', placeHolder: 'Extraction grade', type: 'number'},
      { objectID: 'notes', placeHolder: 'Other notes', type: 'text'},
    ];
    console.log(this.state.isMobile);
    return (
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Form horizontal onSubmit={this.handleSubmit}>
          { inputs.map(item =>
            <span key={item.objectID}>
              <FormGroup controlId={item.objectID} >
                <Col componentClass={ControlLabel} sm={2}>
                  {item.placeHolder}:
                </Col>
                <Col sm={ item.objectID === 'extractionDate' || item.objectID === 'grinder' ? 3 : 4 }>
                  <FormControl type={item.type} name={item.objectID} value={this.state[item.objectID]} onChange={this.handleChange} placeholder={item.placeHolder}/>
                </Col>
                { !this.state.isMobile &&
                  <span>
                  { item.objectID === 'extractionDate' && <Col componentClass={ControlLabel} sm={0}>{moment(this.state.roastDate, "YYYY-MM-DD").fromNow('dd')} old</Col> }
                  { item.objectID === "grinder" && <Button onClick={this.handleGrinderMove}>Move</Button> }
                  </span>
                }
              </FormGroup>
              { this.state.isMobile === true &&
                  <FormGroup>
                    { item.objectID === 'extractionDate' && <Col componentClass={ControlLabel} sm={1}>{moment(this.state.roastDate, "YYYY-MM-DD").fromNow('dd')} old</Col> }
                    { item.objectID === "grinder" && <Button style={{marginLeft:"15px"}} onClick={this.handleGrinderMove}>Move</Button> }
                  </FormGroup>
              }
            </span>
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