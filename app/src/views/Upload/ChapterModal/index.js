import { Dialog, DialogActions, DialogContent, DialogTitle, Slide, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./ChapterModal.scss";
import { createChapter, updateChapter } from "./../../../apis/chapter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ChapterModal = (props) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.user);
  const { id: novel_id, open, handleClose, chapter } = props;
  const [title, setTitle] = React.useState("");
  const editorRef = React.useRef(null);

  const updateMutation = useMutation(updateChapter, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chapterList"]);
    }
  });

  const createMutation = useMutation(createChapter, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chapterList"]);
    }
  });

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  React.useEffect(() => {
    setTitle(chapter?.title || "");
  }, [chapter]);

  const handleClick = async () => {
    const content = editorRef.current.getContent();
    const user_name = user?.name || "Anonymous";
    if (chapter?.id) {
      await updateMutation.mutateAsync({ id: chapter.id, data: { title, content, updated_by: user_name } });
      // await updateChapter(chapter.id, { title, content });
    } else {
      // await createChapter({ novel_id, title, content });
      await createMutation.mutateAsync({ data: { novel_id, title, content, created_by: user_name } });
    }
    handleClose();
  };

  return (
    <Grid container>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} className="chapter-dialog">
        <DialogTitle id="alert-dialog-slide-title">{chapter?.id ? "Update Chapter" : "Create New Chapter"}</DialogTitle>
        <DialogContent>
          <TextField size="medium" name="title" label="Title" variant="outlined" fullWidth value={title} onChange={handleChange} className="mb-3 mt-2" />
          <Editor
            apiKey="yqmoow9n6xokvi941l4vglnv42alvn3fv3tqums01cfh2n91"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={chapter?.content || ""}
            init={{
              height: 500,
              menubar: false,
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
          <Button onClick={handleClick} color="primary" variant="outlined">
            {chapter?.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ChapterModal;
