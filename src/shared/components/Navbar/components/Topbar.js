
import React, { useState } from 'react'

// Styles
import './style/topbar.css'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Popover, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
//Icons
import { ExitToApp, AccountCircle, Menu } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    avatarColor: {
        color: '#fff',
        backgroundColor: '#333747'

    },
}));


const Topbar = ({parentCb}) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [ pushHamburguer, setPushHamburguer] = useState(true);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
      };
    
      const handleClickAway = () => {
        setOpen(false);
        setAnchorEl(null);
      };

      const toggleSideBar = () => {
          setPushHamburguer(!pushHamburguer)
          parentCb(!pushHamburguer)
      }

      const id = open ? 'simple-popover' : undefined;

    return(
        <div className="container-top">

            <div className="hambuguer" style={pushHamburguer ? {marginLeft: '210px'} : {marginLeft: '20px'}}>
                <button onClick={toggleSideBar} style={{border: 'none', backgroundColor: 'white'}}>
                        <Menu />
                </button>
            </div>
                
            <div className="avatar-div">
                <button onClick={handleClick} style={{border: 'none', backgroundColor: 'white'}}>

                    <Avatar className={classes.avatarColor}>PM</Avatar>

                </button>
            
                {open ? (
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClickAway}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        >
                        <List component="nav" >
                            <ListItem button>

                                <ListItemIcon >
                                    <AccountCircle />
                                </ListItemIcon>

                                <ListItemText primary="Perfil" />
                            </ListItem>

                            <ListItem button>

                                <ListItemIcon>
                                    <ExitToApp />
                                </ListItemIcon>

                                <ListItemText primary="Sair" />
                            </ListItem>
                        </List>
                        
                    </Popover>
                ) : null}
            </div>

                
            

        </div>
    )
}


export default Topbar;