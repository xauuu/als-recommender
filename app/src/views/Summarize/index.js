import React, { useState } from "react";
import { Grid, Divider, IconButton, TextField, MenuItem, Slider } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { MdCopyAll } from "react-icons/md";
import "./Summarize.scss";
import { summarize } from "./../../apis/summarize";
import Highlight from "./../../components/TextHighLight/index";

const Summarize = () => {
  const [summaryData, setSummaryData] = useState({
    text: "",
    method: "textrank",
    sentences: 3,
    url: "",
    type: "text"
  });

  const [summary, setSummary] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSummaryData({ ...summaryData, [e.target.name]: e.target.value });
  };

  const handeInputChange = (e) => {
    setSummaryData({ ...summaryData, text: e.currentTarget.textContent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSummary("");
    setLoading(true);
    const res = await summarize(summaryData);
    setSummary(res);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  const countWords = (str) => {
    if (str?.length === 0) {
      return 0;
    } else {
      str = str?.replace(/(^\s*)|(\s*$)/gi, "");
      str = str?.replace(/[ ]{2,}/gi, " ");
      str = str?.replace(/\n /, "\n");
      return str?.split(" ").length;
    }
  };

  React.useEffect(() => {
    if (summaryData.text === "") {
      setSummary("");
    }
  }, [summaryData.text]);

  return (
    <Grid container className="summarize">
      <Grid container className="summarize__title" spacing={2}>
        <Grid item xs={3}>
          <h1>Summarize</h1>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth select size="small" name="type" value={summaryData.type} onChange={handleChange} variant="outlined" label="Type">
            <MenuItem value="text">Plain Text</MenuItem>
            <MenuItem value="url">URL</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth select size="small" name="method" value={summaryData.method} onChange={handleChange} variant="outlined" label="Algorithm">
            <MenuItem value="textrank">TextRank</MenuItem>
            <MenuItem value="frequency">Frequency</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <Slider
            value={summaryData.sentences}
            onChange={(e, newValue) => {
              setSummaryData({ ...summaryData, sentences: newValue });
            }}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
          />
        </Grid>
      </Grid>
      <Grid className="sum-container" container>
        <Grid item className="sum-content">
          <div className="summarize__input">
            {summaryData.type === "text" && <Highlight text={summaryData.text} highlight={summary} handeInputChange={handeInputChange} />}
            {summaryData.type === "url" && (
              <TextField fullWidth size="small" name="url" value={summaryData.url} onChange={handleChange} variant="outlined" label="URL" />
            )}
          </div>
        </Grid>
        <Divider className="divider" orientation="vertical" flexItem />
        <Grid className="sum-content">
          <div className="summarize__output">
            <div>
              {summary ? (
                summary
              ) : (
                <div>
                  <Skeleton animation="wave" height={25} style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={25} style={{ marginBottom: 6, width: "75%" }} />
                  <Skeleton animation="wave" height={25} style={{ marginBottom: 6, width: "50%" }} />
                </div>
              )}
            </div>
          </div>
        </Grid>
        <Grid container className="summarize__footer">
          <Grid item className="footer-content">
            {summaryData.text ? (
              <div className="words">{countWords(summaryData.text)} Words</div>
            ) : (
              <div className="upload">
                <label htmlFor="file-input">Upload</label>
                <input id="file-input" type="file" />
              </div>
            )}
            <button className="summary" onClick={handleSubmit}>
              {loading ? "Loading..." : "Summarize"}
            </button>
          </Grid>
          <Divider className="divider" orientation="vertical" flexItem />
          <Grid item className="footer-content">
            <div className="words">{countWords(summary)} Words</div>
            <IconButton onClick={handleCopy}>
              <MdCopyAll />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Summarize;
