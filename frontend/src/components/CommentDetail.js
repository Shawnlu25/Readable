import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Media } from 'react-bootstrap'
import RelativeTime from 'react-relative-time'

class CommentDetail extends Component {
  static propTypes = {
    comment : PropTypes.object.isRequired
  }

  render() {
    const {comment} = this.props
    return ( 
      <Media>
        <Media.Body>
          <Media.Heading className="text-left"><small>by {comment.author} <RelativeTime value={comment.timestamp} titleFormat="YYYY/MM/DD HH:mm" /> {'|'} {comment.voteScore} vote score</small></Media.Heading>
          <p className="lead text-left"><small>{comment.body}</small></p>
        </Media.Body>
      </Media>
    )
  }
}
export default CommentDetail;