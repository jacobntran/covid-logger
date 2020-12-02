import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Typography, Tooltip } from '@material-ui/core';

import { addMessage } from '../../actions/events';

const useStyles = makeStyles((theme) => ({
  chat: {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(1),
    overflow: 'auto',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    flex: '0 1 auto',
    padding: '0.5rem',
  },
  currentUserMessage: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    alignSelf: 'flex-end',
    marginBottom: '5px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  otherUserMessage: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(1),
    alignSelf: 'flex-start',
    marginBottom: '5px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  messageInput: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const AlwaysScrollToBottom = () => {
  const elementRef = React.useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const EventChat = ({
  currentEvent: { _id, chat },
  user,
  addMessage,
  loading,
  socket,
}) => {
  const classes = useStyles();
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    socket.on('new message', (message) => addMessage(message));
  }, [addMessage, socket]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newMessage = {
      authorId: user._id,
      authorName: user.name,
      text: message,
    };

    try {
      const response = await axios.post(
        `/api/events/${_id}/chat/add`,
        newMessage
      );

      socket.emit('new message', response.data);
    } catch (error) {
      console.log(error);
    }

    setMessage('');
  };

  const parseDate = (date) => {
    const newDate = new Date(date);

    return `${newDate.toLocaleDateString()}, ${newDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  return (
    <Paper className={classes.chat}>
      <Paper className={classes.header}>
        <Typography variant='h5' style={{ color: 'white' }}>
          Chat
        </Typography>
      </Paper>
      <div className={classes.messageContainer}>
        {chat.length > 0 && !loading
          ? chat.map((message) => {
              return (
                <Tooltip title={parseDate(message.date)} key={message._id}>
                  <Paper
                    className={
                      message.authorId === sessionStorage.getItem('user id')
                        ? classes.currentUserMessage
                        : classes.otherUserMessage
                    }
                  >
                    <Typography variant='body1' style={{ color: 'white' }}>
                      {message.text}
                      <br />- {message.authorName}
                    </Typography>
                  </Paper>
                </Tooltip>
              );
            })
          : null}
        <AlwaysScrollToBottom />
      </div>
      <form>
        <TextField
          value={message}
          label='Message'
          variant='filled'
          multiline
          fullWidth
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleFormSubmit(e);
            }
          }}
          className={classes.messageInput}
        />
      </form>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    currentEvent: state.event.event,
    user: state.user.user,
    loading: state.event.loading,
  };
};

export default connect(mapStateToProps, { addMessage })(EventChat);
