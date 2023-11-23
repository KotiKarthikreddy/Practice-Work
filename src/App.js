import React from "react";
import { Button, Form, Row, Col, Card, Input, Typography, message } from "antd";
import axios from "axios";

const Login = () => {
  const onFinish = (values) => {
    axios
      .post("https://dev.sitara.cc/api/smb/user/login", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <Card style={{ marginTop: "30%", backgroundColor: "lightgreen", paddingInline:"10%" }}>
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
              <Input
                style={{ padding: "8px 8px" }}
              />
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
              <Input.Password
                style={{padding: "8px 8px" }}
              />
            </Form.Item>
            <Form.Item style={{textAlign:"center"}}>
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
