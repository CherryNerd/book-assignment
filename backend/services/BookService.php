<?php

namespace app\services;

use app\models\Book;
use yii\db\Exception;

class BookService
{
    /**
     * @param string $input
     * @return array|string
     * @throws Exception
     */
    public function getBooksByInput(string $input): array|string
    {
        // Just to be sure, get the books from the first data source
        Book::setDb(Book::DB_DATABASE1);
        $books = $this->getBooks($input);
        // Check if any books match the input
        if (count($books) > 0) {
            return $books;
        }

        // Since we have no books found, we need to get them from the second data source
        Book::setDb(Book::DB_DATABASE2);
        $books = $this->getBooks($input);

        if (count($books) > 0) {
            // Setting back to DB1 to save new book
            Book::setDb(Book::DB_DATABASE1);
            $this->saveNewBook($books);
            return $books;
        }

        return 'No books found';
    }

    /**
     * @param string $input
     * @return array
     */
    private function getBooks(string $input): array
    {
        return Book::find()
            ->where(['like', 'title', $input])
            ->orWhere(['like', 'author', $input])
            ->orWhere(['like', 'isbn', $input])
            ->all();
    }

    /**
     * @param array $books
     * @return void
     * @throws Exception
     */
    private function saveNewBook(array $books): void
    {
        foreach ($books as $book) {
            $newBook = new Book($book);
            $newBook->isbn = $book->isbn;
            $newBook->title = $book['title'];
            $newBook->author = $book['author'];
            $newBook->pages = $book['pages'];
            $newBook->language = $book['language'];
            $newBook->save();
        }
    }
}