import React, { Component } from 'react';
import { Switch, Route, withRouter} from 'react-router-dom'
import './App.css';
import { connect } from 'react-redux'

import * as ReadableAPI from './utils/readableAPI'
import * as actions from './actions'
import PostListPage from './views/PostListPage'
import PostDetailPage from './views/PostDetailPage'
import PostEditPage from './views/PostEditPage'
import NavigationBar from './components/NavigationBar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  componentDidMount() {
    ReadableAPI.fetchCategories().then(categories => this.props.loadCategories(categories))
    ReadableAPI.fetchAllPosts().then(posts => this.props.loadAllPosts(posts))
    this.props.setPostListPreference({preference : {postListPreference : {key : "-voteScore"}}})
  }

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link> 
        <NavigationBar categories={this.props.categories}/>
        <Switch>
           <Route exact path='/' component={PostListPage}/>
           <Route exact path='/postedit/:postId' component={PostEditPage}/>
           <Route exact path='/:categoryName' component={PostListPage}/>
           <Route exact path='/:categoryName/:postId' component={PostDetailPage}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({categories, posts}) {
  return {
    categoryNames : Array.isArray(categories) ? categories.map((category) => {return category.name}) : [],
    categories : Array.isArray(categories) ? categories : [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories : (categories) => dispatch(actions.loadCategories(categories)),
    loadAllPosts :   (posts) => dispatch(actions.loadPosts({posts})),
    setPostListPreference : (preference) => dispatch(actions.setPreference(preference)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
