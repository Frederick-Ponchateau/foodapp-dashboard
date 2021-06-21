import React,{useContext,useState} from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import {FirebaseContext} from '../../components/Firebase';
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



const extensionOk = (extension)=>{
    switch (extension) {
        case "image/jpeg":
        case "image/jpg":
        case "image/png":
            return true       
            break;
    
        default:
            return false
            break;
    }
}
const affSnackbar = (enqueueSnackbar,msg)=>{
    enqueueSnackbar(msg, {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
}
const AddImage = ({id}) => {
    const {queryOneMenu,storage}= useContext(FirebaseContext);
    const { enqueueSnackbar } = useSnackbar()
    const [loadingImg, setloadingImg] = useState(false)

    const hiddenFileInput = React.useRef(null);

    const handleClick = event =>{
        hiddenFileInput.current.click();
    }
    const Add= e =>{
        console.log(e.target.files[0]);
        const imageAsFile = e.target.files[0];
        if(!extensionOk(imageAsFile.type)){
           affSnackbar(enqueueSnackbar,"bad file")
           return;

        }
        console.log('start of upload')
        setloadingImg(true)
        // async magic goes here...
        const folderImg =`/images/menu/${id}/`; // dossier de l'image
        const buckImg = storage.ref(`${folderImg}`).child(imageAsFile.name);
        const uploadTask = buckImg.put(imageAsFile)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed', 
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          
          console.log(snapShot)
        }, (err) => {
            affSnackbar(enqueueSnackbar,"error")
          //catches the errors
          console.log(err)
        }, () => {
            
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          buckImg.getDownloadURL()
           .then(async fireBaseUrl => {
              await queryOneMenu(id).update({image:fireBaseUrl})
              setTimeout(()=>setloadingImg(false),4000)
              affSnackbar(enqueueSnackbar,"is Ok")
               console.log(fireBaseUrl)
             //setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
           })
        })
    }
    return (
       loadingImg? <CircularProgress/> : 
       <div>
        <input type="file" ref={hiddenFileInput} style={{display:'none'}} onChange={Add} />
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClick}>
        <PhotoCamera fontSize="large"/>
        </IconButton>
     </div>
    )
}

export default AddImage
