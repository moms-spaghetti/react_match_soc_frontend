import React, { useEffect, useState } from "react";
import UserListCompare from "../userlistcompare";
import UserInfo from "../userinfo";
import MatchScore from "../matchscore";
import "./comparepage.css";

function ComparePage({ userData, updateMatchUsers }) {
  const [listData, setListData] = useState();
  const [displayBootcampers, setDisplayBootcampers] = useState(true);
  const [selectedBootcamper, setSelectedBootcamper] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(false);

  //set names for list based on displayBootcampers state
  useEffect(() => {
    if (displayBootcampers) {
      setListData(userData.filter((user) => user.isbootcamper));
    } else {
      setListData(userData.filter((user) => !user.isbootcamper));
    }
  }, [displayBootcampers, userData]);

  //sets inital users on viewing pane on first load, maintain current users after match
  useEffect(() => {
    if (!selectedBootcamper || !selectedMentor) {
      setSelectedBootcamper(userData.find((user) => user.isbootcamper));
      setSelectedMentor(userData.find((user) => !user.isbootcamper));
    }
    if (selectedBootcamper || selectedMentor) {
      setSelectedBootcamper(
        userData.find((user) => selectedBootcamper.id === user.id)
      );
      setSelectedMentor(userData.find((user) => selectedMentor.id === user.id));
    }
  }, [userData, selectedBootcamper, selectedMentor]);

  const updateUserInfo = (id, isbootcamper) => {
    isbootcamper
      ? setSelectedBootcamper(
          userData.find((bootcamper) => bootcamper.id === id)
        )
      : setSelectedMentor(userData.find((mentor) => mentor.id === id));
  };

  if (!listData) {
    return <p>loading</p>;
  } else
    return (
      <div className="sub-page-container">
        <header>
          <h1 className="sub-page-title">Compare</h1>
        </header>
        <section className="page-main-section">
          <div className="compare-panel-left">
            <button onClick={() => setDisplayBootcampers(!displayBootcampers)}>
              {displayBootcampers ? "Bootcampers" : "Mentors"}
            </button>
            <UserListCompare
              userData={listData}
              updateUserInfo={updateUserInfo}
            />
          </div>

          <article className="compare-panel-right">
            <UserInfo userInfoData={selectedBootcamper} userData={userData} />
            <hr id="hra" />
            <article id="matchscore-container">
              <MatchScore
                bootcamperComparePanelData={selectedBootcamper}
                mentorComparePanelData={selectedMentor}
                updateMatchUsers={updateMatchUsers}
                userData={userData}
              />
            </article>
            <hr id="hrb" />
            <UserInfo userInfoData={selectedMentor} userData={userData} />
          </article>
        </section>
      </div>
    );
}

export default ComparePage;
