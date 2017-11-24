import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, Grid, Row, Col, Glyphicon, ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'

import * as ReadableAPI from '../utils/readableAPI'
import * as actions from '../actions'
import PostListItem from './PostListItem'
import ItemMenu from './ItemMenu'

class PostList extends Component {
  static propTypes = {
    posts : PropTypes.array.isRequired
  }
  
  upVote(postId) {
    ReadableAPI.upvoteByPostId(postId).then(post => {this.props.renewPost(post)})
  }
  
  downVote(postId) {
    ReadableAPI.downvoteByPostId(postId).then(post => {this.props.renewPost(post)})
  }
  
  deletePost(postId) {
    ReadableAPI.deletePost(postId).then(() => {this.props.deletePost(postId)})
  }

  render() {
    const {posts, postListPreference} = this.props
    return (
      <Grid>
      <Row>
        <ButtonToolbar>
          <Dropdown id="dropdown-sort">
            <Dropdown.Toggle>
              <Glyphicon glyph="sort" />
                Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <MenuItem eventKey="1" onClick={(e) => this.props.setPostListPreference({preference : {postListPreference : {key : "-timestamp"}}})}>Time</MenuItem>
              <MenuItem eventKey="2" onClick={(e) => this.props.setPostListPreference({preference : {postListPreference : {key : "-voteScore"}}})}>Vote</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonToolbar>
      </Row>
      <Row>
        <ListGroup>
        {posts.length !== 0 && posts.sort(sortBy(postListPreference.key)).map((post) =>
              <ListGroupItem key={post.id}>
                 <Grid>
                   <Row>
                     <Col xs={11} md={11}>
                       <PostListItem key={post.id} title={post.title} votes={post.voteScore} author={post.author} timestamp={post.timestamp} postCategory={post.category} postId={post.id} componentClass="ul"/>
                     </Col>
                     <Col xs={1} md={1}>
                       <ItemMenu menuItems={[{name : 'Edit', onClick : (e) => {this.props.history.push("/postedit/" + post.id)}},
                            {name : 'Delete', onClick : (e) => {this.deletePost(post.id)}},
                            {name : 'UpVote', onClick : (e) => {this.upVote(post.id)}},
                            {name : 'DownVote', onClick : (e) => {this.downVote(post.id)}}
                           ]} />
                     </Col>
                   </Row>
                </Grid>
              </ListGroupItem>
            )}
        </ListGroup>
       </Row>
      </Grid>
    )
  }
}

function mapStateToProps({preferences}) {
  return {
    postListPreference : preferences.postListPreference !== undefined ? preferences.postListPreference : {"key" : "-voteScore"}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPostListPreference : (preference) => dispatch(actions.setPreference(preference)),
    renewPost :   (post) => dispatch(actions.loadPosts({posts : [post]})),
    deletePost :  (postId) => dispatch(actions.deletePost({postId}))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));