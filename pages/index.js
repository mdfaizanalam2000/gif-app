import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Home = () => {
    const API_KEY = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
    const auth = getAuth();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [query, setQuery] = useState('');
    const [gifs, setGifs] = useState([]);
    const [message, setMessage] = useState("");
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(15);

    // Check the user authentication state and redirect to login page if not logged in
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
                setQuery("");
            }
            try {
                setMessage("Loading trending GIFs...");
                const response = await fetch(`https://api.giphy.com/v1/gifs/trending/?api_key=${API_KEY}`);
                const parsedData = await response.json();
                setGifs(parsedData.data);
                setStart(0);
                setEnd(15);
                setMessage(`Showing trending🔥GIFs`);
            } catch (error) {
                setMessage("Some error occured, Try again!");
            }
        });
    }, []);

    // Handle the input change event and update the query state
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    // Handle the form submit event and fetch the GIFs from the GIPHY API
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            router.push("/login");
            return;
        }
        if (query === "") {
            setMessage("Type anything to search!");
            return;
        }
        try {
            setMessage("Loading GIFs...");
            const response = await fetch(`https://api.giphy.com/v1/gifs/search/?api_key=${API_KEY}&q=${query}`);
            const parsedData = await response.json();
            setGifs(parsedData.data);
            setStart(0);
            setEnd(15);
            setMessage(`Showing results for "${query}"`);
        } catch (error) {
            setMessage("Some error occured, Try again!");
        }
    };

    return (
        <>
            <div className="container">
                <h1 id='greeting'>Welcome {user ? user.email : ''}</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={query} onChange={handleChange} placeholder="Search for GIFs" />
                    <div className='button'><button type="submit">Search</button></div>
                    <p id="message">{message}</p>
                </form>
            </div>
            <div className="gallery">
                {gifs && gifs.slice(start, end).map((gif, index) => (
                    <div key={gif.id + index}>
                        <img src={gif.images.fixed_height.url} alt={gif.title} />
                    </div>
                ))}
            </div>
            {gifs.length > 0 && <div className="pagination button">
                <button disabled={start === 0} onClick={() => { setStart(start - 15); setEnd(end - 15) }}>&lt; Previous</button>
                <button disabled={end > gifs.length} onClick={() => { setStart(start + 15); setEnd(end + 15) }}>Show next 15 &gt;</button>
            </div>}
        </>
    );
};

export default Home;