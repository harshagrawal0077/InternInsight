import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link , useLocation } from "react-router-dom";
import axios from "./axiosConfig";
const Home =() => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  // const posts = [
    //     {
    //       id: 1,
    //       title: "photo 1",
    //       desc: "hello its me",
    //       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 2,
    //       title: "picture 2",
    //       desc: "hi i am harsh",
    //       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 3,
    //       title: "picture 3",
    //       desc: "hello",
    //       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 4,
    //       title: "picture 4",
    //       desc: "hello",
    //       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //   ];

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

    return (
        <div className="home">
            <div className="posts">
                {posts.map(post=>(
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../../upload/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                          <h1>{post.title}</h1>
                            
                            <p>{getText(post.desc)}</p>
                            <Link className="link" to={`/post/${post.id}`}>
                            <button>Read More</button>
                            </Link>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home