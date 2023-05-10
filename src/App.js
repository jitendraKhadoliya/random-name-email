import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Loading from "./component/loading/Loading";
import UserData from "./component/userData/UserData";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ! fetch data using async await request
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api");
        // console.log(response);
        // ! destructuring the response
        const { name, email } = response.data.results[0];
        const user = { name, email };
        setUser(user);
        // ! saving into local storage
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        // console.log(name, email);
      } catch (error) {
        console.log(error);
      }
    };

    // ! accessing user data from local storage using getItem method

    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      console.log("cachedItems", cachedUser);
    } else {
      fetchUser();
    }
  }, []);

  return (
    <>
      <div className="outer-container ">
        <div className="inner-container">
          {user ? (
            // UserData Component
            <UserData user={user} setUser={setUser} />
          ) : (
            // Loading Component
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
