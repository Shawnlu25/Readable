import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Label} from 'react-bootstrap'
import RelativeTime from 'react-relative-time'
import { LinkContainer } from 'react-router-bootstrap'

class PostListItem extends Component {
  static propTypes = {
    title : PropTypes.string.isRequired,
    votes : PropTypes.number.isRequired,
    author : PropTypes.string.isRequired,
    timestamp : PropTypes.number.isRequired,
    postCategory : PropTypes.string.isRequired,
    postId : PropTypes.string.isRequired
  }

  render () {
    const {title, votes, author, timestamp, postCategory, postId} = this.props 
    return (
      
        <Grid>
          <Row>
            <Col xs={1} md={1}>
              <h4 className="list-group-item-heading text-center">{votes}</h4>
              <h4 className="list-group-item-heading text-center"><small> votes </small></h4>
            </Col>
            <Col xs={10} md={10}>
              <LinkContainer to={"/" + postCategory + "/"+postId}>
                <a><h4 className="list-group-item-heading text-left"><strong>{title}</strong> <Label>{postCategory}</Label></h4></a>
              </LinkContainer>
              <h4 className="list-group-item-text text-left">
                <small>Submitted by {author} <RelativeTime value={timestamp} titleFormat="YYYY/MM/DD HH:mm" /></small>
              </h4>
            </Col>
          </Row>
        </Grid>
      
    )
  }
}

export default PostListItem;