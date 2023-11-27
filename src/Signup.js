import { Form, Row, Col, Card, Input, Button, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const onfinish = () => {
    navigate("/");
  };
  return (
    <Row>
      <Col span={8} offset={8}>
        <Card
          style={{
            marginTop: "15%",
            margin: "auto",
            backgroundColor: "skyblue",
          }}
        >
          <Typography.Title style={{ textAlign: "center" }}>
            SignUp
          </Typography.Title>
          <Form layout="vertical" onFinish={onfinish}>
            <Form.Item
              label="Email :"
              name="email"
              //   rules={[
              //     {
              //       type: "email",
              //       message: "Please Enter A Valid Email",
              //     },
              //     {
              //       required: true,
              //       message: "Please Enter Your Email",
              //     },
              //   ]}
            >
              <Input style={{ padding: "8px 8px" }} />
            </Form.Item>
            <Form.Item
              label="Password :"
              name="password"
              //  rules={[{
              //       pattern: new RegExp(
              //         "^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
              //       ),
              //       message:"Please Enter A Uppercase,Lowercase,Symbol,Number"
              // },{
              //     required:true,
              //     message:"Please Enter Your Password"
              // }]}
            >
              <Input style={{ padding: "8px 8px" }} />
            </Form.Item>
            <Form.Item label="ConfirmPassword :" name="" confirmpassword>
              <Input style={{ padding: "8px 8px" }} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit0">Signup</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Signup;
