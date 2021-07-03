import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

const instance = axios.create({
  baseURL: process.env.REACT_APP_DRF_API,
  timeout: 5000,
});

export const fetchThemeList = async () => {
  return instance
    .get("/writing/themes/")
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetchWritingsByTheme = async (theme_id: number, page?: number) => {
  return instance
    .get(`/writing/list/theme/${theme_id}/?page=${page ? page : 1}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetchWritingByNumId = async (id: number) => {
  const url = `/writing/${id}/`;
  return instance
    .get(url)
    .then((response) => response.data)
    .catch(function (error) {
      let status = error.response ? error.response.status : null;
      if (status === 404) {
        return status;
      } else {
        return error;
      }
    });
};

export const fetchDoneWritingsByTheme = async (jwtToken: string) => {
  const config = {
    headers: {
      Authorization: "jwt " + jwtToken,
    },
  };
  return instance
    .get("/activity/theme_writing/", config)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

/** 문 푼제 저장 */
export const updateDoneWriting = async (
  jwtToken: string,
  theme_id: number,
  writing_id: number
) => {
  const config = {
    headers: {
      Authorization: "jwt " + jwtToken,
    },
    body: {
      theme_id,
      writing_id,
    },
  };
  return instance
    .post("/activity/theme_writing/", config)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
