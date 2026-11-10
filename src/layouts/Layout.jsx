
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCartStore } from '../store/cartStore'
import useLocalStorage from '../hooks/useLocalStorage'

function Layout() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const [theme, setTheme] = useLocalStorage(
  'mini-shop-theme',
  'light'
)

function toggleTheme() {
  setTheme(theme === 'light' ? 'dark' : 'light')
}

  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  function handleLogout() {
    logoutUser()
    navigate('/')
  }

  return (
   <div className={`app ${theme}-theme`}>
      <header>
        <h1>Mini Shop</h1>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>

          <button
  type="button"
  onClick={toggleTheme}
  className="theme-toggle"
>
  {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
</button>

          {user ? (
            <>
              <span>{user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Mini Shop - Assignment 7</p>
      </footer>
    </div>
  )
}

export default Layout
