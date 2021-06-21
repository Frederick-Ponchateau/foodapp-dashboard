import React, {useContext,useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { makeStyles } from '@material-ui/core/styles';
import {FirebaseContext} from '../../components/Firebase';
import {useSelector,useDispatch} from 'react-redux'; /****** Lire mon reducer ******/
import menu, { affMenu } from '../../redux/actions/menu';





const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));


 const EditModal =()=> {

    let id="";
    let name = "";
    let position = "";
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [valueName, setValueName] = useState(name)
    const [valuePosition, setValuePosition] = useState(position)

    const {queryOneMenu,queryMenu}= useContext(FirebaseContext);

    const {menu:{affModalMenu, data}}= useSelector(state => state); /***** lire les données de mon reducers destructuré  *****/
    console.log(affModalMenu ,data);
    if(data !== null){
      id =data.id;
      name =data.name;
      position =data.position;
    }

    const dispatchMenu = useDispatch();

    
    const onChangeName = (e) =>{
      
      (e.target.value != undefined) && setValueName(e.target.value);    
    }
    const onChangePosition = (e) =>{
      //console.log(e)

      (e.target.value != undefined) && setValuePosition(e.target.value)
    }
    const save = ()=>{
      if(data!= null){
        queryOneMenu(id).update({
              name: valueName,
              position: parseInt( valuePosition)
          })
      }else{
        queryMenu().add({
          image:'nc',
          name: valueName,
          position: parseInt( valuePosition)
      })
    }
       handleClose();
        // console.log("id: ",id,"name",valueName,"position", valuePosition)
    }

    const handleClickOpen = () => {
      //setOpen(true);
      dispatchMenu(affMenu({affModalMenu : !affModalMenu, data : null}))
    };

    const handleClose = () => {
      dispatchMenu(affMenu({affModalMenu : false, data : null}))
    };

    return (
      <div>
        <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            hidden={affModalMenu}
            onClick={handleClickOpen}
          
            open={false}
            direction={"up"}
          />
        <Dialog open={affModalMenu} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Ajouter un Menu</DialogTitle>
          <DialogContent>
            <DialogContentText>
            <TextField  id="name" 
                        label="Nom du Menu" 
                        variant="outlined" 
                        defaultValue={name}
                        onChange={onChangeName}
                        style={{marginRight:10}}/>
            </DialogContentText>
            <TextField  id="position" 
                        label="Position" 
                        variant="outlined" 
                        defaultValue={position}
                        type="number"
                        onChange={onChangePosition}
                        />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={save} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
export default EditModal
