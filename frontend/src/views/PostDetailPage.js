import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Row, Button, ButtonGroup } from 'react-bootstrap'
import * as actions from '../actions'
import * as ReadableAPI from '../utils/readableAPI'
import RelativeTime from 'react-relative-time'
import sortBy from 'sort-by'
import CommentDisplayItem from '../components/CommentDisplayItem'
import CommentForm from '../components/CommentForm'
import uuidv4 from 'uuid/v4'

class PostDetailPage extends Component {
  
  componentDidMount() {
    const {postId} = this.props.match.params
    if (postId !== undefined){
      ReadableAPI.fetchCommentsByPostId(postId).then(comments => this.props.loadCommentsByPostId(postId, comments))
    }
  }
  
  upVote(postId) {
    ReadableAPI.upvoteByPostId(postId).then(post => {this.props.renewPost(post)})
  }
  
  downVote(postId) {
    ReadableAPI.downvoteByPostId(postId).then(post => {this.props.renewPost(post)})
  }
  
  deletePost(postId) {
    ReadableAPI.deletePost(postId).then(() => {this.props.deletePost(postId)})
    this.props.history.push("/")
  }
  
  editComment = (_) => {
    const {postId} = this.props.match.params
    return (comment) => {
      if (comment.id === undefined) {
        comment.id = uuidv4()
      }
      if (comment.author ==='') {
        comment.author = 'anonymous'
      }
      comment.parentId = postId
      comment.timestamp = Date.now()
      ReadableAPI.addComment(comment).then(comment => {this.props.renewComment(comment)})
    }
  }
  render() {
    const {postId, categoryName} = this.props.match.params
    const {posts, comments} = this.props
    const post = posts[postId]
    const commentList = comments[postId] === undefined ? [] : comments[postId]

    if (post === undefined || post.category !== categoryName) {
      return (<Grid><Row><h3>Oops! This post is not found</h3></Row></Grid>)
    }
    return (
      <Grid>
        <Row>
          <h2 className="text-left"><strong>{post.title}</strong> <small>{post.voteScore} vote scores</small></h2>
          <h4 className="text-left"><small>by {post.author} <RelativeTime value={post.timestamp} titleFormat="YYYY/MM/DD HH:mm" /></small></h4>
        </Row>
        <Row>
          <p className="lead text-left">
             {post.body}
          </p>
        </Row>
        <Row>
          <ButtonGroup className="pull-left">
            <Button onClick={(e) => {this.upVote(postId)}}>UpVote</Button>
            <Button onClick={(e) => {this.downVote(postId)}}>DownVote</Button>
          </ButtonGroup>
          <Button className="pull-left" onClick={(e) => {this.props.history.push("/postedit/" + post.id)}}>Edit</Button>
          <Button className="pull-left" onClick={(e) => {this.deletePost(postId)}}>Delete</Button>
        </Row>
        <Row><hr /></Row>
        <Row><CommentForm comment={{}} submitText="Submit" onClick={this.editComment()}/></Row>
        <Row><hr /></Row>
        <Row><h4 className="text-left"><strong>{commentList.length} Comment{commentList.length === 0 ? '' : 's'}:</strong></h4></Row>
        {commentList.length !== 0 && commentList.sort(sortBy('-voteScore', '-timestamp')).map((comment) =>
              <Row key={comment.id}><CommentDisplayItem comment={comment} /><hr /></Row>
         )}
      </Grid>
    )
  }
}

function mapStateToProps({posts, comments}) {
  return {
    posts : posts === undefined ? {} : posts,
    comments : comments === undefined ? {} : comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCommentsByPostId :  (postId, comments) => dispatch(actions.loadCommentsByPostId({comments, postId})),
    renewPost :   (post) => dispatch(actions.loadPosts({posts : [post]})),
    renewComment : (comment) => dispatch(actions.renewComment({comment})),
    deletePost :  (postId) => dispatch(actions.deletePost({postId}))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailPage))