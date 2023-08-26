"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";


const EditTopicForm = ({id,title,description}) => {
  const [newTitle,setNewTitle] = useState(title)
  const [newDescription,setNewDescription] = useState(description)

  const router = useRouter()

  const handleSubmit =async  (e) => {
    e.preventDefault()
      try {
          const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({newTitle: newTitle, newDescription: newDescription})
          })

          if (!res.ok) {
            throw new Error("Failed to update topic")
          }
          router.refresh()
          router.push("/")
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
          type="text"
          className="border border-slate-500 px-8 py-2 "
          placeholder="Topic Title"
        />
        <input
        value={newDescription}
        onChange={e => setNewDescription(e.target.value)}
          type="text"
          className="border border-slate-500 px-8 py-2 "
          placeholder="Topic Description"
        />

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
          Update Topic
        </button>
      </form>
    </div>
  );
}

export default EditTopicForm
