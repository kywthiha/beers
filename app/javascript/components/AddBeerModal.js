import {Button, Form, Input, message, Modal, Select, Upload} from "antd";
import React, {useEffect, useRef, useState} from "react";
import axiosInstance from "../axiosInstance";
import {handleError} from "../helper";
import { UploadOutlined } from '@ant-design/icons';

const {Option} = Select;

export default function AddBeerModal({reloadBeers, wine}) {
    const formRef = useRef()
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const onFinish = async (values) => {
        const formData = new FormData();
        for(let key in values){
            formData.set(key,values[key])
        }
        formData.set('image', form.getFieldValue('image'))
        try {
            const url = "api/v1/wines";
            if (wine) {
                await axiosInstance.patch(`${url}/${wine.id}`, values)
            } else {
                await axiosInstance.post(url, values)
                form.resetFields()
            }

            await reloadBeers();
            handleCancel()
        } catch (e) {
            handleError(e).forEach((error_message) => {
                message.error(error_message)
            })
        }

    };



    return (
        <>
            {
            wine ? (<Button type="primary" onClick={showModal}>
                Edit
            </Button>) : (<Button type="primary" onClick={showModal}>
                Create New +
            </Button>)
        }


            <Modal title={wine ? 'Edit Beer ...' : 'Add New Beer ...'} visible={visible} onCancel={handleCancel}
                   footer={null}>
                <Form form={form}  ref={formRef} initialValues={wine} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="brand" label="Brand"
                               rules={[{required: false, message: "Please input your beer brand!"}]}>
                        <Input placeholder="Input your beer brand"/>
                    </Form.Item>

                    <Form.Item name="style" label="Style"
                               rules={[{required: true, message: "Please input your beer style!"}]}>
                        <Input placeholder="Input your beer style"/>
                    </Form.Item>

                    <Form.Item
                        name="country"
                        label="Country"
                        rules={[
                            {
                                required: true,
                                message: "Please input the country of the beer!",
                            },
                        ]}
                    >
                        <Select showSearch placeholder="Select your beer country" optionFilterProp="children"
                                style={{width: "100%"}}>
                            <Option value="Finland">Finland</Option>
                            <Option value="Germany">Germany</Option>
                            <Option value="Netherlands">Netherlands</Option>
                            <Option value="UK">UK</Option>
                            <Option value="USA">USA</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="quantity" label="Quantity"
                               rules={[{required: true, message: "Please input the quantity!"}]}>
                        <Input type="number" placeholder="How many beers you desire?"/>
                    </Form.Item>

                    <Form.Item name="image" label="Image"
                               rules={[{required: true, message: "Please input the quantity!"}]}>
                        <Input type="file" name="image" placeholder="Select image beer?" accept="image/*" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
