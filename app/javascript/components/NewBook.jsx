import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewBook = () => {
  const navigate = useNavigate();
  const [itemList , setItemList] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();
  const [contact_no ,setContact] =useState("");
  const [address,setAddress] = useState("")
  

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    
    event.preventDefault();
    const url = "/api/v1/books/create";

    if (name.length == 0 || gender.length == 0 || age.length == 0 || contact_no.length == 0 || address.length == 0)
      return;

    const body = {
      name,
      gender,
      age,
      contact_no,
      address
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate("/books"))
      .catch((error) => console.log(error.message));
      alert(" Successfully")
  };
return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new books to our awesome book collection.
          </h1>
          <form >
            <div className="form-group">
              <label htmlFor="recipeName">Full Name</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeIngredients">Gender</label>
              <input
                type="text"
                name="gender"
                id="recipeIngredients"
                className="form-control"
                required
                onChange={(event) => onChange(event, setGender)}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="recipeName">Age</label>
              <input
                type="number"
                name="name"
                id="recipeName"
                className="form-control"
                required
                onChange={(event) => onChange(event, setAge)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeName">Contact Number</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                className="form-control"
                required
                onChange={(event) => onChange(event, setContact)}
              />
            </div>
            <label htmlFor="instruction">Address</label>
            <textarea
              className="form-control"
              type = "text"
              id="instruction"
              name="instruction"
              required
              onChange={(event) => onChange(event, setAddress)}
            />
            <button type="submit" className="btn custom-button mt-3" onClick={onSubmit}>
              Create Book
            </button>
            <Link to="/books" className="btn btn-link mt-3">
              Back to Books
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBook;