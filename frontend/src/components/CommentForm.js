import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

class CommentForm extends Component {
  static propTypes = {
    comment : PropTypes.object.isRequired,
    submitText : PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired
  }

  state = {
    authorText : '',
    commentText : '',
    disableAuthorEdit : false
  }
  
  initializeState() {
    if (this.props.comment.id !== undefined){
      this.setState(state => ({
        authorText : this.props.comment.author,
        commentText: this.props.comment.body,
        disableAuthorEdit : true
      }))
    }else{
      this.setState(state => ({
        authorText : '',
        commentText: '',
        disableAuthorEdit : false
      }))
    }
  }

  componentDidMount() {
    this.initializeState()
  }
  
  authorTextChange(v) {
    this.setState(state => ({ authorText : v }))
  }

  commentTextChange(v) {
    this.setState(state => ({ commentText : v }))
  }

  render() {
    const {submitText, onClick} = this.props
    return ( 
      <Form horizontal>
        <FormGroup controlId="formHorizontalAuthor">
          <Col componentClass={ControlLabel} sm={1}>
            Author
          </Col>
          <Col sm={11}>
            {this.state.disableAuthorEdit && (
              <FormControl type="text" placeholder="Your name" value={this.state.authorText} disabled="disabled"/>)}
            {!this.state.disableAuthorEdit && (
              <FormControl 
                type="text" 
                placeholder="Your name... or be anonymous if left blank" 
                value={this.state.authorText} 
                onChange={e => this.authorTextChange(e.target.value)}/>)}
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalComment">
          <Col componentClass={ControlLabel} sm={1}>
            Comment
          </Col>
          <Col sm={11}>
            <FormControl 
              componentClass="textarea" 
              placeholder="Say something..." 
              value={this.state.commentText}
              onChange={e => this.commentTextChange(e.target.value)}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={1} sm={1}>
            <Button onClick={(e) => {onClick(
                             {author : this.state.authorText, 
                             body : this.state.commentText, 
                             id : this.props.comment.id});
                            this.initializeState()}}>
              {submitText}
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default CommentForm;