import React from 'react'
import { BookItem } from './BookItem';

export const mapToBookItems = (books) => {
    return books.map((book, key) => {
        return(
            <li key={key}>
                <BookItem backgroundImage={book.imageLinks.thumbnail}
                    bookTitle={book.title}
                    bookAuthors={book.authors} />
            </li>
        );
    });
}