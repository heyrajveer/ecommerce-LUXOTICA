const CategoryForm = ({ value, setValue, handleSubmit, buttonText = "Submit" }) => {
  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <div className="mb-10 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Enter category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary ms-2">
        
        {buttonText}
      </button>
    </form>
  );
};

export default CategoryForm;