import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Avatar,
//   Paper,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { ArrowBack, Send, Image, ContentCopy } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, loadDummyMessages } from "../features/chat/chatSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "../layouts/MainLayout";

const ChatroomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages[id] || []);
  const chatroom = useSelector((state) =>
    state.chat.chatrooms.find((room) => room.id === id)
  );

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const bottomRef = useRef();
  const scrollContainerRef = useRef();

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text && !image) return;

    const userMessage = {
      id: uuidv4(),
      sender: "user",
      text,
      image,
      timestamp: new Date().toISOString(),
    };
    dispatch(addMessage({ chatroomId: id, message: userMessage }));

    setText("");
    setImage(null);

    setIsTyping(true);
    setTimeout(() => {
      const aiMessage = {
        id: uuidv4(),
        sender: "ai",
        text: generateFakeReply(text),
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage({ chatroomId: id, message: aiMessage }));
      setIsTyping(false);
    }, 1200 + Math.random() * 1000);

    toast.success("Message sent");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const loadMoreMessages = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const dummyMessages = Array.from({ length: 20 }).map(() => ({
        id: uuidv4(),
        sender: "ai",
        text: "Previous message from AI.",
        timestamp: new Date().toISOString(),
      }));
      dispatch(loadDummyMessages({ chatroomId: id, messages: dummyMessages }));
      setLoadingMore(false);
    }, 1000);
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && !loadingMore) {
      loadMoreMessages();
    }
  };

  const copyText = (msg) => {
    navigator.clipboard.writeText(msg.text || "");
    toast.info("Copied to clipboard");
  };

  if (!chatroom) {
    return (
      <Box p={4}>
        <Typography>Chatroom not found</Typography>
        <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
      </Box>
    );
  }

  return (
    <MainLayout>
    <Box height="100vh" display="flex" flexDirection="column">
     
      <Box
        display="flex"
        alignItems="center"
        p={2}
        borderBottom="1px solid #ccc"
        gap={2}
      >
        <IconButton onClick={() => navigate("/dashboard")}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">{chatroom.title}</Typography>
      </Box>

      {/* Chat Area */}
      <Box
        flex={1}
        overflow="auto"
        p={2}
        display="flex"
        flexDirection="column-reverse"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <div ref={bottomRef} />
        {isTyping && (
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Avatar>G</Avatar>
            <Typography variant="body2" fontStyle="italic">
              Gemini is typing...
            </Typography>
          </Box>
        )}

        {messages.map((msg) => (
          <Box
            key={msg.id}
            alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
            maxWidth="80%"
            my={1}
            px={2}
            py={1}
            borderRadius={2}
            bgcolor={msg.sender === "user" ? "primary.main" : "grey.300"}
            color={msg.sender === "user" ? "#fff" : "#000"}
            position="relative"
            sx={{ cursor: "pointer" }}
            onClick={() => copyText(msg)}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="uploaded"
                style={{
                  maxWidth: "100%",
                  borderRadius: 8,
                  marginBottom: msg.text ? 8 : 0,
                }}
              />
            )}
            {msg.text && <Typography variant="body2">{msg.text}</Typography>}
            <Tooltip title="Click to copy" arrow>
              <ContentCopy
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  fontSize: 16,
                  opacity: 0.5,
                }}
              />
            </Tooltip>
          </Box>
        ))}

        {loadingMore && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress size={20} />
          </Box>
        )}
      </Box>

      {/* Input */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        display="flex"
        alignItems="center"
        p={2}
        gap={1}
        borderTop="1px solid #ccc"
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton component="label">
          <Image />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </IconButton>
        <Button variant="contained" type="submit">
          <Send />
        </Button>
      </Box>
    </Box>
    </MainLayout>
  );
};

const generateFakeReply = (text) => {
  const replies = [
    "That's interesting!",
    "Tell me more about that.",
    "I'm not sure I understand.",
    "Can you explain further?",
    "Sounds great!",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
};

export default ChatroomPage;
