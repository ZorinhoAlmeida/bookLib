
import BookCard from "../components/BookCard";
import { useState,useEffect } from "react";


function Home() {
      const books = [
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", release_date: "1937" },
    { id: 2, title: "1984", author: "George Orwell", release_date: "1949" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", release_date: "1960" },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", release_date: "1951" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
   
    return;
    }
    console.log("Pesquisando por:", searchTerm);
    
  }

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="home">
      <h2>App Livros</h2>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Pesquisar por Livros" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <button type="submit" className="search-button">Pesquisar</button>

      </form>


      <div className="book-grid">
        {books.map((book) =>
         book.title.toLowerCase().startsWith(searchTerm.toLowerCase()) && (<BookCard book={book} key={book.id} />
          
        ))}
      </div>
      
    </div>
  )
}


export default Home;