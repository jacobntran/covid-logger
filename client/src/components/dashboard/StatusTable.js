import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '22rem',
    backgroundColor: theme.palette.background.main,
    color: theme.palette.secondary.main,
    overflow: 'auto',
  },
  header: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const StatusTable = ({ tests }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label='simple table' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>Status</TableCell>
            <TableCell align='right' className={classes.header}>
              Location
            </TableCell>
            <TableCell align='right' className={classes.header}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.body}>
          {tests.map((test) => (
            <TableRow key={test._id}>
              <TableCell component='th' scope='row'>
                {test.status}
              </TableCell>
              <TableCell align='right'>{test.location}</TableCell>
              <TableCell align='right'>
                {new Date(test.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    tests: state.user.user.tests,
  };
};

export default connect(mapStateToProps)(StatusTable);
