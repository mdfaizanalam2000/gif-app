import React, { useState } from 'react'
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();
    const auth = getAuth();
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [useremail, setUseremail] = useState("");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true);
            setUseremail(user.email);
        } else {
            setIsLoggedIn(false);
            setUseremail("");
        }
    });

    const handleLogout = () => {
        signOut(auth);
    }

    return (
        <nav>
            <div id="logo">Giphy</div>
            <div className="right">
                {isLoggedIn && <div className="name">{useremail}</div>}
                {isLoggedIn && <div id="logout"><button onClick={handleLogout}>Logout</button></div>}
                {!isLoggedIn && router.pathname === "/" && <div id="login"><button onClick={() => router.push("/login")}>Login</button></div>}
            </div>
        </nav>
    )
}
