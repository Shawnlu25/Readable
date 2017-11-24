import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import CommentForm from './CommentForm'
import CommentDetail from './CommentDetail'
import ItemMenu from './ItemMenu'
import * as ReadableAPI from '../utils/readableAPI'
import * as actions from '../actions'

class CommentDisplayItem extends Component {
  static propTypes = {
    comment : PropTypes.object.isRequired
  }
  
  state = {
    editMode : false
  }

  flipEditMode = () => {
	this.setState(state => ({
      editMode : !this.state.editMode 
    }))
  }
  
  deleteComment(commentId) {
    ReadableAPI.deleteComment(commentId).then(comment => {this.props.renewComment(comment)})
  }

  upVote(commentId) {
    ReadableAPI.upvoteByCommentId(commentId).then(comment => {this.props.renewComment(comment)})
  }
  
  downVote(commentId) {
    ReadableAPI.downvoteByCommentId(commentId).then(comment => {this.props.renewComment(comment)})
  }
  
  editComment = (_) => {
    const postId = this.props.comment.parentId
    return (comment) => {
      if (comment.id === undefined) {
        comment.id = uuidv4()
      }
      if (comment.author ==='') {
        comment.author = 'anonymous'
      }
      comment.parentId = postId
      comment.timestamp = Date.now()
      ReadableAPI.updateComment(comment).then(comment => {this.props.renewComment(comment)})
      this.flipEditMode()
    }
  }

  render() {
    const {comment} = this.props
    return (
      <Grid>
          {this.state.editMode && (
            <Row>
             <CommentForm comment={comment} submitText="Done Edting" onClick={this.editComment()}/> 
            </Row>
           )}
          {!this.state.editMode && (
           <Row>
            <Col sm={11} md={11}>
             <CommentDetail comment={comment}/>
            </Col>
            <Col sm={1} md={1}>
             <ItemMenu menuItems={[{name : 'Edit', onClick : (e) => this.flipEditMode()},
                            {name : 'Delete', onClick : (e) => this.deleteComment(comment.id)},
                            {name : 'UpVote', onClick : (e) => this.upVote(comment.id)},
                            {name : 'DownVote', onClick : (e) => this.downVote(comment.id)}
                           ]} />
            </Col>
           </Row>
          )}
      </Grid>
    )
  }
}

function mapStateToProps({categories, posts}) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    renewComment : (comment) => dispatch(actions.renewComment({comment}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentDisplayItem)