import React, { Component } from "react";
import { Table, Collapse } from "react-bootstrap";

import moment from "moment";

import { connect } from "react-redux";
import { ExtractionActions } from "../redux/extractions";
import { GrinderActions } from "../redux/grinder";

import NewExtractionForm from "./newextractionform";

const extractionList = [
  {
    name: "Beans & Roses",
    grinder: 900,
    extraction_time: 30,
    objectID: 0
  },
  {
    name: "Brazil, vaalea",
    grinder: 950,
    extraction_time: 20,
    objectID: 1
  },
  {
    name: "Hesun Herkku",
    grinder: 1000,
    extraction_time: 17,
    objectID: 2
  }
];

class ExtractionsRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailed: false
    };
  }

  handleClick = () => {
    this.setState({ detailed: !this.state.detailed });
  };

  render() {
    const { item } = this.props;
    return (
      <tbody id="extractionsBody">
        <tr onClick={() => this.handleClick()}>
          <td>{item.coffee}</td>
          <td>{item.grinder}</td>
          <td>{item.extractionTime}</td>
          <td>{item.weight}</td>
          <td>{item.grade}</td>
        </tr>
        <Collapse in={this.state.detailed}>
          <tr>
            <td>
              Roast Date:
              <br /> {item.roastDate}
            </td>
            <td>
              Age: <br />
              {moment("25072017", "DDMMYYYY").fromNow("dd")}
            </td>
            <td>Dose: {item.dose}</td>
            <td>Notes: {item.notes}</td>
          </tr>
        </Collapse>
      </tbody>
    );
  }
}

const ExtractionsTable = props => (
  <div style={{ width: "60%", paddingLeft: "17%" }}>
    <Table striped condensed bordered hover>
      <thead>
        <tr>
          <th style={{ width: "25%" }}>Coffee Name</th>
          <th style={{ width: "10%" }}>Grinder</th>
          <th style={{ width: "10%" }}>Time</th>
          <th style={{ width: "10%" }}>Weight</th>
          <th style={{ width: "30%" }}>Grade</th>
        </tr>
      </thead>
      {props.data.map(item => (
        <ExtractionsRow key={`${item._id}_row`} keym={item._id} item={item} />
      ))}
    </Table>
  </div>
);

class Extractions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      isDataLoaded: false
    };
  }

  async componentDidMount() {
    this.props.getExtractions();
  }

  render() {
    const {
      extractions,
      isDataLoaded,
      selectedExtraction,
      addExtraction,
      grinderMoving,
      moveGrinder
    } = this.props;
    return (
      <div id="extractions">
        <br />
        {isDataLoaded &&
          extractions && (
            <NewExtractionForm
              selectedExtraction={selectedExtraction}
              addExtraction={addExtraction}
              moveGrinder={moveGrinder}
              grinderMoving={grinderMoving}
            />
          )}
        {isDataLoaded && extractions ? (
          <ExtractionsTable data={extractions} />
        ) : (
          <p>Loading or no connection to DB!</p>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    extractions: state.extractions.extractions,
    selectedExtraction: state.extractions.selectedExtraction,
    isDataLoaded: state.extractions.isExtractionsDataLoaded,
    grinderMoving: state.grinder.grinderMoving
  }),
  {
    getExtractions: ExtractionActions.getExtractions,
    addExtraction: ExtractionActions.addExtraction,
    moveGrinder: GrinderActions.moveGrinder
  }
)(Extractions);
