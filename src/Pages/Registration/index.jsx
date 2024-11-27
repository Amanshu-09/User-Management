import React from "react";
import { Form, Input, Button, message } from "antd";
import "./index.scss";
import app from "../../Firebase/firebase";
import { getDatabase, ref, push, set } from "firebase/database";
import { setMenu, setUserData } from "../../Redux/slice";
import { useDispatch, useSelector } from "react-redux";

const RegistrationForm = ({ req_type, closeAddAdmin, selectedRecord }) => {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state);

    const onFinish = (values) => {
        console.log("Success:", values);
        const payload = {
            fullname: values.fullname,
            email: values.email
        }

        const db = getDatabase(app);
        let newUserRef = null;
        if (req_type !== "edit_user") {
            payload.password = values.password
            payload.role = req_type === "add_admin" ? "Admin" : "View"
            newUserRef = push(ref(db, "users"));
        } else {
            newUserRef = ref(db, "users/" + selectedRecord.id);
        }

        set(newUserRef, payload).then(() => {
            message.success(`User ${req_type === "edit_user" ? "Updated" : "Registered"} Successfully !`);
            ["add_admin", "edit_user"].includes(req_type) ? closeAddAdmin() : dispatch(setMenu("login"));
            if (req_type !== "edit_user") {
                dispatch(setUserData([...userData, payload]));
            } else {
                const updatedUserData = userData.map((user) =>
                    user.id === selectedRecord.id ? { ...user, ...payload } : user
                );
                dispatch(setUserData(updatedUserData));
            }
        }).catch((err) => {
            message.error(err?.message);
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="registration-container">
            <h2>{req_type === "add_admin" ? "Add Admin" : req_type === "edit_user" ? "Edit User" : "Register"}</h2>
            <Form
                name="registration"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="registration-form"
                initialValues={{
                    fullname: selectedRecord?.fullname || '',
                    email: selectedRecord?.email || ''
                }}
            >
                <Form.Item
                    label="Full Name"
                    name="fullname"
                    rules={[{ required: true, message: "Please enter your full name!" }]}
                >
                    <Input placeholder="John Doe" />
                </Form.Item>
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
                {req_type !== "edit_user" && <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Please enter your password!" },
                        { min: 6, message: "Password must be at least 6 characters long!" },
                    ]}
                >
                    <Input.Password placeholder="********" />
                </Form.Item>}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        {["add_admin", "edit_user"].includes(req_type) ? "Submit" : "Register"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegistrationForm;
