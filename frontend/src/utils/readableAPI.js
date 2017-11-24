
let TOKEN = "whatever-you-want"

const HEADERS = {
  'Content-Type' : 'application/json',
  'Accept': 'application/json',
  'Authorization' : TOKEN,
}

const API = `${process.env.REACT_APP_BACKEND}`

export const fetchCategories = () =>
  fetch(`${API}/categories`, { headers:HEADERS, credentials: 'include'})
    .then(res => res.json())

export const fetchAllPosts = () =>
  fetch(`${API}/posts`, { method : 'GET', headers:HEADERS, credentials: 'include'})
    .then(res => res.json())

export const fetchCommentsByPostId = (postId) =>
  fetch(`${API}/posts/${postId}/comments`, { method : 'GET', headers:HEADERS, credentials: 'include'})
    .then(res => res.json())

export const upvoteByPostId = (postId) =>
  fetch(`${API}/posts/${postId}`, { method : 'POST', headers:HEADERS, credentials: 'include', body : JSON.stringify({option : 'upVote'}) })
    .then(res => res.json())

export const downvoteByPostId = (postId) =>
  fetch(`${API}/posts/${postId}`, { method : 'POST', headers:HEADERS, credentials: 'include', body : JSON.stringify({option : 'downVote'}) })
    .then(res => res.json())

export const updatePost = (post) => 
  fetch(`${API}/posts/${post.id}`, { method : 'PUT', headers:HEADERS, credentials: 'include', body : JSON.stringify(post) })
    .then(res => res.json())

export const addPost= (post) => 
  fetch(`${API}/posts`, { method : 'POST', headers:HEADERS, credentials: 'include', body : JSON.stringify(post) })
    .then(res => res.json())

export const deletePost = (postId) => 
  fetch(`${API}/posts/${postId}`, { method : 'DELETE', headers:HEADERS, credentials: 'include'})

export const upvoteByCommentId = (commentId) =>
  fetch(`${API}/comments/${commentId}`, { method : 'POST', headers:HEADERS, credentials: 'include', body : JSON.stringify({option : 'upVote'}) })
    .then(res => res.json())

export const downvoteByCommentId = (commentId) =>
  fetch(`${API}/comments/${commentId}`, { method : 'POST', headers:HEADERS, credentials: 'include', body : JSON.stringify({option : 'downVote'}) })
    .then(res => res.json())

export const updateComment = (comment) => 
  fetch(`${API}/comments/${comment.id}`, { method : 'PUT', headers:HEADERS, credentials: 'include', body : JSON.stringify(comment) })
    .then(res => res.json())

export const addComment = (comment) => 
  fetch(`${API}/comments`, { method : 'POST', headers:HEADERS, credentials: 'include', body : JSON.stringify(comment) })
    .then(res => res.json())

export const deleteComment = (commentId) => 
  fetch(`${API}/comments/${commentId}`, { method : 'DELETE', headers:HEADERS, credentials: 'include'})
    .then(res => res.json())