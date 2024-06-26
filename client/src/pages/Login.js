import React from "react";
import { Form, Input, Button, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async(values) => {
        try {
        
        dispatch(showLoading());
        const response = await axios.post("/api/user/login", values);
        dispatch(hideLoading());    

        if (response.data.success) {
            toast.success(response.data.message); // Show success message
            toast.success("Redirecting to Home Page");
            localStorage.setItem("token",response.data.data);
            navigate("/");
        } else {
            toast.error(response.data.message); // Show error message
        }
        } catch (error) {
            dispatch(hideLoading());
            console.error("Registration error:", error.response?.data || error.message);
            toast.error("Something went wrong during registration");
        }
    }

    return (
        <div className="authentication1">
            <div className="authentication1-form card p-3">
                <h1 className="card-title">Welcome Back</h1>
                <Form layout="vertical" onFinish={onFinish}>
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
                    <Button className="primary-button my-3" htmlType="submit" type="primary">LOGIN</Button>

                    <Link className="anchor" to="/register">Don't have an account ? </Link>
                </Flex>
                </Form>
            </div>
        </div>
    )
}

export default Login

