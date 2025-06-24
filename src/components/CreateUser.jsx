import { useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import * as yup from 'yup';
import {usersSchema } from '../utils/UserSchema'
import { useFormik } from 'formik';
const URL = "http://localhost:4000/api/v1/users/"
// const URL = "https://jsonplaceholder.typicode.com/users"
const CreateUser = () => {
   const formik = useFormik({
     initialValues: {
       name: "",
       username: "",
       email: "",
       password: "",
       checkme: false,
     },
     //  validationSchema:usersSchema,
     onSubmit: (values, { setSubmitting }) => {
       axios
         .post(process.env.REACT_APP_API_URL_1, { ...values })
         .then((res) => {
           console.log("res", res);
           setSubmitting(false);
           alert(JSON.stringify(res.data))
         })
         .catch((err) => {
           console.log("err", err);
           formik.setErrors(err.response.data.errors);
         })
         .finally(() => {
           setSubmitting(false);
         });
     },
   });
   if(formik.isSubmitting){
     return(<>
       <div className='d-flex justify-content-center align-items-center'>
          <Spinner animation="border" variant="primary" />
      </div>
    </>)
   }

  //  useEffect(()=>{})
  return (
    <section>
      <Container className="mt-5">
          {formik.errors  ?<Form.Text className="text-danger">
              {JSON.stringify(formik.errors)}
            </Form.Text> :null}
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" name='name' autoComplete='off'
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.name}/>
            {formik.errors.name && formik.touched.name ?<Form.Text className="text-danger">
              {formik.errors.name}
            </Form.Text> :null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" 
            placeholder="User Name" 
            autoComplete='off'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange} 
            value={formik.values.username}
            name='username' />
            {formik.errors.username && formik.touched.username ?<Form.Text className="text-danger">
              {formik.errors.username}
            </Form.Text> :null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" 
            autoComplete='off'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange} 
            value={formik.values.email}
            name='email'/>
            {formik.errors.email && formik.touched.email ?<Form.Text className="text-danger">
              {formik.errors.email}
            </Form.Text> :null}
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange} 
            value={formik.values.password}
            name='password'/>
            {formik.errors.password && formik.touched.password ?<Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text> :null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" 
            onBlur={formik.handleBlur}
            onChange={formik.handleChange} 
            checked={formik.values.checked}
            name='checkme'/>
            {formik.errors.checkme && formik.touched.checkme ?<Form.Text className="text-danger">
              {formik.errors.checkme}
            </Form.Text> :null}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default CreateUser