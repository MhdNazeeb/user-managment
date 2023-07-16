import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Axios/axios";
import Pagination from "../Pagination/Pagination";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserList = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const navigate = useNavigate();

  const token = useSelector((store) => store.Admin.Token);

  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState([]);
  const [SearchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axiosInstance
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.result);
        setUserData(response.data.result);
        setShow(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/users?id=${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status == 201) {
              Swal.fire(
                "Deleted!",
                "User account has been deleted.",
                "success"
              );
              setUserData(response.data.user);
              setShow(response.data.user);
            }
          })
          .catch((error) => {
            Toast.fire(error.message);
            navigate("/error")
          });
      }
    });
  };
  const handleChange = (event) => {
    setSearchInput(event.target.value);

    if (event.target.value) {
      console.log(event.target.value);
      let uppdateUse = show.filter(
        (item) =>
          item.firstName
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
      );
      setUserData(uppdateUse);
    } else {
      setUserData(show);
    }
  };

  return (
    <>
      <fieldset className="flex justify-between items-center rounded-md shadow-sm bg-regal-blue h-20">
        <div className="space-y-2 col-span-full lg:col-span-1 flex items-center justify-start ml-4">
          <p className="font-extrabold text-lg text-real-orange">
            User Information
          </p>
        </div>
        <div class=" relative  text-gray-600 items-center justify-end mr-4">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none ml-20"
            type="search"
            name="search"
            placeholder="Search"
            value={SearchInput}
            onChange={handleChange}
          />
          <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
            <svg
              class="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style={{ width: "10px", height: "10px" }}
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </fieldset>
      <div className="">
        <div className="min-w-screen flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6 ">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">User</th>
                    <th className="py-3 px-6 text-center">Email</th>
                    <th className="py-3 px-6 text-center">Phone</th>
                    <th className="py-3 px-6 text-center">Delete</th>
                    <th className="py-3 px-6 text-center">Edit</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {userData
                    ?.slice(currentPage * 4 - 4, currentPage * 4)
                    .map((user, index) => (
                      <tr
                        className="border-b border-gray-200 hover:bg-gray-100"
                        key={user._id}
                      >
                        <td
                          className="py-3 px-6 text-left"
                          key={user?.firstName}
                        >
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src="/images/1.jpg"
                              />
                            </div>
                            <span>{user?.firstName}</span>
                          </div>
                        </td>
                        <td
                          className="py-3 px-6 text-center whitespace-nowrap"
                          key={user?.email}
                        >
                          <div className=" text-center">
                            <span className="font-medium ">{user?.email}</span>
                          </div>
                        </td>
                        <td
                          className="py-3 px-6 text-center"
                          key={user?.mobile}
                        >
                          <div className="flex items-center justify-center">
                            {user?.mobile}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              key={user?._id}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => {
                                  DeleteUser(user?._id);
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              key={user._id}
                              onClick={() => navigate(`/edituser/${user._id}`)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {userData?.length ? (
              <Pagination
                users={userData}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            ):<p pl-5 text-red>No USERS</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
