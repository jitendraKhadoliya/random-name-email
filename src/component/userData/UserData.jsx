import axios from "axios";
import React, { useState } from "react";
import "./userData.css";
import Loading from "../loading/Loading";

const UserData = ({ user, setUser }) => {
  const [loader, setLoader] = useState(false);

  // * function for changing the userData and store inside the localStorage

  const handleRefresh = async () => {
    setLoader(true);
    try {
      const response = await axios.get("https://randomuser.me/api");
      const { name, email } = response.data.results[0];
      // console.log("newUserData", name, email);
      const refreshedUser = { name, email };
      setUser(refreshedUser);
      localStorage.setItem("user", JSON.stringify(refreshedUser));
      // console.log("refreshedUser", refreshedUser);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <>
      <div className="user-name">
        <label className="user-label">User Name : </label>
        {loader ? (
          <Loading />
        ) : (
          <h1>{`${user?.name.title}  ${user.name.first} ${user.name.last}`}</h1>
        )}
      </div>
      <div className="user-email">
        <label className="user-label">User Email : </label>
        {loader ? <Loading /> : <p>{user.email}</p>}
      </div>
      <div className="btn">
        <button onClick={handleRefresh}>Refresh</button>
      </div>

      {console.log("userData in component", user)}
    </>
  );
};

export default UserData;
