import React from "react";
import { Button, Form, Row, Col, Card, Input, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  

  const onFinish = async (values) => {
    try {
      
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_BASE_URL}smb/user/login`,
        values
      );
      
      const data=response?.data?.data
      const accesstoken = data?.access_token;
      const refreshToken = data?.refresh_token;
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <Card
          style={{
            marginTop: "30%",
            backgroundColor: "lightgreen",
            paddingInline: "10%",
          }}
        >
          <Typography
            style={{ fontWeight: "600", fontSize: "24px", textAlign: "center" }}
          >
            Login
          </Typography>
          <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ marginLeft: "70px", marginTop: "20px" }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please Enter Valid Email",
                },
                {
                  required: true,
                  message: "Please Enter Your Email",
                },
              ]}
            >
              <Input style={{ padding: "8px 8px" }} autoComplete="off" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please Input Your Password!" },

                {
                  pattern: new RegExp(
                    "^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                  ),
                  message:
                    "You Should Have a Uppercase,LowerCase,Symbol,Number",
                },
              ]}
            >
              <Input.Password style={{ padding: "8px 8px" }} />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  backgroundColor: "Orange",
                  marginTop: "20px",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
