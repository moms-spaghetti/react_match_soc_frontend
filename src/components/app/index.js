import React, { useState, useEffect } from "react";
import SearchPage from "../searchpage";
import ComparePage from "../comparepage";
import AddUserPage from "../adduserpage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./app.css";
import config from "../../config";
import image from "../../images/pageLogo.png";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [input, setInput] = useState(null);

  //get all data split between full list and search based on input value
  useEffect(() => {
    async function searchUser() {
      let res = await fetch(config.BACKEND_URL_GET_SPECIFIC_USER + `${input}`);
      let data = await res.json();
      console.log(data);
      setUserData(data.payload);
    }

    async function allUsers() {
      let res = await fetch(config.BACKEND_URL_GET_ALL_USERS);
      let data = await res.json();
      setUserData(data);
    }
    if (!input) {
      allUsers();
    } else searchUser();
  }, [input]);

  async function deleteUser(id) {
    await fetch(`${config.BACKEND_URL_DELETE_USER}${id}`, {
      method: "DELETE",
    });
    setUserData(userData.filter((user) => user.id !== id));
  }

  //search input handler
  const setSearchInput = (searchValue) => {
    setInput(searchValue);
  };

  //optimistic update for submitting new user
  const updateUserData = (newUser) => {
    setUserData(sortOnFirstname([...userData, newUser]));
  };

  //optimistic update for matching
  const updateMatchUsers = (updatedUsers) => {
    const updatedUserData = userData.filter(
      (user) => !updatedUsers.some((updatedUser) => user.id === updatedUser.id)
    );
    setUserData(sortOnFirstname([...updatedUserData, ...updatedUsers]));
  };

  //list sorting on firstname
  const sortOnFirstname = (array) => {
    return array.sort(function (a, b) {
      if (a.firstname < b.firstname) {
        return -1;
      }
      if (a.firstname > b.firstname) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <Router>
      <div id="main-page-container">
        <nav>
          <h2>Match SoC</h2>
          <img id="page-logo" src={image} alt="" />
          <ul>
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/adduser">Add User</Link>
            </li>
            <li>
              <Link to="/compare">Compare</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/compare">
            <ComparePage
              userData={userData}
              updateMatchUsers={updateMatchUsers}
            />
          </Route>
          <Route path="/adduser">
            <AddUserPage updateUserData={updateUserData} />
          </Route>
          <Route path="/">
            <SearchPage
              setSearchInput={setSearchInput}
              userData={userData}
              deleteUser={deleteUser}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
