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
          <td>{item.grade}</td>
        </tr>
        <Collapse in={this.state.detailed}>
          <tr>
            <td>Date: {item.date}</td>
            <td>Age: {moment("25072017", "DDMMYYYY").fromNow('dd')} old</td>
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

    this.state = {
      data: "",
      isDataLoaded: false,
      detailed: false,
    };

  }

  componentDidMount(){
    axios.get('http://localhost:3000/api/extractions/')
      .then((response) => {
        this.setState({data: response.data});
        this.setState({isDataLoaded: true});
        //console.log(response);
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


    render(){
        const { extractionList, } = this.props

        return (
          <div style={{ width: "60%", paddingLeft: "17%"}}>
            <Table striped condensed bordered hover>
              <thead>
                <tr>
                  <th>Coffee Name</th>
                  <th>Grinder</th>
                  <th>Time</th>
                  <th>Grade</th>
                </tr>
              </thead>
              { this.state.isDataLoaded ? this.state.data.map(item =>
                <ExtractionsRow key={item._id} item={item}/>
              ) : ''}
            </Table>
          </div>
        )
    }
}

class Extractions extends Component {
  constructor(props) {
      super(props)

      this.state = { extractionList, }
  }

  render() {
      const { extractionList, } = this.state
      return (
        <div id="extractions">
          <br/>
          <NewExtractionForm />
          <ExtractionsTable extractionList={extractionList} />
        </div>
      )
  }
}

export default Extractions;