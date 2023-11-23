import React from 'react'
import { Button, Form ,Row,Col,Card, Input, Typography, message} from 'antd';
import axios from 'axios';

const Login = () => {
  const onFinish = (values) => {
    axios.post("https://dev.sitara.cc/api/smb/user/login", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div>
      <Row>
        <Col span={8} offset={8}>
        <Card style={{marginTop:"30%",backgroundColor:"lightgreen"}}>
          <Typography style={{fontWeight:"600",fontSize:"24px",textAlign:"center"}}>Login</Typography>
          <Form layout='vertical' onFinish={onFinish} style={{marginLeft:"70px",marginTop:"20px"}}>
            <Form.Item label="Email" name="email" rules={[{
              type:"email",
              message:"Please Enter Valid Email"
            },{
              required:true,
              message:"Please Enter Your Email"
            }]}>
              <Input style={{width:"70%",height:"auto",padding:"8px 8px"}}/>
              </Form.Item>
              <Form.Item label="Password" name="password"   rules={[
            { required: true, 
              message: "Please input your Password!" },
            {
              pattern: new RegExp(
                "^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
              ),
              message:"You should have a Uppercase,LowerCase,symgjhjghkhdmbol,number"
            },
          ]}
        >
              <Input style={{width:"70%",height:"auto",padding:"8px 8px"}}/>
              </Form.Item>
              <Form.Item>
                <Button htmlType='submit' style={{backgroundColor:"yellow",marginLeft:"25%",marginTop:"20px"}}>Submit</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default Login;