import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, TableFooter, TablePagination, Paper, TableHead, IconButton } from "@mui/material";
import { deleteNovel, getNovelListByUser } from "../../../apis/novel.js";
import Empty from "../Empty/index.js";
import TablePaginationActions from "./../../../components/TablePaginationActions/index";
import { NavLink } from "react-router-dom";
import { MdAdd, MdArrowBack, MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { formatDateTime } from "../../../utils/helper.js";

const List = ({ listNovel }) => {
  const queryClient = useQueryClient();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const deletMutation = useMutation(deleteNovel, {
    onSuccess: () => {
      queryClient.invalidateQueries("myNovelDetail");
    }
  });

  const handleDelete = async (id) => {
    await deletMutation.mutateAsync({ id: id });
  };

  return (
    <div className="list-novel">
      <div className="main-header">
        <div></div>
        <div className="action">
          <NavLink to="/upload/create" className="create">
            <MdAdd /> Create A Novel
          </NavLink>
        </div>
      </div>
      <TableContainer>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Chapter</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? listNovel?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : listNovel)?.map((row) => (
              <TableRow className="tableRow" key={row.id}>
                <TableCell className="novel-title" component="th" scope="row">
                  <img src={row.image_url} alt="" /> {row.title}
                </TableCell>
                <TableCell>{row.rating}</TableCell>
                <TableCell>{row.views}</TableCell>
                <TableCell>{row.chapters}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{formatDateTime(row.created_at)}</TableCell>
                <TableCell>{formatDateTime(row.updated_at)}</TableCell>
                <TableCell className="explore" align="right">
                  <NavLink to={`/upload/view/${row.id}`}>Explore</NavLink>
                  <IconButton onClick={() => handleDelete(row.id)} className="delete">
                    <MdDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                // colSpan={3}
                count={listNovel?.length || 0}
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
  );
};

const MyNovel = () => {
  const { data: listNovel, isLoading } = useQuery(["myNovels"], getNovelListByUser);

  return <React.Fragment>{!isLoading && listNovel.length > 0 ? <List listNovel={listNovel} /> : <Empty />}</React.Fragment>;
};

export default MyNovel;
