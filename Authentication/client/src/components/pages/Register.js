import React from 'react';
import { Form, Input, Button, Row, Col, Divider , notification} from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from '../../config/axios';
import { Link, withRouter } from 'react-router-dom';

const layout = {
    labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
    wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
function Register(props) {

    const onFinish = async values => {
        console.log('Received values of form: ', values);
        const body = {
            username : values.username,
            password : values.password,
            firstname : values.firstname,
            lastname : values.lastname,
            image : values.image,
            phone : values.phone
        }
        await axios.post('/user/register', body)
            .then( res => {
                notification.success({
                    message: `${values.firstname} ${values.lastname} has registered`,
                  });

                  props.history.push('/user/login')

            })
            .catch(err => {
                notification.error({
                    message: `Username have already taken`,
                  });
            })
    };

    return (
        <Row justify="center" >
            <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div
                    className="Form"
                >
                    <Row justify="center">
                        <Title level={2} className="Title">
                            Register
                        </Title>
                    </Row>
                    <Divider className="Divider" />
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >
                        <Form.Item
                            name="username"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']} // if text in password change will run this Form again
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule,value){
                                        if (!value || getFieldValue('password') === value){
                                            return Promise.resolve()
                                        }
                                        return Promise.reject("Confirm Password must same with Password")
                                    }
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* <Form.Item
                            name="nickname"
                            label={<span>Nickname&nbsp;</span>}
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item> */}
                        
                        <Form.Item
                            name= 'firstname'
                            label = 'First Name' 
                            rules={[{
                                required : true,
                                message : 'Please input your firstname! ',
                                whitespace : true
                            }]}
                            >
                            <Input/>

                        </Form.Item>
                        <Form.Item
                            name= 'lastname'
                            label = 'Last Name' 
                            rules={[{
                                required : true,
                                message : 'Please input your lastname! ',
                                whitespace : true
                            }]}
                            >
                            <Input/>

                        </Form.Item>
                        <Form.Item
                            name= 'phone'
                            label = 'Phone' 
                            rules={[{
                                required : true,
                                message : 'Please input your phone! ',
                                whitespace : true
                            }]}
                            >
                            <Input/>

                        </Form.Item>
                        <Form.Item
                            name= 'image'
                            label = 'Image' 
                            rules={[{
                                required : true,
                                message : 'Please input your image! ',
                                whitespace : true
                            }]}
                            >
                            <Input/>

                        </Form.Item>

                            <Button className="Button" type="primary" htmlType="submit">
                                Register
                            </Button>
                            <Link to='/login'><Button type='primary' className="Button" danger>Back</Button></Link>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}
export default withRouter(Register)