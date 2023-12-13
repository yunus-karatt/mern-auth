import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../slices/adminAuthSlice";
import { useAdminLogoutMutation } from "../slices/adminApiSlice";
import { useNavigate } from "react-router";

function AdminHeader() {
  const { adminInfo } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminLogoutApiCall] = useAdminLogoutMutation();

  const handleLogout = async () => {
    await adminLogoutApiCall().unwrap();
    dispatch(adminLogout());
    navigate("/admin");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MERN APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Admin panel</Nav.Link>

            {adminInfo && (
            <NavDropdown
              title={adminInfo?.email }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  logout
                </NavDropdown.Item>
            </NavDropdown>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
