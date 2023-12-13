import Table from "react-bootstrap/Table";
import {
  useGetUserDataMutation,
  useUpdateUserAccessMutation,
  useDeleteUserMutation,
} from "../slices/adminApiSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();

  const [search,setSearch]=useState('')
  const [users, setUsers] = useState([]);

  const [getUsersList] = useGetUserDataMutation();
  const [updateUserAccess] = useUpdateUserAccessMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUsersList();
      setUsers(data);
    }
    fetchData();
  }, []);

  const handleBlockAndUnblock = async (id) => {
    const res = await updateUserAccess(id).unwrap();
    const updatedState = users.map((user) => {
      if (user._id == res._id) {
        return { ...user, isBlocked: res.isBlocked };
      }
      return user;
    });
    setUsers(updatedState);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    const updatedState = users.filter((user) => user._id !== id);
    setUsers(updatedState);
  };
  
  const filterdUser=users?.filter(user=>{
    const userName = user.name.toLowerCase();
    const userEmail = user.email;
    const searchValue = search.toLowerCase();
    return userName.includes(searchValue) || userEmail.includes(searchValue);
  })


  return (
    <Container>
      <Form.Group
        className="mt-3 mt-5 d-flex align-items-center"
        controlId="searchForm"
      >
        <Form.Label className="me-2 mt-1">Search:</Form.Label>
        <Form.Control
          style={{ width: "30vw" }}
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/admin/users/add-user" className="ms-auto">
          <Button className="bg-black border-black rounded-0 fw-bold ">
            ADD USER 
          </Button>
        </Link>
      </Form.Group>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th> Name </th>
            <th> Email </th>
            <th> Edit </th>
            <th> Block/Unblock </th>
            <th> Delete </th>
          </tr>
        </thead>
        <tbody>
          {filterdUser?.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {" "}
                  <Link to={`/admin/user/update-user/${user._id}`}>
                    <Button className="btn-success ms-2">Update</Button>
                  </Link>
                </td>
                <td>
                  {user.isBlocked ? (
                    <Button
                      onClick={() => handleBlockAndUnblock(user._id)}
                      variant="primary"
                    >
                      unblock
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleBlockAndUnblock(user._id)}
                      variant="danger"
                    >
                      Block
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    onClick={() => handleDelete(user._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;
