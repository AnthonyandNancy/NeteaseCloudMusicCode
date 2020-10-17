import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function setUser (user) {
  return localStorage.setItem('user', JSON.stringify(user))
}
export function setPermissions (permissions) {
  return localStorage.setItem('permissions', JSON.stringify(permissions))
}

export function getUser () {
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  } else {
    return false
  }
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
export function removeUser () {
  return localStorage.removeItem('user')
}
export function removePermissions () {
  return localStorage.removeItem('permissions')
}
