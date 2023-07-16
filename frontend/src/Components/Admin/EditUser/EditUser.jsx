import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../Axios/axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function EditUser() {
  const navigate = useNavigate();
  let { id } = useParams();
  if (!id) {
    navigate("/");
  }
  const [userDetails, setUserDetails] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const token = useSelector((store) => store.Admin.Token);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  useEffect(() => {
    axiosInstance
      .get(`/userDetails?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserDetails(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const editUserFormSubmit = (e) => {
    e.preventDefault();
    if (
      userDetails.email === "" ||
      userDetails.firstName === "" ||
      userDetails.lastName === "" ||
      userDetails.mobile === ""
    ) {
      setErrMsg("All fields are required.");
      return;
    }

    if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)
    ) {
      setErrMsg("Invalid email address.");
      return;
    }

    if (userDetails.mobile.length < 10) {
      setErrMsg("Invalid mobile number");
      return;
    }

    try {
      axiosInstance
        .put(
          "/users",
          { userDetails,id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            setUserDetails(response.data.result)
            Toast.fire({
              icon: "success",
              title: "UserDetails Edited Successfully",
            });
        }
        });
    } catch (error) {
      navigate("/error")
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-2/3 border-2 drop-shadow-[6px_8px_6px_rgba(1,1,0,0.5)]">
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-last-name"
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              value={userDetails.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-phone"
            >
              Mobile
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-last-name"
              type="text"
              name="mobile"
              value={userDetails.mobile}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          class="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          onClick={editUserFormSubmit}
        >
          Edit User
        </button>
      </div>
      {errMsg.length > 0 && (
        <a style={{ color: "red" }} className="py-2">
          {errMsg}
        </a>
      )}
    </div>
  );
}

export default EditUser;
