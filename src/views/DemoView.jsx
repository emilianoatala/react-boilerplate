import React, {useEffect} from 'react';
import  { useDispatch, useSelector }  from  'react-redux';
import { storeWord } from '../redux/actions/demoActions';

const DemoView = () => {
    const store = useSelector(state => state)
    const  dispatch  =  useDispatch ()

    useEffect(() => {
        dispatch(storeWord("Hola Mundo desde redux"))
    },[]);

    return <div>{store.demoReducer.word || "hola mundo" }</div>
}
 
export default DemoView