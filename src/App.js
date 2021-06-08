import React from "react";
import ListBooks from "./ListBooks";
import SearchPage from "./SearchPage";
import { Route, BrowserRouter } from "react-router-dom";
import { getAll } from "./BooksAPI";
import { update } from "./BooksAPI";
// import * as BooksAPI from './BooksAPI'

//--------------------------------------

//--------------------------------------
import "./App.css";

const Page404 = () => {
  return <p> 404 </p>;
};

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true,
  };

  async componentDidMount() {
    const newBooks = await getAll();
    console.log(newBooks.length);
    newBooks.map((book) => {
      if (!("shelf" in book)) {
        book.shelf = "none";
      }
      return book;
    });
    this.setState({ books: newBooks });
  }

  updateBooks = (book, newShelf) => {
    update(book, newShelf);
    const { books } = this.state;
    book.shelf = newShelf;
    const updatedBooks = [...books.filter(({ id }) => id !== book.id), book];
    this.setState(() => ({
      books: updatedBooks,
    }));
  };

  render() {
    // getAll().then((books) => {
    //   this.setState({ books });
    // });
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={(props) => (
            <ListBooks
              {...props}
              books={this.state.books}
              updateBooks={this.updateBooks}
            />
          )}
        />
        <Route
          exact
          path="/Search"
          render={(props) => (
            <SearchPage
              {...props}
              books={this.state.books}
              updateBooks={this.updateBooks}
            />
          )}
        />
        <Route
          exact
          path="/404"
          name="Page 404"
          render={(props) => <Page404 {...props} />}
        />
      </BrowserRouter>
    );
  }
}

export default BooksApp;
