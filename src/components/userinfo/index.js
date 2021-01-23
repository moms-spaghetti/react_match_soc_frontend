import React from "react";
import "./userinfo.css";
function UserInfo({ userInfoData, userData }) {
  if (!userInfoData) {
    return <p>loading user...</p>;
  } else
    return (
      <div className="info-container">
        <h2>
          {userInfoData.firstname} {userInfoData.surname}
        </h2>
        <p
          className="info-bootcamper-tag"
          style={
            userInfoData.isbootcamper
              ? { backgroundColor: "#ffe26a" }
              : { backgroundColor: "#ea8696" }
          }
        >
          {userInfoData.isbootcamper ? "bootcamper" : "mentor"}
        </p>
        <section>
          <div className="image-container">
            <img src={userInfoData.image} alt=""></img>
          </div>
          <div>
            <p>
              <span className="info-text">Address:</span> {userInfoData.address}
            </p>
            <p>
              <span className="info-text">Phone:</span> {userInfoData.phone}
            </p>
            <p>
              <span className="info-text">Email:</span> {userInfoData.email}{" "}
              <a href={`mailto:${userInfoData.email}`}>📧</a>
            </p>
            <p>
              <span className="info-text">Industry:</span>{" "}
              {userInfoData.industry}
            </p>
            <div className="info-interests">
              <p className="info-text">Interests:</p>
              <ul>
                {userInfoData.interests.map((value, index) => {
                  return <li key={index}>{value}</li>;
                })}
              </ul>
            </div>
            <p>
              <span className="info-text">Matched to:</span>{" "}
              {userInfoData.matchedwith === "not matched"
                ? "not matched"
                : userData.map((user) => {
                    if (userInfoData.matchedwith === user.id.toString()) {
                      return `${user.firstname} ${user.surname}`;
                    }
                  })}
            </p>
          </div>
        </section>
      </div>
    );
}

export default UserInfo;
