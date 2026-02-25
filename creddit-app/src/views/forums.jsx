/*
 * Filename		: forum.jsx
 * Project		: frontend-assignment-garciaerin
 * By			: Erin Garcia
 * Date 		: 2026-03-01
 * Description	: This file contains the code for the forums handling - displaying the posts, adding to favourites, selecting forums.
 */


import { useState } from "react";
import { apiGet } from "../api/creddit";


export default function ForumView() {
    //list of forums
    const forumOptions = ["funny","askcreddit","gaming","aww","music","worldnews","pics","movies","todayilearned","science","videos","showerthoughts","news","jokes","askscience","food","iama","nottheonion","diy",
                          "gifs","books","space","lifeprotips","explainlikeimfive","me-irl","personalfinance","technology","fitness","lifehacks","politics","unexpected","odddlysatisfying","travel","minecraft",
                          "dadjokes","facepalm","mademesmile", ];
    const [forum, setForum] = useState(forumOptions[0]);
    const [posts, setPosts] = useState([]);

    //LOADPOSTS
    async function loadPosts() {
        try {
            //endpoint
            console.log("Loading posts for forum:", forum);
            const res = await apiGet(`/forums/${forum}?sortBy=hot&limit=10`);

            console.log("API response:", res.data);
            setPosts(res.data);

        } catch (err) {
            console.error("Failed to load posts:", err);
            alert("Could not load posts. Check console.");
        }
    }//end loadPosts()


    //ADDFAVOURITE
    function addFavourite(postId) {
        const favs = JSON.parse(localStorage.getItem("favourites")) || [];

        //sends an alert that the post is ALREADY added
        if (favs.includes(postId)) {
            alert("Already in favourites");
            return;
        }

        //sends an alert that hte post is added
        favs.push(postId);
        localStorage.setItem("favourites", JSON.stringify(favs));
        alert("Added to favourites!");
    }//end addFavourite()


    return (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2>Select Forum</h2>

            <div className="forum-controls">
                <select className="forum-select" value={forum} onChange={e => setForum(e.target.value)}>
                    {forumOptions.map(f => (<option key={f} value={f}>{f}</option>))}
                </select>
                <button onClick={loadPosts}>Load Posts</button>
            </div>

            <hr/>

            {posts.length === 0 && <p >No posts loaded.</p>}
            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>By {post.author} | Likes: {post.totalLikes}</p>
                    <button onClick={() => addFavourite(post.id)}>Favourite</button>
                </div>
            ))}
        </div>
    );//end return
}//end ForumView()