import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

function Search() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <input
        type="search"
        value={text}
        className="form-control me-2 mt-2"
        placeholder="Search"
        onChange={handleChange}
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
}

export default Search;
