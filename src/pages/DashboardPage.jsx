import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Paper,
  InputAdornment,
} from "@mui/material";
import {
  Add,
  Delete,
  DarkMode,
  LightMode,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createChatroom, deleteChatroom } from "../features/chat/chatSlice";
import { toggleTheme } from "../features/ui/uiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import MainLayout from "../layouts/MainLayout";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatrooms = useSelector((state) => state.chat.chatrooms);
  const themeMode = useSelector((state) => state.ui.themeMode);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const filteredChatrooms = useMemo(() => {
    return chatrooms.filter((room) =>
      room.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [chatrooms, search]);

  const handleCreate = () => {
    if (title.trim().length < 3) {
      toast.error("Chatroom title too short");
      return;
    }
    dispatch(createChatroom(title.trim()));
    toast.success("Chatroom created");
    setTitle("");
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this chatroom?")) {
      dispatch(deleteChatroom(id));
      toast.info("Chatroom deleted");
    }
  };

  const handleSearch = debounce((value) => {
    setSearch(value);
  }, 300);

  return (
     <MainLayout>
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Your Chatrooms</Typography>
          <Box>
            <Tooltip title="Toggle Theme">
              <IconButton onClick={() => dispatch(toggleTheme())}>
                {themeMode === "light" ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Create Chatroom">
              <IconButton onClick={() => setOpen(true)}>
                <Add />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <TextField
          fullWidth
          placeholder="Search chatrooms"
          variant="outlined"
          margin="normal"
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List dense>
          {filteredChatrooms.length === 0 ? (
            <Typography sx={{ mt: 2 }} color="text.secondary">
              No chatrooms found.
            </Typography>
          ) : (
            filteredChatrooms.map((room) => (
              <ListItem
                button
                key={room.id}
                onClick={() => navigate(`/chat/${room.id}`)}
              >
                <ListItemText
                  primary={room.title}
                  secondary={new Date(room.createdAt).toLocaleString()}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Delete">
                    <IconButton edge="end" onClick={() => handleDelete(room.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Chatroom</DialogTitle>
        <DialogContent>
          <TextField
            label="Chatroom Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </MainLayout>
  );
};

export default DashboardPage;
