import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BookMapper from './BookMapper';
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  userInput = '';

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    search: [],
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
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
    return (
      <div className="app">
      <Route exact path='/search'render={() => 
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to={{pathname: '/', state: {search: []}}}>Close</Link>
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
         }/>
         <Route exact path='/' render={() => 
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
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          }/>
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
        if(this.userInput){
          BooksAPI.search(this.userInput).then(books => {
            console.log('search', books);
            if (books) {
              this.setState({ search: this.compareBookShelves(books) });
            } else {
              this.setState({ search: [] });
            }
          }
          );
      }
      });
      
  }


  handleUserInput = (event) => {
    this.userInput = event.target.value
    if(event.target.value){
      BooksAPI.search(event.target.value).then(books => {
      if (books.length > 0) {
        this.setState({ search: this.compareBookShelves(books)});
       } else {
          this.setState({ search: [] });
        }
    }
    );
  } else {
    this.setState({ search: [] });

  }
}
}


export default BooksApp
