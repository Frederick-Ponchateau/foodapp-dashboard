import React, {useContext,useState,useEffect} from 'react';
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
import { affMenu } from '../../redux/actions/menu';
import { affProduit } from 'redux/actions/produit';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';




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


 const EditModal =() => {

    let id="";
    let name = "";
    let price = "";
    let description ="";
 
    const classes = useStyles();
    const [valueName, setValueName] = useState(name)
    const [valuePrice, setValuePrice] = useState(price)
    const [valueCategorie, setValueCategorie] = useState("");
    const [dataMenu, setDataMenu] = useState(null);
    const [age, setAge] = useState('');
    const [open, setOpen] = useState(false);
    
    
    const {queryOneProduit,queryProduit,menus}= useContext(FirebaseContext);
    //console.log(menus)
    
    
    const {produit:{affModalProduit, data}}= useSelector(state => state); /***** lire les données de mon reducers destructuré  *****/
    useEffect(() => {
      const getMenu =() => {menus().get().then(snapshot => {
        let dataMenus =  snapshot.docs.map(menu=>({id:menu.id,...menu.data()}))
        console.log(dataMenus)
        setDataMenu(dataMenus)
     })}
      return () => {
        getMenu()
      }
    }, [])
    // console.log(affModalMenu ,data);
    if(data !== null){
      id =data.id;
      name =data.name;
      price =data.price
      description=data.description;
    }

    const dispatchProduit = useDispatch();

    
    const onChangeName = (e) =>{
      
      (e.target.value != undefined) && setValueName(e.target.value);    
    }
   
    const onChangePrice = (e)=>{
      
      (e.target.value!= undefined)&&setValuePrice(e.target.value);
  }

  const onChangeDescription = (e)=>{
      (e.target.value != undefined)&&setValueCategorie(e.target.value);
  }
    const save = ()=>{
      if(data!= null){
        queryOneProduit(id).update({
          dateAdd: new Date(),
          name: valueName,
          price: parseInt( valuePrice),
          description:valueCategorie
        })
      }else{
        queryProduit().add({
          dateAdd: new Date(),
          image:'nc',
          name: valueName,
          price: parseInt( valuePrice),
          description:valueCategorie,

      })
    }
       handleClose();
        // console.log("id: ",id,"name",valueName,"position", valuePrice)
    }

    const handleClickOpen = () => {
      //setOpen(true);
      dispatchProduit(affProduit({affModalProduit : !affModalProduit, data : null}))
    };
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const handleClose = () => {
      dispatchProduit(affProduit({affModalProduit : false, data : null}))
    };
    const onChangeSelect = (event) => {
      setAge(event.target.value);
    };
  
    const handleCloseSelect = () => {
      setOpen(false);
    };
  
    const handleOpenSelect = () => {
      setOpen(true);
    };

    return (
      <div>
        <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            hidden={affModalProduit}
            onClick={handleClickOpen}
          
            open={false}
            direction={"up"}
          />
        <Dialog open={affModalProduit} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Ajouter un Menu</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField  id="name" 
                          label="Nom du Menu" 
                          variant="outlined" 
                          defaultValue={name}
                          onChange={onChangeName}
                          fullWidth
                          style={{marginRight:10}}/>
            </DialogContentText>
            
            <hr/>
            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleCloseSelect}
                            onOpen={handleOpenSelect}
                            value={dataMenu}
                            onChange={onChangeSelect}
                            fullWidth
                          >
                    { 
                    (dataMenu!= null)&& dataMenu.map( item=> ( 
                    <MenuItem key={item.id} value={item.id}>
                    <em>{item.name}</em>
                  </MenuItem>
                  ))
                  }
                
                  
                
            </Select>
            <hr/>
            <br/>

            <DialogContentText>
              <TextField  id="price" 
                          label="Prix" 
                          variant="outlined" 
                          type="number"
                          fullWidth
                          onChange={onChangePrice}
                          defaultValue={price}/>
           </DialogContentText>
            <DialogContentText>
              <TextField  id="description" 
                          label="Description"
                          fullWidth 
                          variant="outlined" 
                          onChange={onChangeDescription}
                          defaultValue={description}/>
            </DialogContentText>
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
