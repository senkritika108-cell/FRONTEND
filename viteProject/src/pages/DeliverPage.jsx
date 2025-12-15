import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import './DeliverPage.css';

const { Option } = Select;

const DeliverPage = () => {
    const onFinish = values => {
        console.log('Delivery Form:', values);
    };

    return (
        <div className="deliver-container">
            <div className="deliver-card">

                <h2 className="deliver-title">Become an Uber Delivery Partner</h2>
                <p className="deliver-subtitle">
                    Deliver packages & food and earn with full flexibility
                </p>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    className="deliver-form"
                >

                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please enter your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Delivery Vehicle"
                        name="vehicleType"
                        rules={[{ required: true, message: 'Select your vehicle!' }]}
                    >
                        <Select placeholder="Select">
                            <Option value="bike">Bike</Option>
                            <Option value="scooter">Scooter</Option>
                            <Option value="cycle">Cycle</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Enter your city name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Aadhaar Number"
                        name="aadhaar"
                        rules={[{ required: true, message: 'Enter Aadhaar number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="deliver-btn">
                        Start Delivering
                    </Button>

                </Form>

            </div>
        </div>
    );
};

export default DeliverPage;
