import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
// Bootstrap imports
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
// icons import
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GiExpand } from "react-icons/gi";
function UsersList() {
  const [userdata,setUserdata] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    axios.get(process.env.REACT_APP_DATABASE_URL).then(res=>{setUserdata(res.data.users)})
    .catch(err=>console.log(err))
    .finally(()=>{
      setLoading(false);
    })
    
  },[])

  const handleUserDetail=(user)=>{
    navigate(`/users/userDetail/${user._id}`)
    console.log("id",user._id)
  }

  const handleUpdateUser=(user)=>{
     navigate(`/users/editUser/${user._id}`)
    console.log("id",user._id);
  }
  const handleDeleteUser=async(id)=>{
    if(!window.confirm("Are you sure want to delete")){
      return;
    }
    try {
      setLoading(true)
      setError("")
      const res = await axios.delete(`${process.env.REACT_APP_DATABASE_URL}/${id}`)
      if(res.status === 200){
        setUserdata(prev=>prev.filter(usr=>usr._id !==res.data.user._id));
      }
      setLoading(false)
      alert("User deleted successfully")
    } catch (error) {
      setLoading(false);
      console.log(error)
      setError(error.response.data.errors.message);
    }
    
   
  }
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
      {error ? <p className='bg-danger text-white w-25'>{ JSON.stringify(error)}</p>:null}
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
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className="m-4" onClick={()=>handleUserDetail(user)}>
                    <GiExpand />
                  </span>
                  <span className="m-4" onClick={()=>handleUpdateUser(user)}>
                    <FaEdit />
                  </span>
                  <span className="m-4" onClick={()=>handleDeleteUser(user._id)}>
                    <MdDeleteOutline />
                  </span>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default UsersList