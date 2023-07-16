import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Axios/axios";
import Swal from "sweetalert2";
function AddUser() {
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
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const token = useSelector((store) => store.Admin.Token);
  const addUserFormSubmit = (e) => {
    if(loading){
      return
    }
    setLoading(true)
    e.preventDefault();
    if (email === "" || password === ""|| firstName === ""|| lastName === ""|| mobile === "") {
      setErrMsg("All fields are required.");
      return;
    }

    if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrMsg("Invalid email address.");
      return;
    }
    if (password.length<6) {
        setErrMsg("Invalid password");
        return;
      }
    if (mobile.length<10) {
        setErrMsg("Invalid mobile number");
        return;
      }

    try {

      axiosInstance.post("/users", { email, password,firstName,lastName,mobile },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
          setLoading(false)
          if (response.status === 202) {
              setErrMsg("User Already exists");
            }else {
              
                Toast.fire({
                    icon: "success",
                    title: "User Added Successfully",
                  })
             setEmail("")
             setFirstName("")
             setLastName("")
             setMobile("")
             setPassword("")
            }
      });
      
    } catch (error) {
      navigate("/error")
    }
    
};
  return (
    <div className="flex items-center justify-center h-screen">
<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-2/3 border-2 drop-shadow-[6px_8px_6px_rgba(1,1,0,0.5)]">
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
        First Name
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" value={firstName}  onChange={e=>setFirstName(e.target.value)}/>
    </div>
    <div className="md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
        Last Name
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" value={lastName} onChange={e=>setLastName(e.target.value)}  />
    </div>
  </div>
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-full px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
        Password
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="password" placeholder="******************" value={password} onChange={e=>setPassword(e.target.value)}/>
      
    </div>
  </div>
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-email">
        Email
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text"  value={email} onChange={e=>setEmail(e.target.value)}/>
    </div>
    <div className="md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-phone">
        Mobile
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" value={mobile} onChange={e=>setMobile(e.target.value)} />
    </div>
  </div>
    {errMsg.length > 0 && <a style={{ color: "red" }} className="py-2">{errMsg}</a>}
    <button
            class="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" onClick={addUserFormSubmit}
          >
            Add User
          </button>
</div>
</div>
  )
}

export default AddUser