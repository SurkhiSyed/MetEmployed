import React, { Component, useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import {getDocs, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase-config';

function ManageApplicants(isAuth) {

    const [postLists, setPostList] = useState([]); //Create list of posts
    const [posterLists, setPosterList] = useState([]); //Create list of posts

    const postsCollectionRef = collection(db, "applicantsInfo");
    const posterCollectionRef = collection(db, "jobPost");

    const deletePost = async (postID) => {
        const postDoc = doc(db, 'applicantsInfo', postID)
        await deleteDoc(postDoc)
    }

    useEffect(() =>{
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);//This function returns all the documents inside a collection
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
        };
        const getPoster = async () => {
            const data = await getDocs(posterCollectionRef);//This function returns all the documents inside a collection
            setPosterList(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
        };
        getPosts();
        getPoster();
    }, []);


    console.log("postLists:", postLists);
  console.log("posterLists:", posterLists);
  console.log("auth.currentUser.uid:", auth.currentUser?.uid);
  console.log("post.author.uid:", auth.currentUser?.uid);



  return (
    <div className='ManageApplicantsPage'>
      {postLists.map((post) => {
        const isAuthor = post.postID === auth.currentUser?.uid;
        if (isAuth && isAuthor) {
          return (
            <div className='response'>
                  <div className='applicantjob'>
                    <div className='topcontainer'>
                    <h2>{post.jobPosition}</h2>
                    </div>
                    <div className='deletePost'>
                    <button 
                        onClick={() => {
                            deletePost(post.postID);
                        }}
                    > 
                        &#128465;
                    </button>
                    </div>
                  </div>
                  <div className='applicantjob'> 
                    Name: { post.applicantName}
                  </div>
                  <div className='applicantjob'>
                    Response: {post.applicantResponse}
                  </div>
                  <div className='applicantjob'>
                    Contact Info: {post.applicantInfo}
                  </div>
                </div>
          );
        }
      })}
    </div>
  )
}

export default ManageApplicants