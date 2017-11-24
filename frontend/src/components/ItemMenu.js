import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Glyphicon, Dropdown, MenuItem } from 'react-bootstrap'

class ItemMenu extends Component {
  static propTypes = {
    menuItems : PropTypes.array.isRequired
  }

  render() {
    const {menuItems} = this.props
    return (
      <Dropdown id="dropdown">
       <Dropdown.Toggle>
         <Glyphicon glyph="cog" />
       </Dropdown.Toggle>
       <Dropdown.Menu className="super-colors">
        { menuItems.map(item => (
          <MenuItem key={item.name} onClick={item.onClick}>{item.name}</MenuItem>
        ))} 
       </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default ItemMenu