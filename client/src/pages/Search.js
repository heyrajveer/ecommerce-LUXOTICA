import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";

export const Search = () => {
  const [values] = useSearch();

  return (
    <Layout title="Search results">
      <div className="container"> {/* ✅ fix typo 'contianer' */}
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results?.length < 1
              ? "No Products Found"
              : `Found ${values.results.length}`}
          </h6>

          {/* Show results */}
          <div className="row">
            {values?.results?.map((product) => (
              <div key={product._id} className="col-md-4">
                
                <img 
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                />
                <div className="card m-2">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">₹{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
