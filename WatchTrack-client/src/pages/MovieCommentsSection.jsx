import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  Group,
  Paper,
  Avatar,
  Button,
  Stack,
  Textarea,
  ScrollArea,
  TypographyStylesProvider,
  Loader,
  ActionIcon,
  Modal,
} from "@mantine/core";
import { Pencil, Trash, Plus } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const MovieCommentsSection = ({ movieId, backendBaseUrl }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const currentUserId = user._id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/comments?movieId=${movieId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [movieId, backendBaseUrl]);

  // Edit mode
  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditedText(comment.text);
  };

  // Edit comment
  const handleSaveEdit = async (commentId) => {
    if (!editedText.trim()) return;
    setProcessing(true);

    try {
      const response = await axios.put(
        `${backendBaseUrl}/comments/${commentId}`,
        { text: editedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedComments = [...comments];
      const index = updatedComments.findIndex((c) => c._id === commentId);
      if (index !== -1) {
        updatedComments[index].text = response.data.comment.text;
      }
      // console.log(response.data.comment);
      setComments(updatedComments);
      setEditingCommentId(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setProcessing(false);
    }
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    setProcessing(true);
    try {
      await axios.delete(`${backendBaseUrl}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setProcessing(false);
    }
  };

  // Add new comment
  const handleAddComment = async () => {
    if (!newCommentText.trim()) return;

    setProcessing(true);

    try {
      const response = await axios.post(
        `${backendBaseUrl}/comments`,
        { text: newCommentText, movieId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newComment = {
        ...response.data,
        user: {
          _id: currentUserId,
          username: user.username,
        },
      };

      setComments([newComment, ...comments]);
      setNewCommentText("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setProcessing(false);
    }
  };

  const filteredComments = comments.filter(
    (comment) => comment.movieId === movieId
  );

  return (
    <>
      <Text size="30px" weight={700} mt="xl">
        Comments
      </Text>

      <Button
        variant="outline"
        color="blue"
        onClick={() => setIsModalOpen(true)}
        mt="xl"
      >
        <Plus size={16} style={{ marginRight: 8 }} />
        Add Comment
      </Button>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add a Comment"
        size="lg"
      >
        <Textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write your comment here..."
          minRows={4}
        />
        <Group position="right" mt="md">
          <Button onClick={handleAddComment} disabled={processing}>
            Submit
          </Button>
        </Group>
      </Modal>

      {loading ? (
        <Loader mt="xl" size="lg" />
      ) : (
        <ScrollArea style={{ maxHeight: 400 }}>
          <Group direction="column" spacing="md" mt="xl">
            {filteredComments.length === 0 ? (
              <Text>No comments yet. Be the first to comment!</Text>
            ) : (
              filteredComments.map((comment) => (
                <Paper
                  key={comment._id}
                  withBorder
                  radius="md"
                  p="md"
                  className="comment"
                >
                  <Group position="apart">
                    <Group>
                      <Avatar
                        src={comment.user.avatar || ""}
                        alt={comment.user.username}
                        radius="xl"
                      />
                      <div>
                        <Text size="sm" weight={600}>
                          {comment.user.username}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {new Date(comment.createdAt).toLocaleString()}
                        </Text>
                      </div>
                    </Group>
                    <Group spacing="xs">
                      {currentUserId && comment.user._id === currentUserId && (
                        <>
                          <ActionIcon
                            size="sm"
                            color="blue"
                            variant="subtle"
                            onClick={() => handleEdit(comment)}
                            disabled={processing}
                          >
                            <Pencil size={16} />
                          </ActionIcon>
                          <ActionIcon
                            size="sm"
                            color="red"
                            variant="subtle"
                            onClick={() => handleDelete(comment._id)}
                            disabled={processing}
                          >
                            <Trash size={16} />
                          </ActionIcon>
                        </>
                      )}
                    </Group>
                  </Group>

                  {editingCommentId === comment._id ? (
                    <Stack mt="sm">
                      <Textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        autosize
                        minRows={2}
                      />
                      <Group spacing="xs">
                        <Button
                          size="xs"
                          onClick={() => handleSaveEdit(comment._id)}
                          disabled={processing}
                        >
                          Save
                        </Button>
                        <Button
                          size="xs"
                          color="gray"
                          onClick={() => setEditingCommentId(null)}
                        >
                          Cancel
                        </Button>
                      </Group>
                    </Stack>
                  ) : (
                    <TypographyStylesProvider className="comment-body">
                      <div
                        className="content"
                        dangerouslySetInnerHTML={{
                          __html: comment.text,
                        }}
                      />
                    </TypographyStylesProvider>
                  )}
                </Paper>
              ))
            )}
          </Group>
        </ScrollArea>
      )}
    </>
  );
};

export default MovieCommentsSection;
