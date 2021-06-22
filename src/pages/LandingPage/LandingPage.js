import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';

import { changeCount ,resetCount,affichage} from 'redux/actions/count';
const LandingPage = () => {
  const {count} = useSelector(state => state)
  const dispatch = useDispatch()
  const plus = ()=>{
    //console.log("count", count)
    dispatch(changeCount(count.count+1));
    
  }
  const affHome = ()=>{
    console.log(count.affHome);
    dispatch(affichage({affHome: !count.affHome}));
  }
  const reset =() =>{
    dispatch(resetCount());
  }
   /********************************
   * 
   * * EQUIVALENCE
   * 
   * * const store = useSelector(store => store)
   * * const count = store.count
   * 
   * * const count = useSelector(store =>store.count)
   * 
   ********************************/
  console.log("count",count.count)

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2>Landing Page - {count.count}</h2>
      <br/>
      <button onClick={()=>plus()}>Plus</button>
      <br/>
      <button onClick={()=>reset()}>reset</button>
      <button onClick={()=>affHome()}>Afficher Home</button>
      <br/>
      <div>
        <Link to="/home">Home</Link>
      </div>
    </div>
  )
}
export default LandingPage