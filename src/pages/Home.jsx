import BookCard from "../components/BookCard";
import { useState, useEffect } from "react";
import "../css/Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [defaultBooks, setDefaultBooks] = useState([]);
  const [userCollection, setUserCollection] = useState({
    Reading: [],
    Read: [],
    Dropped: [],
    "To read": []
  });

  // Load userCollection from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("userCollection");
    if (stored) {
      setUserCollection(JSON.parse(stored));
    }
  }, []);

  // Save userCollection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userCollection", JSON.stringify(userCollection));
  }, [userCollection]);

  const addToCollection = (book, category) => {
    setUserCollection((prev) => {
      // Prevent duplicates
      const alreadyAdded = prev[category].some((b) => b.id === book.id);
      if (alreadyAdded) return prev;

      return {
        ...prev,
        [category]: [...prev[category], book]
      };
    });
  };

  // Fetch default books on mount
  useEffect(() => {
    async function fetchDefault() {
      try {
        const res = await fetch(
          "https://openlibrary.org/search.json?q=harry+potter"
        );
        const data = await res.json();
        const mappedBooks = data.docs.slice(0, 12).map((doc) => ({
          id: doc.key,
          title: doc.title,
          author: doc.author_name?.[0] || "Unknown",
          release_date: doc.first_publish_year || "N/A",
          cover_id: doc.cover_i
        }));
        setBooks(mappedBooks);
        setDefaultBooks(mappedBooks);
      } catch (err) {
        console.error("Erro ao carregar livros iniciais:", err);
      }
    }
    fetchDefault();
  }, []);

  // Live search
  useEffect(() => {
    if (searchTerm.length < 2) {
      setBooks(defaultBooks);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchBooks(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchBooks = async (query) => {
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      const mappedBooks = data.docs.slice(0, 12).map((doc) => ({
        id: doc.key,
        title: doc.title,
        author: doc.author_name?.[0] || "Unknown",
        release_date: doc.first_publish_year || "N/A",
        cover_id: doc.cover_i
      }));
      setBooks(mappedBooks);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
    }
  };

  return (
    <div className="home">
      <h2>Bem-vindo à App de Livros</h2>
      <input
        type="text"
        placeholder="Pesquisar por Livros"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="book-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onAddToCollection={(book, category) => addToCollection(book, category)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
