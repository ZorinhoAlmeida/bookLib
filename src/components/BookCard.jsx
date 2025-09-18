import { useState, useEffect, useRef } from "react";
import "../css/BookCard.css";

function BookCard({ book, onAddToCollection, onUpdateRating, currentCategory, currentRating }) {
  const [showList, setShowList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const selectRef = useRef(null);

  useEffect(() => {
    setSelectedCategory(currentCategory);
  }, [currentCategory]);

  // 👇 auto-open dropdown when it appears
  useEffect(() => {
    if (showList && selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click(); // some browsers require click to expand
    }
  }, [showList]);

  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  const handleCategorySelect = (e) => {
    const category = e.target.value;
    if (category && onAddToCollection) {
      onAddToCollection(book, category);
      setSelectedCategory(category); 
      setShowList(false);
    }
  };

  return (
    <div className="book-card">
      <div className="book-Cover">
        <img src={coverUrl} alt={`Capa do livro ${book.title}`} />
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.release_date}</p>
      </div>
      <div className="book-category">
        {onAddToCollection && (
          <>
            <button onClick={() => setShowList(!showList)}>
              {selectedCategory || "Add to list +"}
            </button>
            {showList && (
              <select
                ref={selectRef}
                className="category-list"
                onChange={handleCategorySelect}
                defaultValue="Reading" // 👈 pick a sensible default
              >
                <option value="Reading">Reading</option>
                <option value="Read">Completed</option>
                <option value="Dropped">Dropped</option>
                <option value="To read">To read</option>
              </select>
            )}
          </>
        )}
      </div>
      <div className="book-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`fa fa-star ${star <= (currentRating || 0) ? "checked" : ""}`}
            onClick={() => onUpdateRating && onUpdateRating(book.id, selectedCategory, star)}
            style={{
              cursor: "pointer",
              color: star <= (currentRating || 0) ? "#ffb400" : "#ccc",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default BookCard;
