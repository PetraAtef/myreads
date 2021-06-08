import React from "react";
// import * as BooksAPI from './BooksAPI'
//--------------------------------------

//--------------------------------------
import "./App.css";

class SearchPage extends React.Component {
  state = {
    query: "",
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }));
  };
  render() {
    this.props.books.map((book) => {
      if (!("shelf" in book)) {
        book.shelf = "none";
      }
      return book;
    });

    const { query } = this.state;
    const showingBooks =
      query === ""
        ? this.props.books
        : this.props.books.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
          );

    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => this.props.history.goBack()}
            >
              Close
            </button>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.length > 0 ? (
                showingBooks.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks.smallThumbnail
                            })`,
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            onChange={(event) => {
                              this.props.updateBooks(book, event.target.value);
                            }}
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors[0]}</div>
                    </div>
                  </li>
                ))
              ) : (
                <p>There's no books match this search</p>
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
