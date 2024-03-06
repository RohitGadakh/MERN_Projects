import React,{useEffect} from 'react'
import { Button, Form, Input, Select, message } from "antd";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const Register = () => {
  const navigate=useNavigate();
    const dispatch=useDispatch();
const handleSubmit=async(value)=>{
    try {
        dispatch({ type: "Show_Loading" });
        await axios.post(
          "http://localhost:5000/api/users/register",
          value
        );
        message.success("User Register Successfully");
        navigate('/login')
        dispatch({ type: "Hide_Loading" });
      } catch (err) {
        message.error("Something went wrong");
        console.log(err);
      }
}
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
        <h3>Register Page</h3>
        <Form layout="vertical"  onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="userId" label="User ID">
            <Input type='password' />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input />
          </Form.Item>
          {/* <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value="drinks">Drinks</Select.Option>
              <Select.Option value="rice">Rice</Select.Option>
              <Select.Option value="noodles">Noodles</Select.Option>
            </Select>
          </Form.Item> */}

          <div className="d-flex justify-content-between">
            <p>Already Register! Please <Link to='/login'>Login here !</Link></p>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form>
    </div>
    </div>
    </>
  )
}

export default Register
