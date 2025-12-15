import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import './DriverPage.css';

const { Option } = Select;

const DriverPage = () => {
    const onFinish = values => {
        console.log('Driver Form:', values);
    };

    return (
        <div className="driver-container">
            <div className="driver-card">

                <h2 className="driver-title">Become an Uber Driver</h2>
                <p className="driver-subtitle">Earn on your schedule and drive with flexibility</p>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    className="driver-form"
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
                        label="Vehicle Type"
                        name="vehicleType"
                        rules={[{ required: true, message: 'Select a vehicle type!' }]}
                    >
                        <Select placeholder="Select">
                            <Option value="car">Car</Option>
                            <Option value="auto">Auto</Option>
                            <Option value="bike">Bike</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Driving License Number"
                        name="license"
                        rules={[{ required: true, message: 'Enter your license number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Enter your city!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="driver-btn">
                        Apply Now
                    </Button>

                </Form>

            </div>
        </div>
    );
};

export default DriverPage;
