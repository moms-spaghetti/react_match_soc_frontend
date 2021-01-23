import React, { useState } from "react";
import "./adduserpage.css";
import { useForm } from "react-hook-form";
import config from "../../config";

const AddUserPage = ({ updateUserData }) => {
  const [inputField, setInputField] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  function cleanUserData(data) {
    let userDataAsArray = Object.entries(data);
    let interest = [];

    for (let i = 0; i < userDataAsArray.length; i++) {
      if (userDataAsArray[i][0].slice(0, 8) === "interest") {
        interest.push(userDataAsArray[i][1]);
      }
    }

    const {
      firstname,
      surname,
      address,
      email,
      phone,
      image,
      isbootcamper,
      industry,
    } = data;

    const userData = {
      firstname: firstname,
      surname: surname,
      address: address,
      email: email,
      phone: phone,
      image: image,
      isbootcamper: isbootcamper,
      industry: industry,
      interests: interest,
      matchedwith: "not matched",
    };

    return userData;
  }

  async function addNewUser(formData) {
    const response = await fetch(config.BACKEND_URL_POST_NEW_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanUserData(formData)),
    });
    const newUser = await response.json();
    updateUserData(...newUser);
    reset();
  }

  function addInterestField() {
    const interestFieldCount = inputField.length;
    setInputField([
      ...inputField,
      <div key={`inputkey-${interestFieldCount}`}>
        <label>Interest:</label>
        <input
          type="text"
          name={`interest${interestFieldCount}`}
          ref={register}
        />
      </div>,
    ]);
  }

  return (
    <div className="sub-page-container">
      <header>
        <h1 className="sub-page-title">Add User</h1>
      </header>
      <section id="page-main-section-adduser" className="page-main-section">
        <p>
          Add new bootcampers and mentors here. Enter individual interests into
          different fields by using the 'add additional interest' button at the
          bottom of this form.
        </p>
        <form onSubmit={handleSubmit(addNewUser)}>
          <div>
            <div>
              <label>First name:</label>
              <input type="text" name="firstname" ref={register} />
            </div>
            <div>
              <label>Last name:</label>
              <input type="text" name="surname" ref={register} />
            </div>
            <div>
              <label>Address:</label>
              <input type="text" name="address" ref={register} />
            </div>
            <div>
              <label>Email:</label>
              <input type="text" name="email" ref={register} />
            </div>
            <div>
              <label>Phone:</label>
              <input type="text" name="phone" ref={register} />
            </div>
            <div>
              <label>Image url:</label>
              <input type="text" name="image" ref={register} />
            </div>
            <div>
              <label>Bootcamper:</label>
              <input type="checkbox" name="isbootcamper" ref={register} />
            </div>
            <div>
              <label>Industry:</label>
              <input type="text" name="industry" ref={register} />
            </div>
            <div className="form-interest-field">
              <div>
                <label>Interest:</label>
                <input type="text" name="interest" ref={register} />
              </div>
              {inputField.map((value) => {
                return value;
              })}
            </div>
          </div>
          <div id="form-buttons">
            <button
              type="button"
              onClick={() => {
                addInterestField();
              }}
            >
              Add Additonal Interest
            </button>
            <input type="submit" />
            <button
              type="button"
              onClick={() => {
                reset();
                setInputField([]);
              }}
            >
              Reset Form
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddUserPage;
