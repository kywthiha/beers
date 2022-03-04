import {Button, Form, Input, message, Modal, Select} from "antd";
import React, {useRef, useState} from "react";
import axiosInstance from "../axiosInstance";
import {handleError} from "../helper";

const { Option } = Select;

export  default function AddBeerModal ({reloadBeers}){
    const formRef = useRef()
    const [visible,setVisible] = useState(false)
    const [form] = Form.useForm();

    const showModal = ()=>{
        setVisible(true)
    }

    const handleCancel = ()=>{
        setVisible(false)
    }

    const onFinish = async (values) => {
        try{
            const url = "api/v1/wines";
            const res = await  axiosInstance.post(url,values)
            form.resetFields()
            await reloadBeers();
            handleCancel()
        }catch (e) {
            handleError(e)
            message.error(e.message)
        }

    };


    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create New +
            </Button>

            <Modal title="Add New Beer ..." visible={visible} onCancel={handleCancel} footer={null}>
                <Form  form={form} ref={formRef} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Please input your beer brand!" }]}>
                        <Input placeholder="Input your beer brand" />
                    </Form.Item>

                    <Form.Item name="style" label="Style" rules={[{ required: true, message: "Please input your beer style!" }]}>
                        <Input placeholder="Input your beer style" />
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
                        <Select showSearch placeholder="Select your beer country" optionFilterProp="children" style={{ width: "100%" }}>
                            <Option value="Finland">Finland</Option>
                            <Option value="Germany">Germany</Option>
                            <Option value="Netherlands">Netherlands</Option>
                            <Option value="UK">UK</Option>
                            <Option value="USA">USA</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Please input the quantity!" }]}>
                        <Input type="number" placeholder="How many beers you desire?" />
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
