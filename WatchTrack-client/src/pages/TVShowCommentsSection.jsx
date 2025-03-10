import React, { useState, useEffect } from "react";
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
} from "@mantine/core";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";

const TVShowCommentsSection = ({ id, backendBaseUrl }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [processing, setProcessing] = useState(false);
  const token = localStorage.getItem("authToken");

  // get all comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/comments?tvShowId=${id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id, backendBaseUrl]);

  // Comment edit mode
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

      setComments((prevComments) =>
        prevComments.map((c) =>
          c._id === commentId ? { ...c, text: response.data.comment.text } : c
        )
      );
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
  const filteredComments = comments.filter(
    (comment) => comment.tvShowId === id
  );
  return (
    <>
      <Text size="30px" weight={700} mt="xl">
        Comments
      </Text>

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

export default TVShowCommentsSection;
