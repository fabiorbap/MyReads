import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BookMapper from './BookMapper';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  constructor() {
    super();
    this.handleOptionSelection = this.handleOptionSelection.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    search: [],

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then((books) => this.sortBooksBySection(books));

  }

  sortBooksBySection = (books) => {
    var currentlyReading = [];
    var wantToRead = [];
    var read = [];
    books.map(book => {
      if (book.shelf === 'currentlyReading') {
        currentlyReading.push(book);
        return;
      }
      else if (book.shelf === 'wantToRead') {
        wantToRead.push(book);
        return;
      }
      else {
        read.push(book);
        return;
      }
    });
    this.setState({ currentlyReading: currentlyReading, wantToRead: wantToRead, read: read });
  }

  render() {
    console.log(this.state.search);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input onChange={this.handleUserInput} type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {BookMapper.mapToBookItems(this.state.search, this.handleOptionSelection)}
              </ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {BookMapper.mapToBookItems(this.state.currentlyReading, this.handleOptionSelection)}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {BookMapper.mapToBookItems(this.state.wantToRead, this.handleOptionSelection)}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {BookMapper.mapToBookItems(this.state.read, this.handleOptionSelection)}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }

  compareBookShelves = (books) => {
    var allBooks = this.state.currentlyReading.concat(this.state.read, this.state.wantToRead);
    return books.map(book => {
      var matchedBook = allBooks.find(bookInShelf => {
        return book.id === bookInShelf.id;
      });
      if (matchedBook) {
        return matchedBook;
      } else {
        book.shelf = 'none';
        return book;
      }
    });
  }

  handleOptionSelection = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getBooks()
    });
  }


  handleUserInput = (event) => {
    BooksAPI.search(event.target.value).then(books => {
      if (books) {
        this.setState({ search: this.compareBookShelves(books) });
      } else {
        this.setState({ search: [] });
      }  
    }
    );
  }
}


export default BooksApp
