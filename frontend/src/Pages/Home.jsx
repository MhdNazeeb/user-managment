import React from "react";
import Navbar from "../Components/Admin/Navbar/Navbar";
import UserList from "../Components/Admin/UserList/UserList";

function Home() {
  return (
    <>
      <Navbar />
      <UserList />
    </>
  );
}

export default Home;