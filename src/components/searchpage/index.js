import React, { useEffect, useState } from "react";
import SearchInput from "../searchinput";
import UserInfo from "../userinfo";
import UserListDelete from "../userlistdelete/userlistdelete";
import "./searchpage.css";

function SearchPage({ setSearchInput, userData, deleteUser }) {
  const [userInfoData, setUserInfoData] = useState(false);

  useEffect(() => {
    if (userData) {
      setUserInfoData(userData[0]);
    }
  }, [userData]);

  function setPanelData(userId) {
    setUserInfoData(userData.find((value) => value.id === userId));
  }

  return (
    <div className="sub-page-container">
      <header>
        <h1 className="sub-page-title">People Search</h1>
      </header>
      <section className="page-main-section">
        <article className="search-panel-left">
          <SearchInput setSearchInput={setSearchInput} />
          <UserListDelete
            userData={userData}
            setPanelData={setPanelData}
            deleteUser={deleteUser}
          />
        </article>
        <article className="search-panel-right">
          <UserInfo userInfoData={userInfoData} userData={userData} />
        </article>
      </section>
    </div>
  );
}
export default SearchPage;
