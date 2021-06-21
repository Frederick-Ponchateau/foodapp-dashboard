import React,{useContext,useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {FirebaseContext} from '../../components/Firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const DeleteButton = ({id}) => {
    const {queryOneMenu} = useContext(FirebaseContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const deleteMenu = async ()=>{
        console.log(id,"id")
       await queryOneMenu(id).delete();
      const menu = await queryOneMenu(id).get()
       
    }
    return (
        <div>
            <IconButton aria-label="delete" color="secondary" onClick={handleClickOpen} 
            >
                <DeleteIcon  fontSize="large"/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
             >
                <DialogTitle id="alert-dialog-title">{"Supression"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Confirmez-Vous la supression ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Non
                </Button>
                <Button onClick={deleteMenu} color="primary" autoFocus>
                    Oui
                </Button>
                </DialogActions>
            </Dialog>
      </div>
       
    )
}

export default DeleteButton
