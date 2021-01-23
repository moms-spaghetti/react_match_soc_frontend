import React from "react";
import "./userlistdelete.css";
import { v4 as uuid } from "uuid";

function UserListDelete({ userData, setPanelData, deleteUser }) {
  if (!userData) {
    return <p>loading</p>;
  } else
    return (
      <ul>
        {userData.map((value) => {
          return (
            <div id="user-list-delete-component-container" key={uuid()}>
              <li
                id="user-list-delete-component"
                onClick={() => {
                  setPanelData(value.id);
                }}
              >
                {value.firstname} {value.surname}
              </li>
              <button
                onClick={() => {
                  if (value.matchedwith !== "not matched") {
                    alert(
                      `You cannot delete ${value.firstname} ${value.surname} who is matched with another user. Remove the match and try again.`
                    );
                  } else {
                    const confirmDelete = window.confirm(
                      `Are you sure you want to delete ${value.firstname} ${value.surname}`
                    );
                    if (confirmDelete) {
                      deleteUser(value.id);
                    } else return;
                  }
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </ul>
    );
}
export default UserListDelete;
