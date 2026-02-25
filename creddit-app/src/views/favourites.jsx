/*
 * Filename		: 
 * Project		:
 * By			: Erin Garcia
 * Date 		:
 * Description	:
 */


import { useEffect, useState } from "react";
import { apiGet } from "../api/creddit";


export default function FavouritesView() {
    const [posts, setPosts] = useState([]);

    async function loadFavourites() {
        const ids = JSON.parse(localStorage.getItem("favourites")) || [];
        const results = await Promise.all(
            ids.map(id => apiGet(`/posts/${id}`))
        );
        setPosts(results.map(r => r.data));
    }//end loadFavourites(0)

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