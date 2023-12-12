import React from "react";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "./components/AdminHeader";

function App() {
  const locaction = useLocation();
  const isAdmin = locaction.pathname.startsWith("/admin");

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
