import React,{useContext,useEffect,useState,Fragment} from 'react';
import Page,{ ListPage } from 'material-ui-shell/lib/containers/Page';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';

import { useIntl } from 'react-intl';
import {FirebaseContext} from '../../components/Firebase';
import DeleteButton from './deleteButton';
import AddImage from './addImage';
import Avatar from '@material-ui/core/Avatar';
//import Edit from './Edit';
import EditModal from './EditModal';
import { IconButton } from '@material-ui/core';
import { DescriptionOutlined } from '@material-ui/icons';

// import list from './data.json';
// import { IconButton } from '@material-ui/core';
// import { Add } from '@material-ui/icons';
import {useSelector,useDispatch} from 'react-redux'; /****** Lire mon reducer ******/
import  { affMenu } from '../../redux/actions/menu';

const fields = [
  {
    name: 'id',
    label: 'Id',
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'position',
    label: 'Position',
  },
  
]

const Row = ({ index, data }) => {
  const { id,name, position = '',image } = data
  
  const {menu:{affModalMenu}}= useSelector(state => state); /***** lire les données de mon reducers destructuré  *****/

  const dispatchMenu = useDispatch();
  const openEdit = () =>{

    
    dispatchMenu(affMenu({affModalMenu : !affModalMenu, data}))
    console.log(data);
  }
  return (
    <div key={`${id}${name}_${index}`} style={{marginTop:10,paddingTop:10}}>
      <ListItem alignItems="flex-start">
        {(image!=='nc' && image!== undefined)&& <Avatar alt={name} src={image} style={{marginLeft:15 ,marginRight:15}} />}
       
        <ListItemText  primary= {`${name} - ${position}`} />
        <IconButton aria-label="delete" onClick={openEdit}>
            <DescriptionOutlined fontSize="large"/>
        </IconButton>
        <AddImage id={id}/>

        <DeleteButton id={id}/>
      </ListItem>
      <Divider />
    </div>
    
  )
}

const InfoChargement = ({Message,Loading}) =>{
  const intl = useIntl()
 

  return (
    <Page pageTitle={intl.formatMessage({ id: 'Loading',defaultMessage:Message})}>
     
      {Loading? <CircularProgress />:
                <span>Pas de menu</span>   
      }
    </Page>
  )
}

const ListMenu = () => {
  const {menus} = useContext(FirebaseContext);
  const [listMenu, setlistMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)

    const unsubQuery = menus().onSnapshot(snapshot=>{   
      console.log("snapshot type",snapshot,snapshot.type)  
      let tempListMenu=[];
      !snapshot.empty&&snapshot.forEach(item=>{
        tempListMenu.push({id:item.id,...item.data()})      
      } )
      setTimeout(()=>{
        setLoading(false)
        setlistMenu(tempListMenu)
      },3000)
    })
    return () => {
      unsubQuery()
    }
  }, [])

  return (
  
     
     !loading && listMenu.length>0? <PageListMenu listMenu={listMenu}/>:              
      
     
      <InfoChargement Message={"Loading"}
                        Loading={loading} /> 
      
   
  )
}
const PageListMenu = ({listMenu})=>{
  const intl = useIntl()
  return( 
    <Fragment>
     <EditModal/>
      <ListPage
    name="ListMenu"
    list={listMenu}
    fields={fields}
    Row={Row}
    listProps={{ itemSize: 91 }}
    getPageProps={(list) => {
      return {
        pageTitle: intl.formatMessage(
          {
            id: 'list_page_menu',
            defaultMessage: 'List Page Menu {count} rows',
          },
          { count: list.length }
        ),
      }
    }}
  />
   </Fragment>
  )
}
export default ListMenu
