import React, { Component } from 'react'
import { Table, Collapse, } from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'

import NewExtractionForm from './newextractionform.jsx'

const extractionList = [
    {
      name: 'Beans & Roses',
      grinder: 900,
      extraction_time: 30,
      objectID: 0,
    },
    {
      name: 'Brazil, vaalea',
      grinder: 950,
      extraction_time: 20,
      objectID: 1,
    },
    {
      name: 'Hesun Herkku',
      grinder: 1000,
      extraction_time: 17,
      objectID: 2,
    },
];

class ExtractionsRow extends Component{

  constructor(props) {
    super(props);

    this.state = {
      detailed: false,
    };

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState({detailed: !this.state.detailed});
  }

  render(){
    const { item } = this.props;
    return (<tbody id="extractionsBody">
        <tr onClick={() => this.handleClick()}>
          <td>{item.coffee}</td>
          <td>{item.grinder}</td>
          <td>{item.extractionTime}</td>
          <td>{item.weight}</td>
          <td>{item.grade}</td>
        </tr>
        <Collapse in={this.state.detailed}>
          <tr>
            <td>Roast Date:<br/> {item.roastDate}</td>
            <td>Age: <br/>{moment("25072017", "DDMMYYYY").fromNow('dd')}</td>
            <td>Dose: {item.dose}</td>
            <td>Notes: {item.notes}</td>
          </tr>
        </Collapse>
      </tbody>)
  }
}

class ExtractionsTable extends Component {
  constructor(props) {
    super(props);

  }


    render(){
        const { data} = this.props

        return (
          <div style={{ width: "60%", paddingLeft: "17%"}}>
            <Table striped condensed bordered hover>
              <thead>
                <tr>
                  <th style={{width: "25%"}}>Coffee Name</th>
                  <th style={{width: "10%"}}>Grinder</th>
                  <th style={{width: "10%"}}>Time</th>
                  <th style={{width: "10%"}}>Weight</th>
                  <th style={{width: "30%"}}>Grade</th>
                </tr>
              </thead>
              { data.map(item =>
                <ExtractionsRow key={item._id} item={item}/>) }
            </Table>
          </div>
        )
    }
}

class Extractions extends Component {
  constructor(props) {
      super(props)

    this.state = {
      data: "",
      isDataLoaded: false,
    };
  }

  componentDidMount(){

    axios.get('http://192.168.10.48:3000/api/extractions/')
      .then((response) => {
        this.setState({data: response.data, isDataLoaded: true});
        console.log(this.state.data, this.state.isDataLoaded, );
        //console.log(response);
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
      const { data, isDataLoaded} = this.state
      return (
        <div id="extractions">
          <br/>
          { isDataLoaded &&
          <NewExtractionForm firstResult={data[data.length - 1]}/> }
          { isDataLoaded ?
          <ExtractionsTable data={data} /> : <p>Loading or no connection to DB!</p>}
        </div>
      )
  }
}

export default Extractions;