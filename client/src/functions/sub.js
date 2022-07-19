import axios from "axios";

export const listSubs = async () => {
  return await axios.get("http://localhost:8000/api/subs");
};

export const readSub = async (slug) => {
  return await axios.get(`http://localhost:8000/api/sub/${slug}`);
};

export const removeSub = async (slug, authtoken) => {
  return await axios.delete(`http://localhost:8000/api/sub/${slug}`, {
    headers: { authtoken },
  });
};

export const updateSub = async (slug, sub, authtoken) => {
  return await axios.put(`http://localhost:8000/api/sub/${slug}`, sub, {
    headers: { authtoken },
  });
};

export const createSub = async (sub, authtoken) => {
  return await axios.post("http://localhost:8000/api/sub", sub, {
    headers: {
      authtoken,
    },
  });
};
