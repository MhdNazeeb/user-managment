import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route,Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import AddUserPage from "../Pages/AddUser";
import EditUserPage from "../Pages/EditUser";
import Error from "../Components/Admin/Error/Error";
import Error404 from "../Components/Admin/Error/404";

function AdminRoute() {
    const IsAdminAuth = useSelector((state) => state.Admin.Token);
    return (
        <div>
            <Routes>
                <Route path="/login" element={IsAdminAuth ? <Navigate to="/" />  : <Login />} /> 
                <Route path="/" element={IsAdminAuth ? <Home /> : <Navigate to="/login" /> } />
                <Route path="/adduser" element={IsAdminAuth ? <AddUserPage /> : <Navigate to="/login" /> } />
                <Route path='/edituser/:id' element={IsAdminAuth?<EditUserPage/>:<Navigate to="/login" />}/>
                <Route path='/error' element={<Error />}/>
                <Route path='/*' element={<Error404 />}/>
            </Routes>
        </div>
    );
}

export default AdminRoute;