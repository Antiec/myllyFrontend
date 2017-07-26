import React, { Component } from 'react'
import { Table, } from 'react-bootstrap'

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
    render(){
        const { extractionList, } = this.props

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
                { extractionList.map(item =>
                    <tr key={item.objectID}>
                        <td>{item.name}</td>
                        <td>{item.grinder}</td>
                        <td>{item.extraction_time}</td>
                    </tr>
                )}
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