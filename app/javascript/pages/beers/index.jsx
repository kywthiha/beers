import {message, Popconfirm, Space, Table} from "antd";
import {handleError} from "../../helper";
import axiosInstance from "../../axiosInstance";
import Layout from "../../components/Layout";
import React, {useEffect, useState} from "react";
import {useSearchParams, useNavigate, useLocation} from "react-router-dom";
import AddBeerModal from "../../components/AddBeerModal";


export default () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [beers, setBeers] = useState([])
    const [meta, setMeta] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation();

    const loadBeers = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/wines?${searchParams.toLocaleString()}`)
            setBeers(res.data.entries)
            setMeta(res.data.meta)
        } catch (e) {
            handleError(e)
            message.error("Error: " + e)
        }
    }

    const deleteBeer = async (id) => {
        try {
            const url = `api/v1/wines/${id}`;
            await axiosInstance.delete(url)
            await loadBeers()
        } catch (e) {
            handleError(e)
            message.error("Error: " + e)
        }
    };

    const onPageChangeHandler = (page, pageSize) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set('page', page.current)
        navigate(`${location.pathname}?${searchParams.toString()}`)
    }

    useEffect(async () => {
        setLoading(true)
        await Promise.all([loadBeers()])
        setLoading(false)
        console.log(location)
    }, [searchParams])

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
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
                <>
                    <Space size={8}>
                        <Popconfirm title="Are you sure to delete this beer?" onConfirm={() => deleteBeer(record.id)}
                                    okText="Yes" cancelText="No">
                            <a href="#" type="danger">
                                Delete{" "}
                            </a>
                        </Popconfirm>
                        <AddBeerModal reloadBeers={loadBeers} wine={record}/>
                    </Space>
                </>
            ),
        },
    ]

    return (
        <Layout>
            {loading ? <></> : (<Table rowKey="id" className="table-striped-rows" dataSource={beers} columns={columns}
                                       pagination={{
                                           pageSize: meta.per_page,
                                           total: meta.total_entries,
                                           current: meta.current_page
                                       }} onChange={onPageChangeHandler}/>)}
            <AddBeerModal reloadBeers={loadBeers}/>
        </Layout>
    )
}