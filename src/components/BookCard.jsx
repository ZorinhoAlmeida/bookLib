
import { useState } from "react";
import "../css/BookCard.css"



function BookCard({book}) {


    
const [showList, setShowList] = useState(false);
 const [rating, setRating] = useState(0);

 const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  


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
      <button onClick={() => setShowList(!showList)}>
        Add to list +
      </button>

      {showList && (
        <select className="category-list">
          <option>Reading</option>
          <option>Read</option>
          <option>Dropped</option>
          <option>To read</option>
        </select>
      )}
    </div>
    <div className="book-rating">
         {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`fa fa-star ${star <= rating ? "checked" : ""}`}
            onClick={() => setRating(star)}
            style={{ cursor: "pointer", color: star <= rating ? "#ffb400" : "#ccc" }}
          ></span>
        ))}
    </div>
        
    </div>
  )
}


export default BookCard;