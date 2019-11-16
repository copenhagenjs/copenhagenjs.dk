export const setLoggedInStatus = state => {
  window.localStorage.setItem('copenhagenjs_loggedin', 'true')
}

export const clearLoggedInStatus = () => {
  window.localStorage.removeItem('copenhagenjs_loggedin')
}

export const checkLoggedIn = () => {
  return window.localStorage.getItem('copenhagenjs_loggedin') === 'true'
}
