"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const AddTopic = () => {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description) {
      alert("title and description are required")
      return
    }

    try {
      const res =   await fetch("http://localhost:3000/api/topics", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          }, body: JSON.stringify({title,description})
        })

        if (res.ok) {
          router.push("/")
          router.refresh()
        } else{
          throw new Error ("Failed to create a topic")
        }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}  className="flex flex-col gap-3">
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="border border-slate-500 px-8 py-2 " placeholder="Topic Title" />
            <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" className="border border-slate-500 px-8 py-2 " placeholder="Topic descriptionription" />

            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Add Topic</button>
      </form>
    </div>
  )
}

export default AddTopic
