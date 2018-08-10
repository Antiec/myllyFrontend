import React, { Component } from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import Extractions from '../extractions/extractions';
import Coffees from '../coffees/coffees';
import Grinder from '../grinder/grinder';

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <Container>
          <Switch>
            <Route exact path='/' component={Extractions} />
            <Route path='/coffees' component={Coffees} />
            <Route path='/grinder' component={Grinder} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </HashRouter>
    )
  }
}

const TopNavigation = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Grinder Pagio</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <IndexLinkContainer to="/">
        <NavItem eventKey={1}>Extractions</NavItem>
      </IndexLinkContainer>
      <IndexLinkContainer to="/coffees">
        <NavItem eventKey={2}>Coffees</NavItem>
      </IndexLinkContainer>
      <IndexLinkContainer to="/Grinder">
        <NavItem eventKey={2}>Grinder settings</NavItem>
      </IndexLinkContainer>
    </Nav>
  </Navbar>
)

const Container = (props) => <div>
  <TopNavigation />
  {props.children}
</div>

const NotFound = () => (
  <div>404: Not Found</div>
)

export default Main