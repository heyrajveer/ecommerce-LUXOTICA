import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"ALL Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 mt-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-outline-primary w-100">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>a
    </Layout>
  );
};

export default Categories;
