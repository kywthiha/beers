import {message, Popconfirm, Table} from "antd";
import {useEffect, useState} from "react";
import {handleError} from "../../helper";
import axiosInstance from "../../axiosInstance";
import Layout from "../../components/Layout";
import ReactDOM from 'react-dom'


export default function BeerIndex() {

    const [beers, setBeers] = useState([])

    const loadBeers = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/wines')
            setBeers(res.data.data)
        } catch (e) {
            handleError(e)
            message.error("Error: " + e)
        }
    }

    const  deleteBeer = async (id) => {
        try{
            const url = `api/v1/wines/${id}`;
            await axiosInstance.delete(url)
            await loadBeers()
        }catch (e){
            handleError(e)
            message.error("Error: " + e)
        }
    };

    useEffect(async () => {
        await Promise.all([loadBeers()])
    }, [])

    const columns = [
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Style",
            dataIndex: "style",
            key: "style",
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "",
            key: "action",
            render: (_text, record) => (
                <Popconfirm title="Are you sure to delete this beer?" onConfirm={() => deleteBeer(record.id)}
                            okText="Yes" cancelText="No">
                    <a href="#" type="danger">
                        Delete{" "}
                    </a>
                </Popconfirm>
            ),
        },
    ];

    return (
       <Layout>
           <Table className="table-striped-rows" dataSource={beers} columns={columns}
                  pagination={{pageSize: 5}}/>
       </Layout>
    )
}