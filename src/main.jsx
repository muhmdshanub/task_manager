import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx'; // Main layout component
import TaskScreen from './screens/TaskScreen.jsx'; // Task management screen
import NotFound from './screens/NotFound.jsx'; // 404 screen if needed
import './index.css'; // Custom styles

// Create the router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<TaskScreen />} />
      {/* Fallback route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

// Render the app to the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
