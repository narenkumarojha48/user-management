import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
const UpdateUser = () => {
    const [userdata,setUserdata] = useState({name:'',username:'',email:'',password:''});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({});
    const {userid} = useParams();
    const navigate = useNavigate();
  useEffect(()=>{
    setLoading(true)
    axios.get(`${process.env.REACT_APP_DATABASE_URL}/${userid}`)
    .then(res=>{setLoading(false);setUserdata(res.data.user);console.log("Res",res)})
    .catch(err=>{setLoading(false);
        setError(err.response?.data?.errors?.message);
        console.log("Error",err)})
  },[]);
     function handleSubmit(e){
        e.preventDefault();
        let user = {name:userdata.name,username:userdata.username,email:userdata.email,password:userdata.password}
        setLoading(true);
        axios.put(`${process.env.REACT_APP_DATABASE_URL}/${userid}`,user).then(res=>{
            if(res.status===200){
                setLoading(false);
                setUserdata({name:'',username:'',email:'',password:''});
                alert("User updated successfully");
                navigate("/")
            }
        })
        .catch(err=>{ setLoading(false);setError(err.response.data.errors)})
        console.log(userdata)
     }
     function handleChange(e){
        setUserdata({...userdata,[e.target.name]:e.target.value})
     }
   if(loading){
      return(<>
         <div className='d-flex justify-content-center align-items-center'>
            <Spinner animation="border" variant="primary" />
        </div>
      </>)
    }
  return (
    <div>
       <h4>Update User</h4>
       <form onSubmit={handleSubmit} className='my-custom-form'>
        <div className='m-3 row w-25'>
            <label className='col'>Name</label>
            <input className='col' type='text' name='name' value={userdata.name} onChange={handleChange}/>
             {error.name ? <p className='bg-danger text-white w-25'>{ JSON.stringify(error.name)}</p>:null}
        </div>
        <div className='m-3 row w-25'> 
            <label className='col'>User Name</label>
            <input className='col'type='text' name='username' value={userdata.username} onChange={handleChange}/>
            {error.username ? <p className='bg-danger text-white w-25'>{ JSON.stringify(error.username)}</p>:null}

        </div>
        <div className='m-3 row w-25'>
            <label className='col'>Email</label>
             <input className='col' type='text' name='email' value={userdata.email} onChange={handleChange}/>
             {error.email ? <p className='bg-danger text-white w-25'>{ JSON.stringify(error.email)}</p>:null}

        </div>
         <div className='m-3 row w-25'>
            <label className='col'>Password</label>
            <input className='col' type='password' name='password' value={userdata.password} onChange={handleChange}/>
            {error.password ? <p className='bg-danger text-white w-25'>{ JSON.stringify(error.password)}</p>:null}
        </div>
         <Button variant="primary" type="submit" className='m-3'>
            Submit
          </Button>
       </form>
    </div>
  )
}

export default UpdateUser;