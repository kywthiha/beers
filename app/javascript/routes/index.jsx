import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BannerIndex from "../pages/beers";


export default () => (
    <Router>
        <Routes>
            <Route path="/" element={<BannerIndex />} />
        </Routes>
    </Router>
)