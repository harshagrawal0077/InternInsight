import React from "react";
import axios from "../pages/axiosConfig";
import { useState, useEffect } from "react";


const Menu =({cat}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
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
    return (
       <div className="menu">
        <h1>other post you may like</h1>
        {posts.map((post) => (
            <div className="post" key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button>Read more</button>
            </div>
        ))}
       </div>
    );
};

export default Menu