import axios from "axios";
import { createCPIRequests } from "./cpiSheetCreation";

export const copyTemplate = async (name, program, token) => {
  const url = `https://www.googleapis.com/drive/v3/files/18L2TySvr18VywZgKNeUGloPIeaVC58phmND7_KtdTPI/copy?key=${
    import.meta.env.VITE_API_KEY
  }`;

  const config = {
    method: "POST",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      name: `(${program}) ${name}: Credit Profile & Institution Sheet`,
    },
  };
  const response = await axios(config);
  return response.data.id;
};

export const updateDocument = async (token, documentId, client, clientName) => {
  const url = `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate?key=${
    import.meta.env.VITE_API_KEY
  }`;

  const updateConfig = {
    method: "POST",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      requests: createCPIRequests(client, clientName),
    },
  };
  await axios(updateConfig);
};

export const getUserInfo = async (token) => {
  const userInfo = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return userInfo;
};
