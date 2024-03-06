import React ,{useEffect} from 'react'
import { Button, Form, Input, Select, message } from "antd";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Login = (value) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleSubmit=async()=>{

        try {
            dispatch({ type: "Show_Loading" });
            const res = await axios.post(
              "http://localhost:5000/api/users/login",value
            );
            localStorage.setItem('auth',JSON.stringify(res.data))
            message.success("User Login Successfully");
            navigate('/')
            dispatch({ type: "Hide_Loading" });
          } catch (err) {
            message.error("Something went wrong");
            console.log(err);
          }
    }

    // currently login user
useEffect(()=>{
  if(localStorage.getItem('auth')){
    localStorage.getItem('auth');
    navigate('/');
  }
    
},[navigate])

  return (
    <>
    <div className="register">
        <div className="register-form">
        <h1><i>POS APP</i></h1>
        <h3>Login Page</h3>
        <Form layout="vertical"  onFinish={handleSubmit}>
          
          <Form.Item name="userId" label="User ID">
            <Input type='password' />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input />
          </Form.Item>
          
          <div className="d-flex justify-content-between">
            <p>Not a user! Please <Link to='/register'>Register here !</Link></p>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
    </div>
    </div>
    </>
  )
}

export default Login
