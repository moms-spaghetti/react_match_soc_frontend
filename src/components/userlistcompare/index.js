import React from "react";
import "./userlistcompare.css";
import { v4 as uuid } from "uuid";

function UserListCompare({ userData, updateUserInfo }) {
  return (
    <ul>
      {userData.map((value) => {
        return (
          <li
            id="user-list-component"
            key={uuid()}
            onClick={() => updateUserInfo(value.id, value.isbootcamper)}
          >
            {value.firstname} {value.surname}
          </li>
        );
      })}
    </ul>
  );
}
export default UserListCompare;
