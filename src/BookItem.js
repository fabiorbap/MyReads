import React from 'react'

// TODO: include these in a style
const width = 128;
const height = 193;


export class BookItem extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: width, height: height, backgroundImage: this.props.book.imageLinks ? `url("${this.props.book.imageLinks.thumbnail}")` : ''}}></div>
                    <div className="book-shelf-changer">
                        <select value={this.props.book.shelf} onChange={this.handleChange}>
                            {/* TODO: use value as index for optionsArray */}
                            <option value="moveTo" disabled>Move to...</option>
                            <option value="currentlyReading">Currently reading</option>
                            <option value="wantToRead">Want to read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        );
    }

    handleChange = (event) => {
        console.log(event.target.value);
        this.props.handleClickEvent(this.props.book, event.target.value);
    }

}
