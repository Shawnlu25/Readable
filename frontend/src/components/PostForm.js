import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

class PostForm extends Component {
  static propTypes = {
    post : PropTypes.object.isRequired,
    submitText : PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired,
    categories : PropTypes.array.isRequired
  }

  state = {
    authorText : '',
    titleText : '',
    bodyText : '',
    disableAuthorEdit : false,
    selectedCategory : '---'
  }
  
  initializeState(p) {
    if (p.post.id !== undefined){
      this.setState(state => ({
        authorText : p.post.author,
        bodyText: p.post.body,
        titleText : p.post.title,
        disableAuthorEdit : true,
        selectedCategory : p.post.category === undefined ? '---' : p.post.category
      }))
    }else{
      this.setState(state => ({
        authorText : '',
        bodyText: '',
        titleText : '',
        disableAuthorEdit : false,
        selectedCategory : '---'
      }))
    }
  }

  componentDidMount() {
    this.initializeState(this.props)
  }
  
  componentWillReceiveProps(nextProps) {
    this.initializeState(nextProps)
  }

  textChange(value, type) {
    this.setState(state => ({ [type] : value }))
  }
  
  categorySelectChangeHandler(value) {
    this.setState(state => ({ selectedCategory : value}))
  }

  getValidationState() {
    return !(this.state.selectedCategory !== '---')
  }

  render() {
    const {submitText, onClick} = this.props
    return ( 
      <Form horizontal>
        <FormGroup controlId="formHorizontalAuthor">
          <Col componentClass={ControlLabel} sm={1}>
            Title
          </Col>
          <Col sm={11}>
              <FormControl 
                type="text" 
                placeholder="Title" 
                value={this.state.titleText} 
                onChange={e => this.textChange(e.target.value, 'titleText')}/>
          </Col>
        </FormGroup>
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
                onChange={e => this.textChange(e.target.value, 'authorText')}/>)}
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={1}>
            Category
          </Col>
          <Col sm={11}>
            <FormControl componentClass="select" placeholder="select" onChange={(e) => this.categorySelectChangeHandler(e.target.value)} value={this.state.selectedCategory}>
               <option value={'---'} disabled>---</option>
               {this.props.categories.map(c => (
                 <option value={c} key={c}>{c}</option>
                ))}
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalComment">
          <Col componentClass={ControlLabel} sm={1}>
            Body
          </Col>
          <Col sm={11}>
            <FormControl 
              componentClass="textarea" 
              placeholder="Say something..." 
              value={this.state.bodyText}
              onChange={e => this.textChange(e.target.value, 'bodyText')}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={1} sm={1}>
            <Button onClick={(e) => {onClick(
                             {author : this.state.authorText, 
                              body : this.state.bodyText, 
                              title : this.state.titleText,
                              category : this.state.selectedCategory,
                              id : this.props.post.id})
                              }}
                    disabled = {this.getValidationState()}>
              {submitText}
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default PostForm;