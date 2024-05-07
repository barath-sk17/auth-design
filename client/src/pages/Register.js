import React from "react";
import { Form, Input, Button, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
  const navigate =  useNavigate();  
  const onFinish = async (values) => {

    try {
      const response = await axios.post("/api/user/register", values);

      if (response.data.success) {
        toast.success(response.data.message); // Show success message
        toast.success("Redirecting to Login Page");
        navigate("/login");
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        toast.error("Something went wrong during registration");
      }
      
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Nice to meet you</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Flex gap="small" wrap>
            <Button className="primary-button my-3" htmlType="submit" type="primary">REGISTER</Button>

            <Link className="anchor" to="/login">Log In to Continue </Link>
          </Flex>
        </Form>
      </div>
    </div>
  );
}

export default Register;
