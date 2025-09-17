import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import NavBarCategory from "../components/NavBarCategory";


function Collection() {
  const [userCollection, setUserCollection] = useState({
    Reading: [],
    Read: [],
    Dropped: [],
    "To read": []
  });

  useEffect(() => {
    const stored = localStorage.getItem("userCollection");
    if (stored) setUserCollection(JSON.parse(stored));
  }, []);

  return (
    <div className="collection-page">
      <NavBarCategory />
      <h2>Minha Coleção de Livros</h2>
      <p>Aqui podes ver e gerir a tua coleção</p>

      {Object.keys(userCollection).map((category) => (
        <div key={category} className="collection-category">
          <h2>{category}</h2>
          {userCollection[category].length > 0 ? (
            <div className="book-grid">
              {userCollection[category].map((book) => (
                <BookCard book={book} key={book.id} />
              ))}
            </div>
          ) : (
            <p>Nenhum livro nesta categoria.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Collection;
