const url = process.env.REACT_APP_BACKEND_URL;

const config = {
  BACKEND_URL_GET_ALL_USERS: `${url}/`,
  BACKEND_URL_GET_SPECIFIC_USER: `${url}/search/?user=`,
  BACKEND_URL_POST_NEW_USER: `${url}/`,
  BACKEND_URL_GET_ALL_MENTORS: `${url}/mentors`,
  BACKEND_URL_DELETE_USER: `${url}/`,
  BACKEND_URL_PATCH_MATCH: `${url}/match`,
};

export default config;
