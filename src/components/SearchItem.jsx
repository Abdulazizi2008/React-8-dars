const SearchItem = ({ filter, setFilter }) => {
  return (
    <form className="searchForm">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Items"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
