import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "./axiosConfig"
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Write =() => {
    const state=useLocation().state
    const [value,setValue]=useState(state?.desc || "");
    const [title,setTitle]=useState(state?.title || "");
    const [file,setFile]=useState(null);
    const [cat,setCat]=useState(state?.cat || "");

    const upload = async ()=>{
        try{
            const formData = new FormData();
            formData.append("file",file);
            const res = await axios.post("/upload",formData);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }

    const handleClick = async (e)=>{
        e.preventDefault();
        const imgUrl=await upload();
        try{
            state? await axios.put(`/posts/${state.id}`,{
                title,desc:value,cat,img:file ? imgUrl: ""
            }):await axios.post(`/posts`,{
                title,desc:value,cat,img:file ? imgUrl: "", date: moment(Date.now()).format("YYYY-MM-DD HH:MM:SS"),
            });
        }catch(err){

        }
    }
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="add">
            {currentUser==null && <h1>please login to write</h1>}
            {currentUser!=null && <div className="content">
                <input className="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>}
            {currentUser!=null && <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibilit: </b> Public
                    </span>
                    <input style={{display:"none"}} type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload image</label>
                    <div className="buttons">
                        <button>Sava as draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" checked={cat==="software"} name="cat" value="software" id="software" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="art">Software </label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat==="consulting"} name="cat" value="consulting" id="consulting" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="consulting">Consulting </label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat==="finance"} name="cat" value="finance" id="finance" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="finance">Finance </label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat==="quant"} name="cat" value="quant" id="quant" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="quant">Quant </label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat==="analytics"} name="cat" value="analytics" id="analytics" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="analytics">Analytics </label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat==="core"} name="cat" value="core" id="core" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="core">Core </label>
                    </div>
                    
                </div>
             </div>}
        </div>
    )
}

export default Write


