import '../css/NavBarCategory.css';


function NavBarCategory() {
  const categories = ["Reading", "Read", "Dropped", "To read"];

  const handleScroll = (category) => {
    const element = document.getElementById(category.replace(/\s+/g, "-"));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="nav-bar-category">
      {categories.map((cat) => (
        <button key={cat} onClick={() => handleScroll(cat)}>
          {cat}
        </button>
      ))}
    </nav>
  );
}

export default NavBarCategory;
