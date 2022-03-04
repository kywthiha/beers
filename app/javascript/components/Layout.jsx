import { Layout } from "antd";
import Header from "./Header";
import React from "react";

const { Content, Footer } = Layout;



export default ({children}) => (
    <Layout className="layout">
        <Header />
        <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content" style={{ margin: "100px auto" }}>
                {children}
            </div>
        </Content>
        <Footer style={{ textAlign: "center" }}> Honeybadger ©2020.</Footer>
    </Layout>
);