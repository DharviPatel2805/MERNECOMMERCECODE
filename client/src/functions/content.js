import axios from "axios";

export const createDynamicContent = async (content, authtoken) => {
  return await axios.post("http://localhost:8000/api/admin/content", content, {
    headers: {
      authtoken,
    },
  });
};

export const listContent = async () => {
  return await axios.get("http://localhost:8000/api/admin/content");
};

export const removeContent = async (_id, authtoken) => {
  return await axios.delete(`http://localhost:8000/api/admin/content/${_id}`, {
    headers: { authtoken },
  });
};

export const setContentDynamic = async (_id, authtoken) => {
  return await axios.put(
    `http://localhost:8000/api/admin/content/${_id}`,
    {},
    {
      headers: { authtoken },
    }
  );
};

export const cancelContentDynamic = async (_id, authtoken) => {
    return await axios.put(
      `http://localhost:8000/api/admin/cancelcontent/${_id}`,
      {},
      {
        headers: { authtoken },
      }
    );
  };

export const readContent = async () => {
  return await axios.get("http://localhost:8000/api/admin/content");
};
