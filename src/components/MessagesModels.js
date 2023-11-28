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
    const [editedMessage, setEditedMessage] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedText, setEditedText] = useState('');
    const [success,setSucees]=useState([])
    
    const addMessage=async()=>{
        try{
            const newMessage={title,text}
            await axios.post('http://localhost:4500/api/v1/messages',newMessage) 
            // setMessage(false)
        }catch(error){
            setError(error.response.data.message)
        }
    }
    
    const handleEdit = (message) => {
        setIsDisabled(false);
        setEditedMessage({ ...message });
    };


    const updateMessage=async()=>{
       try{
        const updated = { editedTitle, editedText };
        console.log(updated,editedMessage.id)
        const response=await axios.patch(`http://localhost:4500/api/v1/messages/${editedMessage.id}`,updated)
        setIsDisabled(true);
        setSucees(response.data.message)
       }
       catch(err){
        console.error('Error updating message:', err);
       }
    }

    useEffect(()=>{
        axios.get('http://localhost:4500/api/v1/messages')
        .then((response)=>{
            setMessages(response.data.messages)
        }).catch((error) => {
            console.error('Error fetching messages:', error);
          });
    },[messages])
    
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
                <input disabled={isDisabled || editedMessage.id !== message.id}  type="text"  onChange={(e) => setEditedTitle({title: e.target.value })}  placeholder={message.title} />
                <input disabled={isDisabled || editedMessage.id !== message.id} type="text"  onChange={(e) => setEditedText({ text: e.target.value })} placeholder={message.text}/>
                {isDisabled ? (
            <button onClick={() => handleEdit(message)}>Edit</button>
          ) : (
            <button onClick={updateMessage}>Update</button>
          )}
            </div>
            ))}
            </div>
            </div>
    )
}


export default Messages