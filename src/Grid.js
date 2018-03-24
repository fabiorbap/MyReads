mapToBookItems = (books) => {
    return books.map(book => {
        <BookItem backgroundImage={book.imageLinks.thumbnail}
            title={book.title}
        authors={book.authors}/>
    })
}