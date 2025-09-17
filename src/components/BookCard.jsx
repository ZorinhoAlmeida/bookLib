
import { useState } from "react";
function BookCard({book}) {


    
const [showList, setShowList] = useState(false);

  


  return (
    <div className="book-card">
        <div className="book-Cover">
            <img src="" alt="Capa do livro" />
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
        <fieldset className="book-rating">
  <legend>Rating</legend>
  {[1, 2, 3, 4, 5].map((n) => (
    <label key={n}>
      <input type="radio" name="rating" value={n} /> {n}⭐
    </label>
  ))}
</fieldset>
    </div>
  )
}


export default BookCard;