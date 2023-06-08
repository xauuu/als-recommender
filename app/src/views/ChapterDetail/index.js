import React from "react";
import "./ChapterDetail.scss";
import Grid from "@mui/material/Grid";
import PopularSection from "./../Section/PopularSection";
import { NavLink, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineFormatListBulleted } from "react-icons/md";
import ShareSocial from "./../../components/ShareSocial/index";
import { addComment, getChapterDetail, getCommentByChapterId } from "./../../apis/chapter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parser from "html-react-parser";
import { formatDateTime } from "../../utils/helper.js";
import Loading from "./../../components/Loading/index";
import Switch from "../../components/Switch/index.js";
import { TextToSpeech } from "tts-react";
import ItemComment from "./../../components/ItemComment/index";
import { useSelector } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const ChapterDetail = () => {
  const queryClient = useQueryClient();

  const { novelId, chapterNumber } = useParams();
  const [chapterId, setChapterId] = React.useState("");
  const { data: chapterDetail, isLoading } = useQuery(["chapter", chapterNumber, novelId], () => getChapterDetail(chapterNumber, novelId), {
    onSuccess: (data) => {
      setChapterId(data.id);
    }
  });
  const { data: comments, isLoading: isLoadingComment } = useQuery(["comment", chapterId], () => getCommentByChapterId(chapterId), { enabled: !!chapterId });
  const [isSummary, setIsSummary] = React.useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");

  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment"]);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmmit = async () => {
    if (!isLoggedIn) return;
    if (!content) return;
    await addCommentMutation.mutateAsync({ data: { chapter_id: chapterId, user_id: user?.id, name: user?.name, photo: user?.photo, content: content } });
    handleClose();
  };

  return (
    <Grid container spacing={2}>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Write a Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            multiline
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            placeholder="Type your comment here. Please write your comment as detailed as you can."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Grid item lg={8} md={12}>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <div className="chapter-detail">
              <div className="title">
                <h1>
                  {chapterDetail?.novel_name} Chapter {chapterNumber}
                </h1>
                <h2>{chapterDetail?.title}</h2>
                <div>
                  Posted by {chapterDetail?.created_by}, {chapterDetail?.views} Views, Released on {formatDateTime(chapterDetail?.updated_at)}
                </div>
              </div>
              <div className="actions">
                {chapterDetail?.previous && (
                  <NavLink to={`./${chapterDetail?.previous.chapter_number}`} className="button pre">
                    <MdKeyboardArrowLeft />
                    <span>Prev</span>
                  </NavLink>
                )}
                <NavLink to={`/detail/${novelId}`} className="button allchapter">
                  <MdOutlineFormatListBulleted size={20} />
                  <span>All Chapter</span>
                </NavLink>
                {chapterDetail?.next && (
                  <NavLink to={`./${chapterDetail?.next.chapter_number}`} className="button next">
                    <span>Next</span>
                    <MdKeyboardArrowRight />
                  </NavLink>
                )}
                {/* {!isSummary && (
                  <span className="button play" onClick={togglePlayback}>
                    {playing ? <MdPauseCircle /> : <MdPlayCircle />}
                  </span>
                )} */}

                <button className="button options">
                  {/* <MdSettings />
                  <span>Options</span> */}
                  <Switch checked={isSummary} setChecked={setIsSummary} />
                </button>
              </div>
              <ShareSocial url={window.location.href} />
              <div className="content">
                {/* {isSummary ? Parser(chapterDetail?.summary || "Sorry, there is currently no summary for this chapter") : Parser(chapterDetail?.content)} */}
                {isSummary ? (
                  Parser(chapterDetail?.summary || "Sorry, there is currently no summary for this chapter")
                ) : (
                  <TextToSpeech markBackgroundColor="#366ad3" markColor="#fff" markTextAsSpoken position="topCenter" lang={chapterDetail?.lang || "en-AU"}>
                    {Parser(chapterDetail?.content)}
                  </TextToSpeech>
                )}
              </div>
              <div className="actions bottom">
                {chapterDetail?.previous && (
                  <NavLink to={`./${chapterDetail?.previous.chapter_number}`} className="button pre">
                    <MdKeyboardArrowLeft />
                    <span>Prev</span>
                  </NavLink>
                )}
                {chapterDetail?.next && (
                  <NavLink to={`./${chapterDetail?.next.chapter_number}`} className="button next">
                    <span>Next</span>
                    <MdKeyboardArrowRight />
                  </NavLink>
                )}
              </div>
            </div>
            <br />
            <div className="box comment">
              <h2>Comment</h2>
              <Button variant="contained" onClick={handleClickOpen}>
                Leave a Comment
              </Button>
              <div className="comment__content">
                {isLoggedIn ? (
                  comments?.map((comment) => <ItemComment comment={comment} />)
                ) : (
                  <div className="comment__content__nologin">
                    <h3>Leave a Reply</h3>
                    <div>You must be logged in to post a comment.</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Grid>
      <Grid item lg={4} xs={12}>
        <PopularSection />
      </Grid>
    </Grid>
  );
};

export default ChapterDetail;
