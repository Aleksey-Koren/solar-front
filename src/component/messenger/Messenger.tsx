import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab/Fab';
import style from './Messenger.module.css'


const Messenger = () => {

    return (
        <div className={style.div}>
            <Grid container component={Paper} className={style.chatSection}>
                <Grid item xs={3} className={style.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"/>
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider/>
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth/>
                    </Grid>
                    <Divider/>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"/>
                            </ListItemIcon>
                            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                            <ListItemText secondary="online"></ListItemText>
                        </ListItem>
                        <ListItem button key="Alice">
                            <ListItemIcon>
                                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg"/>
                            </ListItemIcon>
                            <ListItemText primary="Alice">Alice</ListItemText>
                        </ListItem>
                        <ListItem button key="CindyBaker">
                            <ListItemIcon>
                                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg"/>
                            </ListItemIcon>
                            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Grid container direction={'column'} item xs={9}>
                    <Grid item className={style.messageArea}>
                        <List className={style.list}>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="2">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey, Iam Good! What about you ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:31"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="3">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="10:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?" style={{textAlign: 'right'}}></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30" style={{textAlign: 'right'}}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>

                        </List>
                        <Divider/>
                    </Grid>

                    <Grid item className={style.bottom_div}>
                        <Grid container className={style.bottom_div_div}>
                            <Grid item xs={11}>
                                <TextField label="Type Something" fullWidth className={style.text_field}/>
                            </Grid>

                            <Grid item xs={1}>
                                <Fab className={style.icon} size={"large"}><SendIcon/></Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Messenger;