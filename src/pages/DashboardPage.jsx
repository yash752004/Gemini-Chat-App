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
  Search as SearchIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createChatroom, deleteChatroom } from "../features/chat/chatSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import MainLayout from "../layouts/MainLayout";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";


const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatrooms = useSelector((state) => state.chat.chatrooms);
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
      toast.error("Chatroom title too short min 3 characters");
      return;
    }
    dispatch(createChatroom(title.trim()));
    toast.success("Chatroom created");
    setTitle("");
    setOpen(false);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatroomToDelete, setChatroomToDelete] = useState(null);

  // Open dialog on delete click
  const openDeleteDialog = (id) => {
    setChatroomToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteChatroom(chatroomToDelete));
    toast.info("Chatroom deleted");
    setDeleteDialogOpen(false);
    setChatroomToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setChatroomToDelete(null);
  };

  const handleSearch = debounce((value) => {
    setSearch(value);
  }, 300);

  return (
    <MainLayout>
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Chatrooms</Typography>
            <Box>
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
              <Box textAlign="center" py={6} color="text.secondary">
                <ChatBubbleOutlineIcon sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No chatrooms found
                </Typography>
                {/* <Typography variant="body2" sx={{ mb: 2 }}>
                  Click the <Add fontSize="small" /> icon above to create your first chatroom.
                </Typography> */}
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => setOpen(true)}
                >
                  Create Chatroom
                </Button>
              </Box>
            ) : (
              filteredChatrooms.map((room) => (
                <ListItem
                  button
                  key={room.id}
                  onClick={() => {
                    navigate(`/chat/${room.id}`);
                    sessionStorage.setItem("chatroomName", room.title);
                  }}                >
                  <ListItemText
                    primary={room.title}
                    secondary={new Date(room.createdAt).toLocaleString()}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Delete">
                      <IconButton edge="end" onClick={() =>   openDeleteDialog(room.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </Paper>


        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="delete-confirmation-dialog"
        >
          <DialogTitle id="delete-confirmation-dialog">
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this chatroom? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Create New Chatroom</DialogTitle>
          <DialogContent>
            <TextField
              label="Chatroom Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              sx={{ mt: 1 }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreate();
                }
              }}
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
