import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getAllNovel, getNovelByStatus, updateNovel } from "./../../../apis/novel";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableFooter,
  TablePagination,
  TableHead,
  IconButton,
  Grid,
  Tooltip,
  Box,
  Typography,
  Tabs,
  Tab
} from "@mui/material";
import TablePaginationActions from "./../../../components/TablePaginationActions/index";
import { formatDateTime } from "../../../utils/helper.js";
import { MdDelete, MdDone } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { PropTypes } from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const Novel = () => {
  const queryClient = useQueryClient();
  const { data: listNovel } = useQuery(["getNovelByStatus", "draft"], () => getNovelByStatus("draft"));
  const { data: allNovel } = useQuery(["getAllNovel"], () => getAllNovel());
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const setStatusMutation = useMutation(updateNovel, {
    onSuccess: () => {
      queryClient.invalidateQueries("getNovelByStatus");
    }
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(0);
  };

  const handleClick = (id, status) => {
    setStatusMutation.mutate({ id: id, data: { status: status } });
  };

  return (
    <React.Fragment>
      <div className="admin-header">
        <div>
          <h3>Novel</h3>
        </div>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Draft" {...a11yProps(0)} />
          <Tab label="All Novel" {...a11yProps(1)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Chapter</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0 ? listNovel?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : listNovel)?.map((row) => (
                  <TableRow className="tableRow" key={row.id}>
                    <TableCell className="novel-title" component="th" scope="row">
                      <img src={row.image_url} alt="" /> {row.title}
                    </TableCell>
                    <TableCell>{row.chapters}</TableCell>
                    <TableCell>{formatDateTime(row.created_at)}</TableCell>
                    <TableCell className="action" align="right">
                      <Tooltip title="Accept">
                        <button className="accept" onClick={(e) => handleClick(row.id, "new")}>
                          <MdDone />
                        </button>
                      </Tooltip>
                      <Tooltip title="Preview">
                        <button className="preview">
                          <VscPreview />
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <button className="delete" onClick={(e) => handleClick(row.id, "reject")}>
                          <MdDelete />
                        </button>
                      </Tooltip>
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
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Chapter</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0 ? allNovel?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : allNovel)?.map((row) => (
                  <TableRow className="tableRow" key={row.id}>
                    <TableCell className="novel-title" component="th" scope="row">
                      <img src={row.image_url} alt="" /> {row.title}
                    </TableCell>
                    <TableCell>{row.chapters}</TableCell>
                    <TableCell>{formatDateTime(row.created_at)}</TableCell>
                    <TableCell className="action" align="right">
                      <Tooltip title="Preview">
                        <button className="preview">
                          <VscPreview />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    // colSpan={3}
                    count={allNovel?.length || 0}
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
      </TabPanel>
    </React.Fragment>
  );
};

export default Novel;
