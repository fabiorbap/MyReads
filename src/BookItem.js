import React from 'react'

// TODO: include these in a style
const width = 128;
const height = 193;


export class BookItem extends React.Component {
    render() {
        return (
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: width, height: height, backgroundImage: `url("${this.props.backgroundImage}")` }}></div>
                <div className="book-shelf-changer">
                    <select>
                        {/* TODO: use value as index for optionsArray */}
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently reading</option>
                        <option value="wantToRead">Want to read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{this.props.bookTitle}</div>
            <div className="book-authors">{this.props.bookAuthors}</div>
        </div>
        );    
    }

}

