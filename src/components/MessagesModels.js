import React,{useEffect, useState} from 'react'
import '../components/styles/messageModal.css'
import axios from 'axios'

const Messages=({setManagepopup})=>{
    const [messages,setMessages]=useState([])
    const [showForm,setShowForm]=useState(false)
    const [title,setTitle]=useState([])
    const [text,setText]=useState([])
    const [error,setError]=useState('')
    const [isDisabled, setIsDisabled] = useState(true);
    const [titleInput,setTitleInput]=useState([])
    const [textInput,setTextInput]=useState([])
    
    const addMessage=async()=>{
        try{
            const newMessage={title,text}
            const response = await axios.post('http://localhost:4500/api/v1/messages',newMessage) 
            console.log(response)
            setMessages(false)
        }catch(error){
            setError(error.response.data.message)
        }
    }

    const handleUpdate=async()=>{
      console.log(titleInput,textInput)
    }

    useEffect(()=>{
        axios.get('http://localhost:4500/api/v1/messages')
        .then((response)=>{
            setMessages(response.data.messages)
        }).catch((error) => {
            console.error('Error fetching messages:', error);
          });
    })
    return (
        <div className="message-modal">
          <div className="message-modal-content">
            <span className="close" onClick={()=>setManagepopup(false)}>
              &times;
            </span>
            <h2>Manage messages</h2>
            <button onClick={()=>setShowForm(true)}>Add new</button>
            {showForm && (
                <div className="messages_form">
                  <input  value={title} onChange={(e)=>setTitle(e.target.value)} type="text"  placeholder='title' />
                <input  value={text} onChange={(e)=>setText(e.target.value)} type="text"  placeholder='content'/>
                <button onClick={()=>setShowForm(false)}>Cancel</button>
                <button onClick={()=>addMessage()}>Create</button>
                </div>
            )}
            {messages.map((message,index)=>(
                <div key={message.id} className="messages_form">
                <input disabled={isDisabled}  type="text" value={titleInput} onRateChange={(e)=>setTitleInput(e.target.value)}  placeholder={message.title} />
                <input disabled={isDisabled} type="text" value={textInput} onChange={(e)=>setTextInput(e.target.value)}  placeholder={message.text}/>
                {isDisabled && (
                    <button onClick={()=>setIsDisabled(false)}>Edit</button>
                )}
                {!isDisabled && (
                    <button>Update</button>
                )}
            </div>
            ))}
            </div>
            </div>
    )
}


export default Messages