export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const LOAD_POSTS = 'LOAD_POSTS'
export const DELETE_POST = 'DELETE_POST'

export const LOAD_COMMENTS_BY_POST_ID = 'LOAD_COMMENTS_BY_POST_ID'
export const RENEW_COMMENT = 'RENEW_COMMENT'

export const SET_PREFERENCE = 'SET_PREFERENCE'

// Categories action creators
export function loadCategories({categories}) {
  return {type : LOAD_CATEGORIES, categories}
}

// Posts action creators
export function loadPosts({posts}) {
  return {type : LOAD_POSTS, posts}
}
export function deletePost({postId}) {
  return {type : DELETE_POST, postId}
}

// Comments action creators
export function loadCommentsByPostId({postId, comments}) {
  return {type : LOAD_COMMENTS_BY_POST_ID, postId, comments}
}

export function renewComment({comment}) {
  return {type : RENEW_COMMENT, comment}
}

// Preference action creators
export function setPreference({preference}) {
  return {type : SET_PREFERENCE, preference}
}
