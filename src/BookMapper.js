import React from 'react'
import { BookItem } from './BookItem';

export const mapToBookItems = (books, handleOptionSelection) => {
    return books.map((book, key) => {
        return (
            <li key={key}>
                <BookItem
                    book={book}
                    handleClickEvent={handleOptionSelection} />
            </li>
        );
    });
}