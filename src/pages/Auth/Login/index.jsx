import { useAuth } from "@/context/AuthContext"
import { Button, Col, Form, Input, Row, Typography } from "antd"
import React, { useState } from "react"
import { useNavigate , Link } from "react-router-dom"

const { Title , Paragraph } = Typography

const initialState = {
  email: "",
  password: ""
}

const Login = () => {
  const { dispatch } = useAuth()
  const [state , setState] = useState(initialState)
  const [isProcessing , setIsProcessing] = useState(false)


  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const handleLogin = () => {
        let { email , password } = state                
        if( !email || !password){
          return window.toastify("Please fill all the fields", "error")
        }

        setIsProcessing(true)

        const users = JSON.parse(localStorage.getItem("users")) || []
         
        const user = users.find((user) => user.email === email && user.password === password)
        if(!user){
          setIsProcessing(false)
          return window.toastify("Invalid email or password", "error")
        } 
        
        localStorage.setItem("user" , JSON.stringify(user))
        dispatch({ type: "SET_LOGIN", payload: user })
        
        setTimeout(() => {
          setIsProcessing(false)
          window.toastify("Login successful", "success")
        }, 1000)
        
  }
    return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-700 to-violet-500 px-4">
            <div className="p-4 rounded-lg bg-white w-full max-w-md py-5">
              
              <Title level={1} className="text-center">
                Login
              </Title>
              <Paragraph className="text-center">
                Don't have an account? <Link to="/auth/register">Register</Link>
              </Paragraph>
              <Form layout="vertical">
              <Row>                  
                <Col span={24}>
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Please enter a valid email" }]}>
                    <Input
                      name="email"                      
                      placeholder="Email"
                      size="large"
                      type="email"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                    <Input.Password
                      name="password"                      
                      placeholder="Password"
                      size="large"
                      type="password"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Paragraph>Forgot Password? <Link to="/auth/forgot-password">Reset Password</Link></Paragraph>
                <Col span={24}>
                  <Button type="primary" loading={isProcessing} htmlType="submit" block size="large" onClick={handleLogin}>
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
            </div>
            </div>
    )

}

export default Login