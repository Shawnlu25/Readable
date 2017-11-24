import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class NavigationBar extends Component {
  static propTypes = {
    categories : PropTypes.array.isRequired
  }
  
  render() {
    const {categories} = this.props
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
      		<LinkContainer to={"/"}><div><strong>Readable</strong> <small>An React App</small></div></LinkContainer>
      	  </Navbar.Brand>
      	</Navbar.Header>
      	<Nav>
      	  <NavDropdown title="Categories" id="category_dropdown">
            {categories.length !== 0 && categories.sort().map((category) =>
              <LinkContainer to={"/"+category.name} key={category.name}><MenuItem key={category.name}>{category.name}</MenuItem></LinkContainer>
            )}
            {categories.length === 0 && (<MenuItem>(None)</MenuItem>)}
          </NavDropdown>
          <LinkContainer to={"/postedit/new"}><NavItem>New Post</NavItem></LinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

export default NavigationBar;