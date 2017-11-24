import { combineReducers } from 'redux'
import { 
  LOAD_CATEGORIES,
  LOAD_POSTS,
  DELETE_POST,
  LOAD_COMMENTS_BY_POST_ID,
  RENEW_COMMENT,
  SET_PREFERENCE
} from '../actions'

function categories (state = {categories : []}, action) {
  const { categories } = action
  switch (action.type) {
    case LOAD_CATEGORIES:
      return categories
    default :
      return state
  }
}

function posts (state = {}, action) {
  const {posts, postId} = action
  switch (action.type) {
    case LOAD_POSTS:
      if (posts === undefined) return state
      const filteredPosts = 
        posts.filter(p => (p.deleted !== true))
        .reduce((all, p) => {return {...all, [p.id] : p}}, {})
      return {
        ...state,
        ...filteredPosts
      }
    case DELETE_POST:
      if (postId === undefined || state[postId] ===undefined) return state
      delete state[postId]
      return {...state}
    default :
      return state
  }
}

function comments(state={}, action) {
  const {postId, comments, comment} = action
  switch (action.type) {
    case LOAD_COMMENTS_BY_POST_ID:
      if (comments === undefined || postId === undefined) return state 
      let commentStructure = {[postId] : comments.filter((c) => c.deleted === false)}
      return {
        ...state,
        ...commentStructure
      }
    case RENEW_COMMENT:
      if (comment === undefined) return state 
      let commentList = []
      if (state[comment.parentId] !== undefined) {
        commentList = state[comment.parentId].filter((c) => c.id !== comment.id)
      }
      if (!comment.deleted) {
        commentList.push(comment)
      }
      commentStructure = {[comment.parentId] : commentList}
      return {
        ...state,
        ...commentStructure
      }
    default :
      return state
  }
}

function preferences(state = {}, action) {
  const {preference} = action
  switch (action.type) {
    case SET_PREFERENCE:
      return {...state, ...preference}
    default:
      return state
  }
}

export default combineReducers({
  categories, posts, preferences, comments
})