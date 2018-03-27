import React from 'react'

// TODO: include these in a style
const width = 128;
const height = 193;


export class BookItem extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    state = { shelf: 'currentlyReading' };

    componentDidMount() {
        this.setState({ shelf: this.props.book.shelf });
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: width, height: height, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf} onChange={this.handleChange}>
                            {/* TODO: use value as index for optionsArray */}
                            <option value="none" disabled>Move to...</option>
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

    handleChange(event) {
        var selectedOption = event.target.value;
        this.props.handleClickEvent(this.props.book, selectedOption);
        this.setState({ shelf: selectedOption });
        console.log('handleChange', selectedOption);
    }

}
