import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, TableFooter, TablePagination, TableHead, IconButton, Grid, Tooltip } from "@mui/material";
import TablePaginationActions from "./../../../components/TablePaginationActions/index";
import { formatDateTime } from "../../../utils/helper.js";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "./../../../apis/user";

const User = () => {
  const { data } = useQuery(["getUserList"], () => getUserList());
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <React.Fragment>
      <div className="admin-header">
        <div>
          <h3>User</h3>
        </div>
      </div>
      <Grid container spacing={3}>
        <TableContainer>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row) => (
                <TableRow className="tableRow" key={row.id}>
                  <TableCell className="novel-title" component="th" scope="row">
                    <img src={row.photo} alt="" /> {row.email}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{formatDateTime(row.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  // colSpan={3}
                  count={data?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </React.Fragment>
  );
};

export default User;
