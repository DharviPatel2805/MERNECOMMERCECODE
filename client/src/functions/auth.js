import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/create-or-update-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const listUsers = async () => {
  return await axios.get("http://localhost:8000/api/users");
};

export const checkRef = async (email) => {
  return await axios.post("http://localhost:8000/api/checkref", { email });
};

export const applyRef = async (email) => {
  return await axios.post("http://localhost:8000/api/applyref", { email });
};

export const addCreditToNewUser = async (email) => {
  return await axios.post("http://localhost:8000/api/addnewcredit", { email });
};
