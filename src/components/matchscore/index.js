import React, { useEffect, useState } from "react";
import "./matchscore.css";
import config from "../../config";

function MatchScore({
  bootcamperComparePanelData,
  mentorComparePanelData,
  updateMatchUsers,
  userData,
}) {
  const [compareUserScore, setCompareUserScore] = useState(0);
  const [matchButton, setMatchButton] = useState(true);

  useEffect(() => {
    bootcamperComparePanelData.matchedwith ===
      mentorComparePanelData.id.toString() &&
    bootcamperComparePanelData.matchedwith !== "not matched"
      ? setMatchButton(true)
      : setMatchButton(false);
  }, [bootcamperComparePanelData, mentorComparePanelData]);

  function matchUsers() {
    //set matched values for bootcamper and mentor
    const updatedMentor = {
      ...mentorComparePanelData,
      matchedwith: bootcamperComparePanelData.id.toString(),
    };
    const updatedBootcamper = {
      ...bootcamperComparePanelData,
      matchedwith: mentorComparePanelData.id.toString(),
    };

    let userPayload = [updatedMentor, updatedBootcamper];

    let runCheck = true;

    while (runCheck) {
      //neither are matched
      if (
        bootcamperComparePanelData.matchedwith === "not matched" &&
        mentorComparePanelData.matchedwith === "not matched"
      ) {
        runCheck = false;
        break;
      }

      //only bootcamper already matched
      if (
        bootcamperComparePanelData.matchedwith !== "not matched" &&
        mentorComparePanelData.matchedwith === "not matched"
      ) {
        const previousMentor = userData.filter(
          (mentor) =>
            bootcamperComparePanelData.matchedwith === mentor.id.toString()
        );
        const updatedPrevMentor = {
          ...previousMentor[0],
          matchedwith: "not matched",
        };

        userPayload = [...userPayload, updatedPrevMentor];

        runCheck = false;
        break;
      }

      //only mentor already matched
      if (
        bootcamperComparePanelData.matchedwith === "not matched" &&
        mentorComparePanelData.matchedwith !== "not matched"
      ) {
        const previousBootcamper = userData.filter(
          (bootcamper) =>
            mentorComparePanelData.matchedwith === bootcamper.id.toString()
        );
        const updatedPrevBootcamper = {
          ...previousBootcamper[0],
          matchedwith: "not matched",
        };

        userPayload = [...userPayload, updatedPrevBootcamper];

        runCheck = false;
        break;
      }

      //both bootcamper and mentor matched to different people
      if (
        bootcamperComparePanelData.matchedwith !== "not matched" &&
        mentorComparePanelData.matchedwith !== "not matched"
      ) {
        const previousMentor = userData.filter(
          (mentor) =>
            bootcamperComparePanelData.matchedwith === mentor.id.toString()
        );
        const updatedPrevMentor = {
          ...previousMentor[0],
          matchedwith: "not matched",
        };

        const previousBootcamper = userData.filter(
          (bootcamper) =>
            mentorComparePanelData.matchedwith === bootcamper.id.toString()
        );
        const updatedPrevBootcamper = {
          ...previousBootcamper[0],
          matchedwith: "not matched",
        };

        userPayload = [
          ...userPayload,
          updatedPrevMentor,
          updatedPrevBootcamper,
        ];
        runCheck = false;
        break;
      }
    }
    updateMatchUsers(userPayload);
    postMatchData(userPayload);
  }

  const postMatchData = async (data) => {
    const response = await fetch(config.BACKEND_URL_PATCH_MATCH, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedUsers = await response.json();
    console.log(updatedUsers);
  };

  useEffect(() => {
    function compareUsers(bootcamper, mentor) {
      let score = 0;
      let industryMatch = false;
      let matchedInterests = [];

      if (bootcamper.industry === mentor.industry) {
        industryMatch = true;
        score += 40;
      }

      bootcamper.interests.forEach((bootcamperInterest) => {
        mentor.interests.forEach((mentorInterest) => {
          if (bootcamperInterest === mentorInterest) {
            score += 20;
            matchedInterests.push(bootcamperInterest);
          }
        });
      });

      if (
        matchedInterests.length === bootcamper.interests.length &&
        matchedInterests.length === mentor.interests.length
      ) {
        setCompareUserScore(100);
      } else if (matchedInterests.length >= 4) {
        setCompareUserScore(100);
      } else if (industryMatch === true && matchedInterests.length >= 2) {
        setCompareUserScore(100);
      } else {
        if (score * 1.25 >= 100) {
          setCompareUserScore(100);
        } else setCompareUserScore(score * 1.25);
      }
    }
    compareUsers(bootcamperComparePanelData, mentorComparePanelData);
  }, [bootcamperComparePanelData, mentorComparePanelData]);

  return (
    <div id="matchscore-container">
      <p>Matching Score</p>
      <p>{compareUserScore}%</p>
      <button
        disabled={matchButton}
        style={{
          backgroundColor: matchButton ? "#EA8696" : "#75e296",
          color: "#000",
        }}
        onClick={() => matchUsers()}
      >
        {matchButton ? "already matched" : "assign mentor"}
      </button>
    </div>
  );
}

export default MatchScore;
