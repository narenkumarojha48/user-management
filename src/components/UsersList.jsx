import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
// Bootstrap imports
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
// icons import
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GiExpand } from "react-icons/gi";
const URL = "https://jsonplaceholder.typicode.com/users"
function UsersList() {
  const [userdata,setUserdata] = useState([]);
  const [loading,setLoading] = useState(false);
 
  useEffect(()=>{
    setLoading(true);
    axios.get(URL).then(res=>{setUserdata(res.data)})
    .catch(err=>console.log(err))
    .finally(()=>{
      setLoading(false);
    })
    
  },[])
  if(loading){
    return(<>
       <div className='d-flex justify-content-center align-items-center'>
          <Spinner animation="border" variant="primary" />
      </div>
    </>)
  }
  return (
    <>
      <h4 className='m-2'>List of users</h4>
      <Button variant="light" className='p-2'> <Link to="/users/createUser">Add User</Link></Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            
          userdata?.map((user) => (
            <>
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td key={user.id}>
                  <span className="m-4">
                    <GiExpand />
                  </span>
                  <span className="m-4">
                    <FaEdit />
                  </span>
                  <span className="m-4">
                    <MdDeleteOutline />
                  </span>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default UsersList