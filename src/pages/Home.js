import React, { Component, useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import {getDocs, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase-config';
import {useNavigate} from 'react-router-dom';


function Home({isAuth}) {
    const [applicantName, setapplicantName] = useState("");
    const [applicantResponse, setapplicantResponse] = useState("");
    const [applicantInfo, setapplicantInfo] = useState("");
    const [job, setJob] = useState("");
    
    
    const aplicantCollectionRef = collection(db, "applicantsInfo")
    let navigate = useNavigate();
    const sendApplication = async (postID, jobPosition) => {
        await addDoc(aplicantCollectionRef, {
            applicantName, 
            applicantResponse,
            applicantInfo,
            job,
            postID, 
            jobPosition,
            //author: {name: auth.currentUser.displayName, id: post.uid}, 
        });

        navigate("/thankspage"); //Navigate back to the home page
    }

    const [postLists, setPostList] = useState([]); //Create list of posts
    const postsCollectionRef = collection(db, "jobPost")

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);//This function returns all the documents inside a collection
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
        };
        getPosts();
    })


    const deletePost = async (id) => {
        const postDoc = doc(db, 'jobPost', id)
        await deleteDoc(postDoc)
    }
    return(
        <div className='homePage'> {postLists.map((post) => {
        return <div className='post'> 
            <div className='postHeader'> 
                <div className='title'> 
                    <h1> {post.companyName}</h1>
                </div>
                <div className='deletePost'>
                    {isAuth && post.author.id === auth.currentUser.uid && (
                    <button 
                        onClick={() => {
                            deletePost(post.id);
                        }}
                    > 
                        &#128465;
                    </button>
                    )}
                </div>
            </div>
            <div className='postTextContainer'> {post.postText} </div>
            <h2>Position: {post.jobType}</h2>
            <h5>Location: {post.jobLocation}</h5>
            <div className='infoContainer'>
                <div className='inputInfo'>
                    <input //Create a placeholder with text as "Title..." which changes when text is typed
                        placeholder='Name...' 
                        onChange={(event) => {
                            setapplicantName(event.target.value);
                        }}
                    />  
                </div>
                <div className='inputResponseInfo'>
                    <textarea //Create a placeholder with text as "Title..." which changes when text is typed
                        placeholder='Response...' 
                        onChange={(event) => {
                            setapplicantResponse(event.target.value);
                        }}
                    />  
                </div>
                <div className='inputInfo'>
                    <input //Create a placeholder with text as "Title..." which changes when text is typed
                        placeholder='Contact...' 
                        onChange={(event) => {
                            setapplicantInfo(event.target.value);
                        }}
                    />  
                </div>
                <div>
                    <button onClick={() => sendApplication(post.author.id, post.jobType)}> Submit Response </button>
                </div>
                <h5>@{post.author.name}</h5>
            </div>
        </div>
    })}</div>); 
}

export default Home;