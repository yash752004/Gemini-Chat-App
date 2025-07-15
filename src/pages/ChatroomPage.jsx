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
import { Send, Image, ContentCopy } from "@mui/icons-material";
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!text && !image) return;

    const inputText = text;

    
    // Delay to let React render the typing indicator
    setTimeout(() => {
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
      
      setIsTyping(true); // Show typing indicator
      setTimeout(() => {
        const aiMessage = {
          id: uuidv4(),
          sender: "ai",
          text: generateFakeReply(inputText),
          timestamp: new Date().toISOString(),
        };
        dispatch(addMessage({ chatroomId: id, message: aiMessage }));

        // Small delay before hiding typing indicator
        setTimeout(() => {
          setIsTyping(false);
        }, 300);
      }, 1200);
    }, 100); // Small delay to show typing first
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
    const value = msg.text || msg.image || "";
    navigator.clipboard.writeText(value);
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



        {/* Chat Area */}
        <Box
          flex={1}
          overflow="auto"
          p={2}
          display="flex"
          flexDirection="column"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >


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
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {msg.image && (
                <Box
                  component="img"
                  src={msg.image}
                  alt="uploaded"
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              )}


              {msg.text && (
                <Typography variant="body2" whiteSpace="pre-wrap">
                  {msg.text}
                </Typography>
              )}

              {/* Bottom area: timestamp + copy */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={0.5}
              >
                <Typography variant="caption" sx={{ color: "grey.800" }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>

                <Tooltip title="Click to copy" arrow>
                  <ContentCopy
                    sx={{
                      fontSize: 16,
                      opacity: 0.5,
                    }}
                    onClick={() => copyText(msg)}
                  />
                </Tooltip>
              </Box>
            </Box>
          ))}

          {isTyping && (
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Avatar>G</Avatar>
              <Typography variant="body2" fontStyle="italic">
                Gemini is typing...
              </Typography>
            </Box>
          )}

          {loadingMore && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={20} />
            </Box>
          )}

          <div ref={bottomRef} />
        </Box>



        {image && (
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            px={2}
            pt={1}
            pb={0}
          >
            <Box
              component="img"
              src={image}
              alt="preview"
              sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                border: "1px solid #ccc",
              }}
            />
            <Button
              onClick={() => setImage(null)}
              size="small"
              sx={{ ml: 2 }}
              color="error"
            >
              Remove
            </Button>
          </Box>
        )}



        {/* Input */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            // setIsTyping(true);
            handleSend();
          }}
          display="flex"
          alignItems="center"
          p={2}
          gap={1}
          position="sticky"
          bottom={0}
          bgcolor="background.paper"
          zIndex={1}
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
