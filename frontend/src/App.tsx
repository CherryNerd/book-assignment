import {useEffect, useState} from 'react'
import './App.css'
import Books from "./components/Books.tsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0);
    const [booksInput, setBooksInput] = useState(null);
    const [booksData, setBooksData] = useState(null);


    useEffect(() => {
        const apiUrl = 'http://localhost:8000/books/search?input='

        if (booksInput !== null && booksInput !== '') {
            fetch(apiUrl + booksInput).then((response) => {
                if (!response.ok) {
                    throw new Error('Response was not OK');
                }
                return response.json();
            }).then((data) => {
                setBooksData(data);
            }).catch((error) => {
                console.error(error.data);
            })
        }

        if (booksInput === '') {
            setBooksData(null);
        }
    }, [booksInput]);

    const handleInputChange = (event) => {
        setBooksInput(event.target.value);
    };

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
