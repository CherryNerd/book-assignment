import type {Book} from "../types.ts";
import SingleBook from "./books/singleBook.tsx";

interface BooksProps {
    books: Book[]
}

export default function Books({books}: BooksProps) {
    if (books.length > 0) {
        return (
            <div
                className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                {
                    books.map((book: Book) => <SingleBook key={book.isbn} {...book}/>)
                }
            </div>
        )
    }

    return 'No data';
}