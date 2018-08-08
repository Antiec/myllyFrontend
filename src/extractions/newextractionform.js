// @flow

import React, { Component, Fragment } from "react";
import axios from "axios";
import moment from "moment";
import update from "immutability-helper";
import { connect } from "react-redux";
import { ExtractionActions } from "../redux/extractions";
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Button,
  Panel
} from "react-bootstrap";

class NewExtractionForm extends Component {
  constructor(props) {
    super(props);
    const {
      coffee,
      method,
      roastDate,
      grinder,
      dose,
      temperature,
      infusionPressure,
      infusionTime
    } = this.props.selectedExtraction;
    let extraction = {
      method: { value: method ? method : "Espresso" },
      coffee: {
        value: coffee ? coffee : "",
        placeHolder: "Coffee name",
        type: "text"
      },
      roastDate: {
        value: roastDate ? roastDate : "",
        placeHolder: "Roast Date",
        type: "date"
      },
      extractionDate: {
        value: moment().format("YYYY-MM-DD"),
        placeHolder: "Extraction Date",
        type: "date"
      },
      grinder: {
        value: grinder ? grinder : "",
        placeHolder: "Grinder setting",
        type: "number"
      },
      infusionTime: {
        value: infusionTime ? infusionTime : "",
        placeHolder: "Infusion Time",
        type: "number"
      },
      infusionPressure: {
        value: infusionPressure ? infusionPressure : "",
        placeHolder: "Infusion Pressure",
        type: "number"
      },
      temperature: {
        value: temperature ? temperature : "",
        placeHolder: "Temperature",
        type: "number"
      },
      dose: {
        value: dose ? dose : "20.5",
        placeHolder: "Coffee dose",
        type: "number"
      },
      extractionTime: {
        value: "",
        placeHolder: "Extraction time",
        type: "number"
      },
      weight: { value: "", placeHolder: "Extraction weight", type: "number" },
      grade: { value: "", placeHolder: "Extraction grade", type: "number" },
      notes: { value: "", placeHolder: "Other notes", type: "text" }
    };

    this.state = {
      extraction,
      isMobile: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGrinderMove = this.handleGrinderMove.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  handleChange(event) {
    let newState = update(this.state, {
      extraction: {
        [event.target.name]: { value: { $set: event.target.value } }
      }
    });
    this.setState(newState);
  }

  updateDimensions() {
    this.setState({ isMobile: window.innerWidth <= 770 });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  handleSubmit = event => {
    event.preventDefault();
    let values = {};
    Object.keys(this.state.extraction).map(
      key => (values[key] = this.state.extraction[key].value)
    );
    console.log("Sending object:", values);
    this.props.addExtraction(values);

    //alert(`A name was submitted: ${this.state.Coffee}, ${this.state.CoffeeGrinder}, ${this.state.ExtractionTime}`);
  };

  handleGrinderMove(event) {
    axios
      .put(
        "http://192.168.10.48:3000/api/grinder/move",
        {
          grinder: this.state.extraction.grinder.value
        },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    //alert(`A name was submitted: ${this.state.Coffee}, ${this.state.CoffeeGrinder}, ${this.state.ExtractionTime}`);
    event.preventDefault();
  }

  render() {
    console.log(this.state.isMobile);
    const ext = this.state.extraction;
    return (
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="extractionMethodSelect">
            <Col sm={2} componentClass={ControlLabel}>
              Method:
            </Col>
            <Col sm={4}>
              <FormControl
                componentClass="select"
                placeholder="AP"
                name="method"
                value={this.state.extraction.method}
              >
                <option value="Espresso">Espresso</option>
                <option value="AP">AP</option>
                <option value="V60">V60</option>
              </FormControl>
            </Col>
          </FormGroup>
          {Object.keys(this.state.extraction).map(key => (
            <Fragment key={key}>
              {key !== "method" && (
                <span>
                  <FormGroup controlId={key}>
                    <Col componentClass={ControlLabel} sm={2}>
                      {ext[key].placeHolder}:
                    </Col>
                    <Col
                      sm={
                        key === "extractionDate" ||
                        key == "weight" ||
                        key === "grinder"
                          ? 3
                          : key === "infusion"
                            ? 2
                            : 4
                      }
                    >
                      <FormControl
                        type={ext[key].type}
                        name={key}
                        value={ext[key].value}
                        onChange={this.handleChange}
                        placeholder={ext[key].placeHolder}
                      />
                    </Col>
                    {!this.state.isMobile && (
                      <span>
                        {key === "extractionDate" && (
                          <Col componentClass={ControlLabel} sm={0}>
                            {moment(ext.roastDate.value, "YYYY-MM-DD").fromNow(
                              "dd"
                            )}{" "}
                            old
                          </Col>
                        )}
                        {key === "grinder" && (
                          <Button onClick={this.handleGrinderMove}>Move</Button>
                        )}
                        {key === "weight" && (
                          <Col componentClass={ControlLabel} sm={0}>
                            Ratio: {ext.weight.value / ext.dose.value}
                          </Col>
                        )}
                      </span>
                    )}
                  </FormGroup>
                  {this.state.isMobile === true && (
                    <FormGroup>
                      {key === "extractionDate" && (
                        <Col componentClass={ControlLabel} sm={1}>
                          {moment(ext.roastDate.value, "YYYY-MM-DD").fromNow(
                            "dd"
                          )}{" "}
                          old
                        </Col>
                      )}
                      {key === "grinder" && (
                        <Button
                          style={{ marginLeft: "15px" }}
                          onClick={this.handleGrinderMove}
                        >
                          Move
                        </Button>
                      )}
                      {key === "weight" && (
                        <Col componentClass={ControlLabel} sm={1}>
                          Ratio: {ext.weight.value / ext.dose.value}
                        </Col>
                      )}
                    </FormGroup>
                  )}
                </span>
              )}
            </Fragment>
          ))}

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

export default NewExtractionForm;
