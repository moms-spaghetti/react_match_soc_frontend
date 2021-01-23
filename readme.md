# React Match SoC

This project was created as a submission for the week 8 project at the School of Code. It's original version was created by myself in a team of four over the course of one week. It aims to solve the problem presented to us - 'how to improve the relationship or interactions between bootcampers and their mentors'.\
<br/>
**I have heavily refactored this version after improving my skills in react. It improves functionality and removes bugs which could not be removed due to time constraints in the original project.**\
<br/>
[View Demo](https://moms-spaghetti-reactmatchsoc.netlify.app/)\
<br/>
[Frontend Repo](https://github.com/moms-spaghetti/react_match_soc_frontend/)\
[Backend Repo](https://github.com/moms-spaghetti/react_match_soc_backend/)
<br/><br/>

## Details

Match SoC was originally created remotely in a team of four to meet the brief we were given by the School of Code. The app consists of a frontend, backend and database. Bugs were present during our demo and I have heavily refactored this version to align it with the vision of our original plan and remove bugs and poor design decisions implemented in the original version. \
Match SoC aims to improve the relationship between bootcamper and mentor by guaging how closely linked the two parties are. It does this by comparing users based on their industry, interests, and edge cases such as a scenario where a bootcamper and mentor may have a limited number of interests and will may score poorly against all other users. In these edge cases scoring is artificially increased to level scoring against other users with a higher count of interests.
<br/><br/>
The original version failed to correctly update pages dynamically due to poor architecture. Scenarios such as matching two parties would require a page refresh to display data. Although other pages did update correctly, the means in which they did it was inefficent and poorly implemented. Since improving my skills in React I refactored the applicatin to utilise optimistic updates and show updates to data immediately without requiring long refreshes. Aside from this I also completed updates to:

- Refined searching by changing routing and model implementation
- Added confirmation for deleting users
- Removed ability to delete users who are currently matched to another user
- Added optimistic updating for submitting new users and matching users
- Sorted results for optimistic updates so lists stay alphabetically sorted based on firstname
- Changed matching button to reflect already matched users and users which can be matched
- Implemented checks for matching users who are already matched with other users. Users who are already matched with another user will automatically deassign their match with their original partner and reassign their match to the new partner.
- General stability changes throughout to improve scenarios where there is missing data.
- Implemented config file for common backend routes and moved many variables to environment to enable smoother hosting and switching between environment variables.
- Updated all scripts for database deletion, creation and population.
  <br/><br/>

## Built With

- HTML
- CSS
- Javascript
- Create React App
- JSX
- React Router DOM
- React Hook Forms
- Express Generator
- Nodemon
- Node Postgres
- Cors
- uuid
- dotenv
  <br/><br/>

## Getting Started

Clone frontend and backend repos.
Follow the instructions below.
<br/><br/>

## Prerequisites

Download and install npm modules for both front and backend repos.
Add .env files for local usage
You will need a postgres database and uri string to store data.
<br/><br/>

## Installation

1. Clone the frontend
   ```sh
   git clone https://github.com/moms-spaghetti/react_match_soc_frontend.git
   ```
2. Clone the backend
   ```sh
   git clone https://github.com/moms-spaghetti/react_match_soc_backend.git
   ```
3. Download the required npm modules for **both** repos from their root folders
   ```sh
   npm i
   ```
4. Add a .env file in the root of the frontend folder with the entry
   ```sh
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```
5. Add a .env file in the root of the backend folder with the entry
   ```sh
   DATABASE_URL= enter your postgres database uri here
   ```
6. Run the createTable.js script from the backend folder
   ```sh
   npm run createTable
   ```
7. Run the populateTable.js script from the backend folder
   ```sh
   npm run populateTable
   ```
8. Start the application frontend and backend from each respective folder
   ```sh
   npm start
   ```
   <br/><br/>

## Usage

There are three main pages.The first displays a combined list of bootcampers and mentors. From here the user can search based on first and last name, and view all data about the selected bootcamper. Users can also be deleted from this page.\
The second page enables adding of new users and their details. Multiple interests can be added here.\
The final page enables matching between bootcampers and mentors to take place. A function compares industry, interests and edge cases to provide the user how well matched the two parties are. A 100% score indicates an excellent match.
<br/><br/>

## Contact

[Email](mailto:williamedwards36@aol.com)
<br/><br/>
