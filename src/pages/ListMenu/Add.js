import React,{useContext,useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/SaveAlt';
import {FirebaseContext} from '../../components/Firebase';





const Add = () => {
    const {queryOneMenu}= useContext(FirebaseContext);
    const [valueName, setValueName] = useState("")
    const [valuePosition, setValuePosition] = useState("")
    const onChangeName = (e)=>{
        (e.target.value!= undefined)&&setValueName(e.target.value);
   
        
    }
    const onChangePosition = (e)=>{
      
        (e.target.value!= undefined)&&setValuePosition(e.target.value)
    }
    const save = ()=>{
        queryOneMenu().add({
            name: valueName,
            position: parseInt( valuePosition)
        })
        
    }
    return (
        <div>
            <TextField  id="name" 
                        label="Nom du Menu" 
                        variant="outlined" 
                        defaultValue={""}
                        onChange={onChangeName}
                        style={{marginRight:10}}/>

            <TextField  id="position" 
                        label="Position" 
                        variant="outlined" 
                        type="number"
                        onChange={onChangePosition}
                        defaultValue={""}/>
                         
            <IconButton aria-label="saveAlt"  onClick={save} 
            >
                <SaveIcon  fontSize="large"/>
            </IconButton>
        </div>
    )
}

export default Add
