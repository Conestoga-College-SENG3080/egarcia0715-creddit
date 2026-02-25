/*
 * Filename		: favourites.jsx
 * Project		: frontend-assignment-garciaerin
 * By			: Erin Garcia
 * Date 		: 2026-03-01
 * Description	: This file contains the favourites handling - displaying favourited posts, removing posts from favourites.
 */


import { useEffect, useState } from "react";
import { apiGet } from "../api/creddit";


export default function FavouritesView() {
    const [posts, setPosts] = useState([]);


    //LOADFAVOURITES
    async function loadFavourites() {
        const ids = JSON.parse(localStorage.getItem("favourites")) || [];
        const results = await Promise.all(
            ids.map(id => apiGet(`/posts/${id}`))
        );
        setPosts(results.map(r => r.data));
    }//end loadFavourites(0)


    //REMOVEFAVOURITE
    function removeFavourite(id) {
        const updated = JSON.parse(localStorage.getItem("favourites"))
        .filter(x => x !== id);
        localStorage.setItem("favourites", JSON.stringify(updated));
        loadFavourites();
    }//end removeFavourite()

    useEffect(() => {loadFavourites();}, []);


    return (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 className="main">Your Favourite Creddit Posts</h2>
            
            <hr/>

            {posts.map(post => (
                <div  key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>By {post.author} | Likes: {post.totalLikes}</p>
                    <button onClick={() => removeFavourite(post.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
}//end FavouritesView()