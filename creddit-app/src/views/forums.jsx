import { useState } from "react";
import { apiGet } from "../api/creddit";

export default function ForumView() {
    // List of forums (you can add more if the API supports)
    const forumOptions = ["funny","askcreddit","gaming","aww","music","worldnews","pics","movies","todayilearned","science","videos","showerthoughts","news","jokes","askscience","food","iama","nottheonion","diy",
                          "gifs","books","space","lifeprotips","explainlikeimfive","me-irl","personalfinance","technology","fitness","lifehacks","politics","unexpected","odddlysatisfying","travel","minecraft",
                          "dadjokes","facepalm","mademesmile", ];

    const [forum, setForum] = useState(forumOptions[0]); // default selection
    const [posts, setPosts] = useState([]);

    async function loadPosts() {
        try {
            console.log("Loading posts for forum:", forum);

            // Correct endpoint: GET /api/posts?forum={forum}&sort=hot&limit=10
            const res = await apiGet(`/forums/${forum}`);

            console.log("API response:", res.data);
            setPosts(res.data);

        } catch (err) {
            console.error("Failed to load posts:", err);
            alert("Could not load posts. Check console.");
        }
    }

    function addFavourite(postId) {
        const favs = JSON.parse(localStorage.getItem("favourites")) || [];
        if (!favs.includes(postId)) {
            favs.push(postId);
            localStorage.setItem("favourites", JSON.stringify(favs));
        }
    }

    return (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2>Select Forum</h2>

            <select value={forum} onChange={e => setForum(e.target.value)}>
                {forumOptions.map(f => (
                    <option key={f} value={f}>{f}</option>
                ))}
            </select>

            <button onClick={loadPosts} style={{ marginLeft: 10 }}>Load Posts</button>

            <hr />

            {posts.length === 0 && <p>No posts loaded.</p>}

            {posts.map(post => (
                <div key={post.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>By {post.author} | Likes: {post.totalLikes}</p>
                    <button onClick={() => addFavourite(post.id)}>Favourite</button>
                </div>
            ))}
        </div>
    );
}