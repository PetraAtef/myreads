import React from "react";
import BookShelf from "./BookShelf";
//--------------------------------------

//--------------------------------------
import "./App.css";

class ListBooks extends React.Component {
  // state = {
  //   /**
  //    * TODboO: Instead of using this state variable to keep track of which page
  //    * we're on, use the URL in the browser's address bar. This will ensure that
  //    * users can use the browser's back and forward buttons to navigate between
  //    * pages, as well as provide a good URL they can bookmark and share.
  //    */
  //   currenltyReading: [],
  //   wantToRead: [],
  //   read: [],
  //   none: [],
  // // };

  // updateArrays = () => {
  //   this.setState({ currenltyReading: [] });
  //   this.setState({ wantToRead: [] });
  //   this.setState({ read: [] });
  //   this.setState({ none: [] });
  //   this.props.books.forEach((book) => {
  //     if (book.shelf === "currentlyReading")
  //       this.setState((prevState) => {
  //         return {
  //           ...prevState,
  //           currenltyReading: [...prevState.currenltyReading, book],
  //         };
  //       });
  //     else if (book.shelf === "wantToRead")
  //       this.setState((prevState) => {
  //         return {
  //           ...prevState,
  //           wantToRead: [...prevState.wantToRead, book],
  //         };
  //       });
  //     else if (book.shelf === "read")
  //       this.setState((prevState) => {
  //         return {
  //           ...prevState,
  //           read: [...prevState.read, book],
  //         };
  //       });
  //     else
  //       this.setState((prevState) => {
  //         return {
  //           ...prevState,
  //           none: [...prevState.none, book],
  //         };
  //       });
  //   });
  // };

  // componentDidMount() {
  //   this.updateArrays();
  // }
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf
              books={this.props.books.filter(
                (book) => book.shelf === "currentlyReading"
              )}
              title="Currently Reading"
              updateBooks={this.props.updateBooks}
            />
            <BookShelf
              books={this.props.books.filter(
                (book) => book.shelf === "wantToRead"
              )}
              title="Want to read"
              updateBooks={this.props.updateBooks}
            />
            <BookShelf
              books={this.props.books.filter((book) => book.shelf === "read")}
              title="Read"
              updateBooks={this.props.updateBooks}
            />
          </div>
          <div className="open-search">
            <button onClick={() => this.props.history.push("/Search")}>
              Add a book
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;
