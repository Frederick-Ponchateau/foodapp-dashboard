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
import  { affProduit } from '../../redux/actions/produit';

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
    name: 'price',
    label: 'Price',
  }, 
  {
    name: 'description',
    label: 'Description',
  },
  {
    name: 'dateAdd',
    label: 'Date',
  },
  
]

const Row = ({ index, data }) => {
  const { id, name, price, description, image } = data

  const {menu:{affModalProduit}}= useSelector(state => state); /***** lire les données de mon reducers destructuré  *****/

  const dispatchProduit = useDispatch();
  const openEdit = () =>{

    
    dispatchProduit(affProduit({affModalProduit : !affModalProduit, data}))
    console.log(data);
  }
  return (
    <div key={`${id}${name}_${index}`} style={{marginTop:10,paddingTop:10}}>
      <ListItem alignItems="flex-start">
        {(image!=='nc' && image!== undefined)&& <Avatar alt={name} src={image} style={{marginLeft:15 ,marginRight:15}} />}
       
        <ListItemText  primary= {`${name} - ${price} €`} />
        <ListItemText  secondary= {`${description}`} />
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

const ListProduit = () => {
  const {produits} = useContext(FirebaseContext);
  const [listProduit, setlistProduit] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)

    const unsubQuery = produits().onSnapshot(snapshot=>{   
      console.log("snapshot type",snapshot,snapshot.type)  
      let tempListProduit=[];
      !snapshot.empty&&snapshot.forEach(item=>{
        tempListProduit.push({id:item.id,...item.data()})      

      } )
      setTimeout(()=>{
        setLoading(false)
        setlistProduit(tempListProduit)
      },3000)
    })
    return () => {
      unsubQuery()
    }
  }, [])

  return (
  
     
     !loading && listProduit.length>0? <PageListProduit listProduit={listProduit}/>:              
      
     
      <InfoChargement Message={"Loading"}
                        Loading={loading} /> 
      
   
  )
}
const PageListProduit = ({listProduit})=>{
  const intl = useIntl()
  return( 
    <Fragment>
     <EditModal/>
      <ListPage
    name="ListProduit"
    list={listProduit}
    fields={fields}
    Row={Row}
    listProps={{ itemSize: 91 }}
    getPageProps={(list) => {
      return {
        pageTitle: intl.formatMessage(
          {
            id: 'list_page_produit',
            defaultMessage: 'List Page Produit {count} rows',
          },
          { count: list.length }
        ),
      }
    }}
  />
   </Fragment>
  )
}
export default ListProduit
