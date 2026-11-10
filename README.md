
# Mini Online Shop

A multi-page online shopping application built with React, Vite, React Router, Context API, useReducer and Zustand.

## Features

- Product listing using DummyJSON API
- Product detail pages
- Search and category filtering with URL query parameters
- Shopping cart with Zustand state management
- Cart persistence using localStorage and Zustand subscription
- User authentication with Context API and useReducer
- Protected cart route
- Persistent user session using localStorage
- Custom useFetch hook with loading and error states
- AbortController for request cancellation
- Custom useLocalStorage hook
- Light and dark theme
- Responsive design
- 404 Not Found page

## Technologies

- React
- JavaScript (ES6+)
- Vite
- React Router DOM
- Zustand
- Context API
- DummyJSON API
- CSS

## Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd mini-online-shop
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Demo Login

- Email: student@university.edu
- Password: demo123456

## API

Products are retrieved from:

https://dummyjson.com/products?limit=100

Product details:

https://dummyjson.com/products/{id}

## Project Structure

```text
src/
├── api/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── store/
├── App.jsx
├── App.css
└── main.jsx
```

## State Management

- Context API and useReducer manage authentication state.
- Zustand manages shopping cart state.
- localStorage preserves the cart, user session and theme preferences.
- URL query parameters manage product search and category filters.

## Important Design Decisions

1. **Why use Context API for authentication?**

   Authentication information is shared by multiple components. Context API provides a central way to access the logged-in user and authentication functions.

2. **Why use Zustand for the cart?**

   Zustand provides a simple global store for cart items without requiring prop drilling.

3. **Why use URL query parameters for filtering?**

   Search and category filters remain visible in the URL and can be shared or bookmarked.

4. **Why use AbortController?**

   It cancels unnecessary fetch requests when a component unmounts or a new request starts.

5. **Why use custom hooks?**

   Custom hooks allow reusable logic for fetching data and managing localStorage.

6. **Why use ProtectedRoute?**

   It prevents unauthenticated users from accessing the shopping cart and redirects them to login.

## Testing

- Browse the product list.
- Search for products.
- Filter products by category.
- Open a product detail page.
- Add products to the cart.
- Change quantities and remove products.
- Refresh the page and verify cart persistence.
- Log in and refresh to verify session persistence.
- Log out and verify protected route behavior.
- Switch between light and dark themes.
- Open an invalid URL to test the 404 page.

## Author

Mini Online Shop - Assignment 7
