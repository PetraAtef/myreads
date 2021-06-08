import React from "react";
// import * as BooksAPI from './BooksAPI'
//--------------------------------------

//--------------------------------------
import "./App.css";
import { search } from "./BooksAPI";

class SearchPage extends React.Component {
  state = {
    books: [],
    query: "",
  };
  async updateQuery(query) {
    this.setState(() => ({
      query: query,
    }));
    if (query === 0) {
      this.setState({ books: [] });
    } else {
      const new_books = await search(query);
      new_books.map((book) => {
        if (!("shelf" in book)) {
          book.shelf = "none";
        }
      });

      this.setState(() => ({
        books: new_books.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        ),
      }));
    }
  }

  async updateBooksState(query) {
    const new_books = await search(query);
    new_books.map((book) => {
      if (!("shelf" in book)) {
        book.shelf = "none";
      }
    });

    new_books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );

    this.setState(() => ({
      books: new_books,
    }));

    return new_books;
  }

  // async componentDidMount() {
  //   const searchBooks = await search("*");
  //   console.log(searchBooks.length);
  //   if (searchBooks.length > 0)
  //     searchBooks.map((book) => {
  //       if (!("shelf" in book)) {
  //         book.shelf = "none";
  //       }
  //       return book;
  //     });
  //   this.setState({ books: this.props.books });
  // }

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
                              // .then(
                              //   this.setState({books: searchBooks()})
                              // )
                            }}
                            value={book.shelf}
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
