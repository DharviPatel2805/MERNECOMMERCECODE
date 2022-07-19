import axios from "axios";

export const listCategories = async () => {
  return await axios.get("http://localhost:8000/api/categories");
};

export const readCategory = async (slug) => {
  return await axios.get(`http://localhost:8000/api/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`http://localhost:8000/api/category/${slug}`, {
    headers: { authtoken },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(`http://localhost:8000/api/category/${slug}`, category, {
    headers: { authtoken },
  });
};

export const createCategory = async (category, authtoken) => {
  return await axios.post("http://localhost:8000/api/category", category, {
    headers: {
      authtoken,
    },
  });
};


export const getCategorySubs = async (_id) => {
  return await axios.get(`http://localhost:8000/api/category/subs/${_id}`);
};