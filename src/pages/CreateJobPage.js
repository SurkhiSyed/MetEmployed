import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import {db, auth} from "../firebase-config";
import {useNavigate} from 'react-router-dom';

function CreateJobPage(isAuth){
    const [companyName, setCompanyName] = useState("");
    const [postText, setPostText] = useState("");
    const [jobType, setjobType] = useState("");
    const [jobLocation, setjobLocation] = useState("");



    const postsCollectionRef = collection(db, "jobPost")
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            companyName, 
            postText,
            jobType, 
            jobLocation,
            author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}, 
        });
        navigate("/"); //Navigate back to the home page
    }

    /*useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);*/
    
    return (    
    <div className='createPostPage'>
        <div className='cpContainer'>
            <h1>Create a Job Post</h1>
            <div className='inputGp'>
                <label> Company Name: </label>
                <input //Create a placeholder with text as "Title..." which changes when text is typed
                    placeholder='Name...' 
                    onChange={(event) => {
                        setCompanyName(event.target.value);
                    }}
                />
            </div>
            <div className='inputGp' >
                <label> Post: </label>
                <textarea 
                    placeholder='Post....'
                    onChange={(event) => {
                        setPostText(event.target.value);
                    }}
                />
            </div>
            <div className='inputGp' >
                <label> Job Position: </label>
                <textarea 
                    placeholder='Job Position/Type....'
                    onChange={(event) => {
                        setjobType(event.target.value);
                    }}
                />
            </div>
            <div className='inputGp' >
                <label> Job Location: </label>
                <textarea 
                    placeholder='Job Location....'
                    onChange={(event) => {
                        setjobLocation(event.target.value);
                    }}
                />
            </div>
            <div>
                <button onClick={createPost}> Submit Post </button>
            </div>
        </div>
    </div>
    )
}



export default CreateJobPage