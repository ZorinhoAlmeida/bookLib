import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import NavBarCategory from "../components/NavBarCategory";
import "../css/Collection.css";


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
 const updateRating = (bookId, category, newRating) => {
  if (!category) return prev; 

  setUserCollection((prev) => {
    const updatedCategory = prev[category]
      ? prev[category].map((b) =>
          b.id === bookId ? { ...b, rating: newRating } : b
        )
      : [];

    const updated = {
      ...prev,
      [category]: updatedCategory,
    };

    localStorage.setItem("userCollection", JSON.stringify(updated));
    return updated;
  });
};


  return (
    <div className="collection-page">
      <NavBarCategory />
      <h2>Minha Coleção de Livros</h2>
      <p>Aqui podes ver e gerir a tua coleção</p>

    {Object.keys(userCollection).map((category) => (
  <div
    key={category}
    id={category.replace(/\s+/g, "-")}   // ✅ id like "To-read"
    className="collection-category"
  >
    <h2>{category}</h2>
    {userCollection[category].length > 0 ? (
      <div className="book-grid">
        {userCollection[category].map((book) => (
          <BookCard
            key={book.id}
            book={book}
            currentCategory={book.category || category}
            currentRating={book.rating || 0}
            onUpdateRating={updateRating}
          />
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
