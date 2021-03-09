import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_AIRTABLE_PRACTICE_API,
  timeout: 2000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  },
});

export const fetchPractices = async () => {
  return instance
    .get("", {
      params: {
        view: "Default",
        maxRecords: 10,
      },
    })
    .then(function (response) {
      if (response && response.data && response.data.records) {
        return response.data.records;
      } else {
        return null;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return error;
    });
};
