import BookCard from "../components/BookCard";
import { useState, useEffect } from "react";
import "../css/Home.css";

function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
    // remove the book from ALL categories first
    const cleaned = Object.fromEntries(
      Object.entries(prev).map(([cat, arr]) => [
        cat,
        arr.filter((b) => b.id !== book.id),
      ])
    );

    // add book into the new category
    const bookWithMeta = { ...book, category, rating: book.rating || 0 };

    return {
      ...cleaned,
      [category]: [...cleaned[category], bookWithMeta],
    };
  });
};

const updateRating = (bookId, category, newRating) => {
  if (!category) return; // se o livro não tem categoria ainda, não faz nada

  setUserCollection((prev) => {
    // caso a categoria não exista, inicializa como []
    const updatedCategory = prev[category] ? prev[category].map((b) =>
      b.id === bookId ? { ...b, rating: newRating } : b
    ) : [];

    return {
      ...prev,
      [category]: updatedCategory,
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
    fetchBooks("harry potter", page); // default
    return;
  }

  const delayDebounce = setTimeout(() => {
    setPage(1); // reset to first page
    fetchBooks(searchTerm, 1);
  }, 500);

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);

useEffect(() => {
  if (searchTerm.length >= 2) {
    fetchBooks(searchTerm, page);
  } else {
    fetchBooks("harry potter", page);
  }
}, [page]);



  const fetchBooks = async (query, pageNumber = 1) => {
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${pageNumber}`
    );
    const data = await res.json();

    const mappedBooks = data.docs.slice(0, 24).map((doc) => ({
      id: doc.key,
      title: doc.title,
      author: doc.author_name?.[0] || "Unknown",
      release_date: doc.first_publish_year || "N/A",
      cover_id: doc.cover_i
    }));

    setBooks(mappedBooks);

    // OpenLibrary returns numFound (total results)
    setTotalPages(Math.ceil(data.numFound / 100)); 
    // API returns 100 per page, but you’re slicing 12 for display
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
  {books.map((book) => {
    // find if book already exists in any category
    const foundCategory = Object.keys(userCollection).find((cat) =>
      userCollection[cat].some((b) => b.id === book.id)
    );

    const foundBook =
      foundCategory &&
      userCollection[foundCategory].find((b) => b.id === book.id);

    return (
      <BookCard
        key={book.id}
        book={book}
        onAddToCollection={(book, category) => addToCollection(book, category)}
        onUpdateRating={updateRating}
        currentCategory={foundCategory || null}  
        currentRating={foundBook?.rating || 0}   
      />
    );
  })}
</div>
<div className="pagination">
  <button
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
  >
    Prev
  </button>
  <span>
    Page {page} of {totalPages}
  </span>
  <button
    disabled={page === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
  >
    Next
  </button>
</div>


    </div>
  );
}

export default Home;
