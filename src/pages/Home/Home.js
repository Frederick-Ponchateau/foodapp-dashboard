import Page from 'material-ui-shell/lib/containers/Page';
import React,{useContext} from 'react';
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar';
import { useIntl } from 'react-intl';
import {FirebaseContext} from '../../components/Firebase';
import {useSelector} from 'react-redux';


const HomePage = () => {
  const {count} = useSelector(state => state)
  const firebase = useContext(FirebaseContext);
console.log(firebase)
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: count.affHome? 'home' : "test"})}
      </Scrollbar>
    </Page>
  )
}
export default HomePage
