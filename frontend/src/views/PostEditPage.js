import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap'

import PostForm from '../components/PostForm'
import * as ReadableAPI from '../utils/readableAPI'
import * as actions from '../actions'
import uuidv4 from 'uuid/v4'

class PostEditPage extends Component {
  
  editPost = (_) => {
    return (post) => {
      if (post.id === undefined) {
        post.id = uuidv4()
      }
      if (post.author ==='') {
        post.author = 'anonymous'
      }
      post.timestamp = Date.now()
      ReadableAPI.updatePost(post).then(post => {this.props.renewPost(post)})
      this.props.history.push('/')
    }
  }

  addPost = (_) => {
    return (post) => {
      if (post.id === undefined) {
        post.id = uuidv4()
      }
      if (post.author ==='') {
        post.author = 'anonymous'
      }
      post.timestamp = Date.now()
      ReadableAPI.addPost(post).then(post => {this.props.renewPost(post)})
      this.props.history.push('/')
    }
  }
  
  render() {
    const {postId} = this.props.match.params
    let post = {}
    if (postId !== 'new') {
      post = this.props.posts[postId]
    }
    if (post === undefined) {
      return (<Grid><Row><h3>Oops! This post is not found</h3></Row></Grid>)
    }
    return (
      <Grid>
        <Row>
          {postId === 'new' && (
          <PostForm submitText="Submit" post={post} onClick={this.addPost()} categories={this.props.categoryNames}/> )}
          {postId !== 'new' && (
          <PostForm submitText="Submit" post={post} onClick={this.editPost()} categories={this.props.categoryNames}/> )}
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps({posts, categories}) {
  return {
    posts : posts === undefined ? {} : posts,
    categoryNames : Array.isArray(categories) ? categories.map((category) => {return category.name}) : [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories : (categories) => dispatch(actions.loadCategories(categories)),
    renewPost :   (post) => dispatch(actions.loadPosts({posts : [post]})),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEditPage))