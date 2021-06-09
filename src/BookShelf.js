import React from "react";
// import * as BooksAPI from './BooksAPI'
//--------------------------------------

//--------------------------------------
import "./App.css";

class BookShelf extends React.Component {
  // onShelfChange = (book, newShelf) => {
  //   // update the book
  //   update(book, newShelf);
  // };
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
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
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
