import {useEffect, useState, useCallback, ChangeEvent,} from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import './App.css'
import type {Book} from "./types.ts";
import Books from "./components/Books.tsx";

// Move apiUrl outside of component, so it doesn't get re-saved from code to memory with each key-stroke
const apiUrl = 'http://localhost:8000/books/search?input='

function App() {
    const [booksInput, setBooksInput] = useState<string>(null);
    const [booksData, setBooksData] = useState<Book[]>([]);

    const fetchBooksByInput = useCallback(async (searchInput: string) => {
        try {
            const req = await fetch(`${apiUrl}${searchInput}`)
            const res = await req.json();
            setBooksData(res);
        } catch (e) {
            console.log('error.data')
            alert("An unknown error has occured, please try again later.")
        }
    }, []);


    useEffect(() => {
        if (booksInput) {
            // TODO: add a debounce so it doesn't fire with every keystroke. This can also lead to unexpected results because of fetch api race-conditions.
            return fetchBooksByInput(booksInput);
        }
        // No need for an extra if or else statement here
        setBooksData(null);
    }, [booksInput]);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setBooksInput(event.target.value)
        , []
    );

    return (
        <Router>
            <div className={"container sm:w-1xl w-4xl"}>
                <div className="mt-2 dm">
                    <div className=" rounded-lg pl-2 outline-1 outline-gray-200">
                        <input type="text" name="input" id="booksInput" value={booksInput}
                               className="block py-1.5 pr-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                               placeholder="isbn, author or title"
                               onChange={handleInputChange}/>
                    </div>
                </div>
                <Books books={booksData}/>
            </div>
        </Router>
    )
}

export default App
