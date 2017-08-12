import React, {Component, fetch} from 'react'
import axios from 'axios'
import moment from 'moment'
import {
	Form, FormGroup, FormControl,
	Col, ControlLabel, Button, Panel,
} from 'react-bootstrap'

class NewExtractionForm extends Component {
	constructor(props) {
		super(props);
		const { coffee, roastDate, grinder, dose } = this.props.firstResult;
		let extraction = {
			coffee: {value: coffee ? coffee : '', placeHolder: 'Coffee name', type: 'text'},
			roastDate: {value: roastDate ? roastDate : '', placeHolder: 'Roast Date', type: 'date'},
			grinder: {value: grinder? grinder : '', placeHolder: 'Grinder setting', type: 'number'},
			dose: {value: dose ? dose : '20.5', placeHolder: 'Coffee dose', type: 'number'},
			extractionDate: {value: moment().format('YYYY-MM-DD'), placeHolder: 'Extraction Date', type: 'date'},
			extractionTime: {value: '', placeHolder: 'Extraction time', type: 'number'},
			weight: {value: '', placeHolder: 'Extraction weight', type: 'number'},
			grade: {value: '', placeHolder: 'Extraction grade', type: 'number'},
			notes: {value: '', placeHolder: 'Other notes', type: 'text'},
		};

		this.state = {
			extraction,
			isMobile: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleGrinderMove = this.handleGrinderMove.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	handleChange(event) {
		var change = { extraction : {} };
		change.extraction[event.target.name] = event.target.value;
		this.setState(change);
	}

	updateDimensions() {
		this.setState({isMobile: window.innerWidth <= 770})
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	handleSubmit(event) {
		axios.post('http://192.168.10.48:3000/api/extractions',
			this.state.extraction,
			{headers: {'Access-Control-Allow-Origin': '*'},})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		//alert(`A name was submitted: ${this.state.Coffee}, ${this.state.CoffeeGrinder}, ${this.state.ExtractionTime}`);
		event.preventDefault();
	}

	handleGrinderMove(event) {
		axios.put('http://192.168.10.48:3000/api/grinder/move', {
			grinder: this.state.grinder,
		}, {headers: {'Access-Control-Allow-Origin': '*'},})
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
		console.log(this.state.isMobile);
		const ext = this.state.extraction;
		return (
			<div style={{paddingLeft: "20px", paddingRight: "20px"}}>
				<Form horizontal onSubmit={this.handleSubmit}>
					{Object.keys(this.state.extraction).map(key =>
						<span key={key}>
              <FormGroup controlId={key}>
                <Col componentClass={ControlLabel} sm={2}>
                  {ext[key].placeHolder}:
                </Col>
                <Col sm={key === 'extractionDate' || key === 'grinder' ? 3 : 4}>
                  <FormControl type={ext[key].type} name={ext[key].objectID} value={ext.roastDate.value}
                               onChange={this.handleChange} placeholder={ext[key].placeHolder}/>
                </Col>
	              {!this.state.isMobile &&
	              <span>
                  {key === 'extractionDate' &&
                  <Col componentClass={ControlLabel} sm={0}>{moment(ext.roastDate.value, "YYYY-MM-DD").fromNow('dd')}
	                  old</Col>}
		              {key === "grinder" && <Button onClick={this.handleGrinderMove}>Move</Button>}
                  </span>
	              }
              </FormGroup>
							{this.state.isMobile === true &&
							<FormGroup>
								{key === 'extractionDate' &&
								<Col componentClass={ControlLabel} sm={1}>{moment(ext[key].value, "YYYY-MM-DD").fromNow('dd')}
									old</Col>}
								{key === "grinder" &&
								<Button style={{marginLeft: "15px"}} onClick={this.handleGrinderMove}>Move</Button>}
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