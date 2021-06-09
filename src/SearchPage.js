import React from "react";
// import * as BooksAPI from './BooksAPI'
//--------------------------------------

//--------------------------------------
import "./App.css";
import { search } from "./BooksAPI";

class SearchPage extends React.Component {
  state = {
    books: [],
    // query: "",
  };
  async updateQuery(query) {
    // this.setState(() => ({
    //   query: query,
    // }));
    if (query === "") {
      this.setState({ books: [] });
    } else {
      let new_books = await search(query);
      if (!new_books.error) {
        const old_books = this.props.books;
        old_books.map((book) => {
          if (book.title.toLowerCase().includes(query.toLowerCase()) === true)
            new_books = [...new_books.filter(({ id }) => id !== book.id), book];
          return new_books;
        });

        this.setState(() => ({
          books: new_books,
        }));
        // .filter((book) =>
        //   book.title.toLowerCase().includes(query.toLowerCase())
        // )

        // new_books = new_books.filter((book) => {
        //   book.title.toLowerCase().includes(query.toLowerCase());
        // });
      } else {
        this.setState({ books: [] });
      }
    }
  }

  render() {
    const { query } = this.state;

    const showingBooks = query === "" ? [] : this.state.books;

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
                              book.imageLinks && book.imageLinks.thumbnail
                                ? book.imageLinks.thumbnail
                                : ""
                            })`,
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            onChange={(event) => {
                              this.props.updateBooks(book, event.target.value);
                              const { books } = this.state;
                              book.shelf = event.target.value;
                              const updatedBooks = [
                                ...books.filter(({ id }) => id !== book.id),
                                book,
                              ];
                              this.setState(() => ({
                                books: updatedBooks,
                              }));
                              // .then(
                              //   this.setState({books: searchBooks()})
                              // )
                            }}
                            value={book.shelf ? book.shelf : "none"}
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
                      <div className="book-title">
                        {book.title ? book.title : ""}
                      </div>
                      <div className="book-authors">
                        {book.authors ? book.authors[0] : ""}
                      </div>
                    </div>
                  </li>
                ))
              ) : this.props.books.length === 0 ? (
                <p> please enter a text </p>
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
