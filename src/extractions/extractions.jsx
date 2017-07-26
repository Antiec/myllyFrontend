import React, { Component } from 'react'
import { Table, } from 'react-bootstrap'
import axios from 'axios'

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

class ExtractionsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      isDataLoaded: false,
    };
  }

  componentDidMount(){
    axios.get('http://localhost:3000/extractions/')
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

        console.log(this.state.data);

        return (
          <div style={{ width: "60%", paddingLeft: "17%"}}>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Coffee Name</th>
                  <th>Grinder setting</th>
                  <th>Extraction time</th>
                </tr>
              </thead>
              <tbody>
                { this.state.isDataLoaded ? this.state.data.map(item =>
                    <tr key={item._id}>
                        <td>{item.Coffee}</td>
                        <td>{item.Grinder}</td>
                        <td>{item.ExtractionTime}</td>
                    </tr>
                ) : ''}
              </tbody>
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
          <NewExtractionForm/>
          <ExtractionsTable extractionList={extractionList} />
        </div>
      )
  }
}

export default Extractions;