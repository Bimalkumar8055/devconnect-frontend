import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(()=>{
    const fetchChat = async()=>{
      try {
        const response = await axios.get(BASE_URL + `/chats/${targetUserId}`,{withCredentials : true})
        console.log(response?.data);
        const chatData = response?.data?.data; // Corrected access

        if (!chatData || !chatData.participants) {
          console.error("Invalid chat data response:", response?.data);
          return;
        }
        const otherParticipant = chatData.participants.find(id => id !== userId); 
        const chats = chatData.messages.map(message => {
          const isCurrentUser = userId === message?.senderId?._id;
          return{
            sender : isCurrentUser ? "frontEnd" : "backEnd",
            name : message?.senderId?.firstName || "Unknown User",
            userId : message?.senderId?._id,
            targetUserId : otherParticipant,
            content : message?.content,
            time : message?.time,
            seen : message?.seen
          }
        })
        console.log(chats);
        setMessages(chats);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchChat()
  },[targetUserId,userId])

  useEffect(() => {
    if (!userId || !targetUserId) return;

    // Create socket connection
    const socketInstance = createSocketConnection();
    setSocket(socketInstance);

    // Join chat room
    socketInstance.emit("joinChat", { userId, targetUserId });

     // Listen for received messages
    socketInstance.on("messageReceived", (messageReceived) => {
      console.log(messageReceived);
      setMessages((prevMessages) => [
        ...prevMessages,
        messageReceived,
      ]);
    });

   // Cleanup socket connection
    return () => {
      socketInstance.disconnect();
    };
  }, [userId, targetUserId]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      sender: "frontEnd",
      name : user?.firstName || "Unknown User",
      userId,
      targetUserId,
      content: messageInput.trim(),
      time: new Date().toLocaleTimeString(),
      seen: false,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (socket) {
      socket.emit("sendMessage", newMessage);
    }

    setMessageInput(""); // Clear input field
  };

  return (
    <div className="w-full flex justify-center items-center">
      <section
        ref={chatContainerRef}
        className="max-w-3xl w-full h-[70vh] bg-gradient-to-r from-violet-100 to-pink-100 shadow-xl rounded-lg mt-10 p-4 overflow-y-scroll"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${msg.sender === "frontEnd" ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header">
              {msg.sender === "frontEnd" ? user.firstName : msg.name || "Backend"}
              <time className="text-xs ml-5">{msg.time}</time>
            </div>
            <div className="chat-bubble">{msg.content}</div>
            {msg.seen && msg.sender !== "frontEnd" && <div className="chat-footer">Seen</div>}
          </div>
        ))}
        <section className="flex gap-2 fixed bottom-32 w-full max-w-[46rem] px-4">
          <input
            type="text"
            name="chat"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="rounded bg-white text-black h-12 w-full px-4 shadow-md"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="text-md font-bold px-4 bg-green-400 rounded-md text-white shadow-md"
          >
            Send
          </button>
        </section>
      </section>
    </div>
  );
};

export default Chat;
