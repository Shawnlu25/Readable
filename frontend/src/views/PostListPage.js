import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap'

import PostList from '../components/PostList'

class PostListPage extends Component {
  static propTypes = {
    posts : PropTypes.array.isRequired,
  }

  render() {
    const {posts} = this.props
    const {categoryName} = this.props.match.params
    return (
       <Grid>
         <Row >
           <PostList posts={posts.filter(p => p.category === categoryName || categoryName === undefined)}/>
         </Row>
       </Grid>
    )
  }
}

function mapStateToProps({posts, categories, preferences}) {
  return {
    posts : Object.keys(posts).map((key) => {return posts[key]}),
  }
}

export default withRouter(connect(mapStateToProps)(PostListPage))