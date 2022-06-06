import React from 'react';
import { Form, Input, Button, Row, Col, Divider, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from '../../config/axios';
import LocalStorageservice  from '../../services/localStorageservice'
import { Link } from 'react-router-dom';
import '../css/login.css'

const layout = {
    labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 4, xxl: 3 },
    wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 20, xxl: 21 },
};

export default function Login(props) {
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    const onFinish = async values => {
        // console.log('Success:', values);
        const body = {
            username : values.username,
            password : values.password
        }
        await axios.post('/user/login', body)
            .then(result => {
                notification.success({
                    message: `${values.username} has login`,
                  });
                //   console.log(result);

                LocalStorageservice.setToken(result.data.token)
                props.setRole('user')

            })
            .catch(err => {
                notification.error({
                    message: `Username or Password not correct`,
                  });
            })
    };

    // const login =  async(e) => {
    //     // e.prevenDefault()
    //     const body = {
    //         username : username,
    //         password : password
    //     }
    //     await axios.post('/user/login', body)
    //         .then(result => {
    //             notification.success({
    //                 message: `${username} has login`,
    //               });
    //               console.log(result);

    //             LocalStorageservice.setToken(result.data.token)
    //             props.setRole('user')

    //         })
    //         .catch(err => {
    //             notification.error({
    //                 message: `Username or Password not correct`,
    //               });
    //         })
    // }

    return (
        <Row justify="center" className='login'>
            <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div className="Form">
                    <Row justify="center">
                        <Title level={2} className="Title">
                            <img src='https://blogs.icrc.org/th/wp-content/uploads/sites/104/2022/02/facebook-icon.png' alt='logo' />
                            <img src='https://www.webdesignerdepot.com/cdn-origin/uploads/2015/07/featured_facebook.jpg' alt='word' />
                    </Title>
                    </Row>
                    <Divider className="Divider" />
                    <Form
                        className="App"
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <div className='button'>
                            <Button className="button-login" type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Link to='/register'><Button type='primary' className="button-register" danger>Register</Button></Link>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>

        
    );
}
