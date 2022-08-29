import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentElement = useRef();
  const nameElement = useRef();
  const emailElement = useRef();
  const storeDataElement = useRef();

  useEffect(()=>{
    nameElement.current.value = window.localStorage.getItem('name')
    emailElement.current.value = window.localStorage.getItem('email')
  },[])

  const handleComment =()=>{
    setError(false)
    const {value: comment} = commentElement.current
    const {value: name} = nameElement.current
    const {value: email} = emailElement.current
    const {checked: storeMe} = storeDataElement.current
    if(!comment || !email || !name){
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }
    if(storeMe){
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    }else{
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }
    submitComment(commentObj)
      .then((res)=>{
        setShowSuccessMessage(true)
        setTimeout(()=>{
          setShowSuccessMessage(false)
        }, 3000)
      })
  }

  return (
    <div className="bg-white text-black shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Comment</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentElement}
          placeholder="comment"
          name="comment"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200
        bg-gray-200"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameElement}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200
        bg-gray-200"
          name="name"
          placeholder="Name"
        />

        <input
          type="text"
          ref={emailElement}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200
        bg-gray-200"
          name="email"
          placeholder="Email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataElement} type="checkbox" id="storeData" name="storeData" value="true"/>
          <label className="ml-2">Remember me</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          type="button"
          className="bg-black text-white px-4 rounded-lg py-2 shadow-lg hover:bg-gray-700"
          onClick={handleComment}
        >Submit</button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-black">Comment Submitted</span>}
      </div>
    </div>
  );
};

export default CommentsForm;
