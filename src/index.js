// React core libraries
import React from 'react'
import ReactDOM from 'react-dom/client'

// Main App component and utilities
import App from './App' // Root component of the application
import reportWebVitals from './reportWebVitals' // For measuring performance metrics

// React Router for navigation
import { BrowserRouter as Router } from 'react-router-dom'

// Context API for sharing state globally
import { createContext } from 'react'
import OrderDetailStore from './store/OrderDetailStore' // Custom store for managing order details

// Redux libraries for state management
import loginReducer from './reducers/loginReducer' // Reducer for login-related state
import shoppingReducer from './reducers/shoppingReducer'
import { Provider } from 'react-redux' // Component to connect Redux to React
//import { configureStore } from '@reduxjs/toolkit' // New method to configure Redux store
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk' // Middleware for handling async Redux actions

// Creating a React Context to share OrderDetailStore globally in the app
export const Context = createContext(null)

/* // Configure the Redux store using Redux Toolkit's configureStore
const store = configureStore({
  reducer: {
    login: loginReducer, // Register your login reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware if needed
}) */

const routeReduser = combineReducers({
  login: loginReducer,
  shopping: shoppingReducer,
})

const store = createStore(routeReduser, applyMiddleware(thunk))

// Initialize the React application by attaching it to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render the React app wrapped with necessary providers
root.render(
  <React.StrictMode>
    {/* Redux Provider makes the store available to all components */}
    <Provider store={store}>
      {/* Context Provider makes OrderDetailStore available to components via Context */}
      <Context.Provider value={{ parts: new OrderDetailStore() }}>
        {/* Router handles navigation and URL management */}
        <Router>
          {/* Main App component */}
          <App />
        </Router>
      </Context.Provider>
    </Provider>
  </React.StrictMode>
)

// For measuring app performance and optionally reporting to analytics
reportWebVitals()
