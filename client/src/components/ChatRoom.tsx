import React from 'react';
import {List, ListItem, ListItemText, Typography, Divider, Paper, Avatar, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles({
    root: {
        height: '70vh',
        overflowY: 'scroll',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    },
});

interface Props {
    messages: any[];
}

const ChatRoom: React.FC<Props> = ({ messages }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <List>
                {messages.map((msg, idx) => (
                    <React.Fragment key={idx}>
                        <ListItem alignItems="flex-start">
                            <Avatar style={{ backgroundColor: green[500], marginRight: '8px' }}>{msg.from[0]}</Avatar>
                            <ListItemText
                                style={{margin: 0}}
                                primary={
                                    <Typography variant="h6">{msg.from}</Typography>
                                }
                                secondary={
                                    <Box style={{display: 'grid'}}>
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            {msg.text}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            {new Date(msg.createdAt).toLocaleTimeString()}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                        {idx !== messages.length - 1 && <Divider variant="inset" />}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
}

export default ChatRoom;
