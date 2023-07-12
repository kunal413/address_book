// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const Books = () => {
//     const params = useParams();
//   const navigate = useNavigate();
//   const [books, setbooks] = useState([]);

//   useEffect(() => {
//     const url = "/api/v1/books/index";
//     fetch(url)
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then((res) => setbooks(res))
//       .catch(() => navigate("/"));
//   }, [params.id]);

//   const deleteAddressbook = (id) => {

//     const url = `/api/v1/destroy/${id}`;

//     alert(id)

//     const token = document.querySelector('meta[name="csrf-token"]').content;

 

//     fetch(url, {

//       method: "DELETE",

//       headers: {

//         "X-CSRF-Token": token,

//         "Content-Type": "application/json",

//       },

//     })

//       .then((response) => {

//         if (response.ok) {

//           return response.json();

         

//         }

//         throw new Error("Network response was not ok.");

 

//       })
          
//       .then(() =>  window.location.reload())
         
//       .catch((error) => console.log(error.message));
      
//   };
 

//   const allBooks = books.map((book, index) => (
//     <div key={index} className="col-md-6 col-lg-4">
//       <div className="card mb-4">
//         <div className="card-body">
//           <h5 className="card-title">Full Name:-{book.name}</h5>
//           <h5 className="card-title">Gender:-{book.gender}</h5>
//           <h5 className="card-title">Age:-{book.age}</h5>
//           <h5 className="card-title">Contact-Number:-{book.contact_no}</h5>
//           <h5 className="card-title">Address:-{book.address}</h5>
//           <button type="button" className="btn btn-danger"

//          onClick={()=>deleteAddressbook(book.id)}>Delete List</button>
//         </div>
//       </div>
//     </div>
//   ));
//   const noBook = (
//     <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
//       <h4>
//         No books yet. Why not <Link to="/book">create one</Link>
//       </h4>
//     </div>
//   );

//   return (
//     <>
//       <section className="jumbotron jumbotron-fluid text-center">
//         <div className="container py-5">
//           <h1 className="display-4">Recipes for every occasion</h1>
//           <p className="lead text-muted">
//             We’ve pulled together our most popular Address Books, our latest
//             additions, and our editor’s picks, so there’s sure to be something
//             tempting for you to try.
//           </p>
//         </div>
//       </section>
//       <div className="py-5">
//         <main className="container">
//           <div className="text-end mb-3">
//             <Link to="/book" className="btn custom-button">
//               Add New Book
//             </Link>
//           </div>
//           <div className="row">
//             {books.length > 0 ? allBooks : noBook}
//           </div>
//           <Link to="/" className="btn btn-link">
//             Home
//           </Link>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Books;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Books = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [contactFilter, setContactFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    const url = "/api/v1/books/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setBooks(res))
      .catch(() => navigate("/"));
  }, [params.id]);

  const deleteAddressBook = (id) => {
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => window.location.reload())
      .catch((error) => console.log(error.message));
  };

  const filteredBooks = books.filter((book) => {
    const nameMatch = book.name.toLowerCase().includes(nameFilter.toLowerCase());
    const contactMatch = book.contact_no.includes(contactFilter);
    const ageMatch = book.age.toString().includes(ageFilter);
    return nameMatch && contactMatch && ageMatch;
  });

  const allBooks = filteredBooks.map((book, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Full Name: {book.name}</h5>
          <h5 className="card-title">Gender: {book.gender}</h5>
          <h5 className="card-title">Age: {book.age}</h5>
          <h5 className="card-title">Contact Number: {book.contact_no}</h5>
          <h5 className="card-title">Address: {book.address}</h5>
          <button type="button" className="btn btn-danger" onClick={() => deleteAddressBook(book.id)}>
            Delete List
          </button>
        </div>
      </div>
    </div>
  ));

  const noBook = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No books yet. Why not <Link to="/book">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Address Books for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular Address Books, our latest additions, and our editor’s picks, so
            there’s sure to be something tempting for you to try.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
          <div><Link to="/book" className="btn custom-button">
              Create Book
            </Link>
            </div>
            <br />
            <input
              type="text"
              placeholder="Filter by name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by contact"
              value={contactFilter}
              onChange={(e) => setContactFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by age"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            />
          </div>
          <div className="row">
            {filteredBooks.length > 0 ? allBooks : noBook}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Books;
