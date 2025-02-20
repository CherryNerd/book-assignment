import SingleBook from "./books/singleBook.tsx";
import {useEffect, useState} from "react";

export default function Books({books}) {
    if (books && Array.isArray(books)) {
        return (
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                {books.map(function(book) {
                    return (
                        <div>
                            <SingleBook
                                title={book.title}
                                isbn={book.isbn}
                                author={book.author}
                                pages={book.pages}
                                language={book.language}/>
                        </div>
                    )
                })}
            </div>
        )
    }

    return 'No data';
}