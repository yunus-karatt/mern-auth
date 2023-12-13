import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen.jsx";
import Loginscreen from "./screens/Loginscreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute";
import AdminLoginScreen from "./screens/AdminLoginScreen.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import UpdateUserData from "./screens/UpdateUserData.jsx";
import AddUser from "./screens/AddUser.jsx";
import AdminPrivateRoutes from "./components/AdminPrivateRoutes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Loginscreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Private Routes */}

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="/admin" element={<AdminLoginScreen />} />
      <Route path="" element={<AdminPrivateRoutes />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route
          path="/admin/user/update-user/:id"
          element={<UpdateUserData />}
        />
        <Route path="/admin/users/add-user" element={<AddUser />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
