import React from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNovelDetail } from "./../../../apis/novel";
import { MdAdd, MdArrowBack, MdOutlineSettings } from "react-icons/md";
import { Table, TableBody, TableCell, TableContainer, TableRow, TableFooter, TablePagination, TableHead, IconButton } from "@mui/material";
import TablePaginationActions from "./../../../components/TablePaginationActions/index";
import ChapterModal from "./../ChapterModal/index";
import { getChapterByNovelId } from "../../../apis/chapter.js";
import { formatDateTime } from "../../../utils/helper.js";

const MyNovelDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [selectedChapter, setSelectedChapter] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data } = useQuery(["myNovelDetail", id], () => getNovelDetail(id));
  const { data: chapterList } = useQuery(["chapterList", id], () => getChapterByNovelId(id));
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickChapter = async (chapter) => {
    setSelectedChapter(chapter);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedChapter(null);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ChapterModal id={id} open={open} handleClose={handleCloseModal} chapter={selectedChapter} />
      <div className="detail-container">
        <div className="main-header">
          <IconButton onClick={history.goBack}>
            <MdArrowBack />
          </IconButton>
          <div className="action">
            <NavLink to={`/upload/edit/${id}`} className="create">
              <MdOutlineSettings />
            </NavLink>
            <button className="create chapter" onClick={(e) => setOpen(true)}>
              <MdAdd /> Create A Chapter
            </button>
          </div>
        </div>
        <div className="information">
          <div className="cover">
            <img src={data?.image_url} alt="cover" />
          </div>
          <div className="info">
            <div className="title">{data?.title}</div>
            <div className="author">BY {data?.created_by}</div>
            <div className="description">{data?.description}</div>
            <div className="more">
              <div>
                <span>status</span>
                <strong>New</strong>
                <small>{data?.chapters} Chapters</small>
              </div>
              <div>
                <span>content editor</span>
                <strong>Author Support</strong>
              </div>
              <div>
                <span>premium</span>
                <strong>Uncontracted</strong>
              </div>
              <div>
                <span>side story</span>
                <strong>Not supported yet</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="chapters">
          <div className="title">Chapters</div>
          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Created at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0 ? chapterList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : chapterList)?.map((row) => (
                  <TableRow className="tableRow cursor" key={row.id} onClick={(e) => handleClickChapter(row)}>
                    <TableCell className="novel-title" component="th" scope="row">
                      Chapter {row.chapter_number} - {row.title}
                    </TableCell>
                    <TableCell align="right">{formatDateTime(row.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    count={chapterList?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyNovelDetail;
