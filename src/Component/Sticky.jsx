import React, { useState,useReducer } from 'react'
import '../Component/Sticky.css'
import {v4 as uuid} from 'uuid';

const initialNoteState={
    lastNoteCreated:null,
    totalNotes:0,
    notes:[],

};

const notereducer =(prevState,actionState)=>{
    switch(actionState.type){
        case 'ADD_NOTE':{
            const newState={
              lastNoteCreated:new Date().toTimeString().slice(0,8),
              totalNotes:prevState.notes.length+1,
              notes:[...prevState.notes,actionState.payload],
          
            }

            console.log("Ater Add  note",newState);
            return newState;
        }
    }
}

export default function Sticky() {
    const [Input, setInput] = useState('')
    const [notesState, dispatch] = useReducer(notereducer,initialNoteState)
    const  addNote =(event)=>{
      event.preventDefault();
      if(!Input){
        return;
      }
      const newNote ={
        id:uuid(),
        text:Input,
        rotate: Math.floor(Math.random()*20),
      }
      dispatch({type:'ADD_NOTE',payload: newNote})
    }

  return (
    <div>
      <h1>Sticky Note</h1>
      <form action="" onSubmit={addNote} className='note-from'>
        <textarea placeholder='Creating A new Note'
        value={Input} onChange={e=>setInput(e.target.value)}></textarea>
        <button>Add</button>
      </form>

     
      {
        notesState.notes.map((note) => (
          <div className='note' key={note.id}
          style={{transform: `rotate(${note.rotate}deg)`}}>
            <pre className='text'>{note.text}</pre>
          </div>
        ))
      }

    </div>
  )
}
