import React from "react";
import { Form, Input, Button, message } from "antd";
import "./index.scss";
import { setCurrentUserData, setMenu } from "../../Redux/slice";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);

    // Function to validate email and password
    const validateUser = (inputEmail, inputPassword) => {
        // Find user in the database by email
        const user = userData.find((user) => user.email === inputEmail);

        // Check if user exists and password matches
        if (user) {
            if (user.password === inputPassword) {
                dispatch(setCurrentUserData(user));
                dispatch(setMenu('home'));
                sessionStorage.setItem("userData", JSON.stringify({ email: user.email, fullname: user.fullname, role: user.role }))
                return message.success("Logged in successfully!");
            } else {
                return message.error("Invalid password!");
            }
        } else {
            return message.error("Email not found!");
        }
    };


    const onFinish = (values) => {
        console.log("Success:", values);
        validateUser(values?.email, values.password)
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="login-form"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email!" },
                        { type: "email", message: "Enter a valid email!" },
                    ]}
                >
                    <Input placeholder="example@mail.com" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input.Password placeholder="********" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
