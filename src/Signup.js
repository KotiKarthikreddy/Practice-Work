import { Form, Row, Col, Card, Input, Button, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();

  const onfinish = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_BASE_URL}smb/user/send-email-verification-code`,
        values
      );
        localStorage.setItem("userEmail",values.email)
     
    } catch (error) {
      console.log("error:", error.response);
    }
    navigate("/verifycode");
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
              label="Email "
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please Enter A Valid Email",
                },
                {
                  required: true,
                  message: "Please Enter Your Email",
                },
              ]}
            >
              <Input style={{ padding: "8px 8px" }} placeholder="Please Enter Your Email" />
            </Form.Item>
            <Form.Item
              label="Password "
              name="password"
              rules={[
                {
                  pattern: new RegExp(
                    "^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                  ),
                  message: "Please Enter A Uppercase,Lowercase,Symbol,Number",
                },
                {
                  required: true,
                  message: "Please Enter Your Password",
                },
              ]}
            >
              <Input.Password style={{ padding: "8px 8px" }} placeholder="Please Enter Your Password"/>
            </Form.Item>
            <Form.Item
              label="Confirm your password"
          
              rules={[
                { required: true, message: "Please input your Password!" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The new passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password style={{ padding: "8px 8px" }} placeholder="Please Confirm Password"/>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Signup</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Signup;
