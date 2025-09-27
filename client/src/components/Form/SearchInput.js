import axios from "axios";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const SearchInput = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data?.products }); // results not Result
      navigate("/search");
    } catch (error) {
      console.log("Search Error:", error);
    }
  };

  return (
    <div className="container-fluid">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
