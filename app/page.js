"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import moment from 'moment'
import memories from '../public/images/memories.png'
import Image from "next/image"
import Spinner from "@/components/Spinner"

export default function Home() {
  const [data, setData] = useState()
  const [posts, setPosts] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    let formData = {
      creator: e.target.creator.value,
      title: e.target.title.value,
      message: e.target.message.value,
      date: e.target.date.value,
      createdAt: new Date()
    }
    setData(formData)
    e.target.reset()
  }

  const handleDelete = async (item) => {
    const id = item._id
    if(confirm("Are You sure want to delete the memory ?")) {
      try {
        await axios.delete(`https://memories-api-pi.vercel.app/posts/${id}`)
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    if(data) {
      axios.post("https://memories-api-pi.vercel.app/posts",data)
      setData(null)
    }
  }, [data])

  useEffect(() => {
    fetch("https://memories-api-pi.vercel.app/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [posts])

  return (
    <div>
      <div className="flex bg-cyan-800 text-white shadow items-center justify-between rounded py-10 px-20">
        <h1 className="text-sky-500 text-4xl font-extrabold">Memories</h1>
        <Image className="inline" src={memories} width={50} height={50} />
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 gap-4">
        <div className="w-auto px-20 py-10">
          <h2 className="pb-5 text-sky-500 font-bold">Create a memory!</h2>
          <form action="http://localhost:5000/posts" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="creator"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Creator
              </label>
              <input
                type="text"
                name="creator"
                id="creator"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your Memory Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Message
              </label>
              <textarea
                type="text"
                name="message"
                id="message"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your Message"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Date Of Your Memory"
                required
              />
            </div>
            <div className="pt-5">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </form>
          
        </div>
        <div className="flex flex-col sm:grid grid-cols-2 gap-4 py-10 px-20">
          {!posts.length ? <Spinner />
            : posts.map((i) => {
              return(
                <div key={i._id} className="relative bg-white border border-gray-200 w-auto h-auto rounded-lg shadow">
                    <div className="p-5">
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900">{i.title}</h5>
                      <p className="text-xs">Created by <i className="text-green-500">{i.creator}</i></p>
                      <p className="mb-3 mt-3 text-xs text-gray-400"><i className="text-pink-400">{moment(i.createdAt).fromNow()}</i></p>
                        
                      <p className="mb-3 mt-3 font-normal text-gray-700">{i.message}</p>
                      <p className="mb-3 mt-3 text-xs text-gray-700"><i className="text-gray-400">{i.date}</i></p>
                      <button 
                        className="absolute bottom-0 right-0 h-16 w-16 px-3 py-2 text-sm font-medium text-center text-red-600 rounded-lg hover:text-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        onClick={() => handleDelete(i)}
                      >
                        delete
                      </button>
                    </div>
                </div>
              )
            })}
        </div>
      </div>
    </div> 
  )
}
