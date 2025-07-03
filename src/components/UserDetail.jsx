import React from 'react'
import { useEffect,useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const UserDetail = () => {
  const [userdata, setUserdata] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_DATABASE_URL}/${userid}`)
      .then((res) => {
        setLoading(false);
        setUserdata(res.data.user);
        console.log("Res", res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.errors?.message);
        console.log("Error", err);
      });
  }, [userid]);
     if(loading){
      return(<>
         <div className='d-flex justify-content-center align-items-center'>
            <Spinner animation="border" variant="primary" />
        </div>
      </>)
    }
  return <div>UserDetail 
  {error ? <p className='bg-danger text-white w-25'>{ JSON.stringify(error)}</p>:null}
   <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>User Detail</Card.Title>
        <Card.Text>
          {userdata.name}
        </Card.Text>
        <Card.Text>
          {userdata.username}
        </Card.Text>
        <Card.Text>
          {userdata.email}
        </Card.Text>
        <Card.Text>
          {userdata.password}
        </Card.Text>
        <Button variant="primary" onClick={()=>navigate("/")}>Back</Button>
      </Card.Body>
    </Card>
  </div>;
};

export default UserDetail