import { Button, Form, Input, Typography } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const verify = async (values) => {
    try {
      const data = {
        ...values,
        email: userEmail,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_BASE_URL}smb/user/verify-email-and-signup`,
        data
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography.Title>Check Your Email</Typography.Title>
      <Typography>We have sent You a verification code to</Typography>
      <Button type="link">{userEmail}</Button>

      <Form onFinish={verify}>
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: "Enter code",
            },
            {
              len: 6,
              message: "Enter 6 digit code",
            },
            {
              pattern: new RegExp("^[0-9]{6}$"),
              message: "Please Enter Correct Code (6 digits)",
            },
          ]}
        >
          <Input
            placeholder="Enter 6 digit code"
            style={{ width: "20%", height: "auto", margin: "auto" }}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">Verify code</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default VerifyEmail;
