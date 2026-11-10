
import { createContext, useContext, useEffect, useReducer } from 'react'

const AuthContext = createContext(null)

function getInitialState() {
  try {
    const savedUser = localStorage.getItem('mini-shop-user')
    return { user: savedUser ? JSON.parse(savedUser) : null }
  } catch {
    return { user: null }
  }
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(
    authReducer,
    undefined,
    getInitialState
  )

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('mini-shop-user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('mini-shop-user')
    }
  }, [state.user])

  function loginUser(user) {
    dispatch({ type: 'LOGIN', payload: user })
  }

  function logoutUser() {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
