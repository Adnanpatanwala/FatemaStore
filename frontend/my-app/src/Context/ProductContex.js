import React, { createContext, useContext, useEffect, useReducer } from 'react'
import  {reducer}  from '../Reducer/ProductReducer';
import axios from 'axios';
import {ProductFetching,Loading,ProductError,SingleProductFetching} from "../actions";
 

const PrdContex = createContext();
const initialState = {
  product:[],
  isloading:true,
  singleProduct:{},
  error:"",
 
}
const ProductContex = ({children}) => {
  const [state,dispatch] = useReducer(reducer,initialState);


  const productfetching = async()=>{
    try {
      dispatch({type:Loading});
      const data = await axios.get(`${process.env.REACT_APP_DOMAINURL}/api/v1/product`,{withCredentials:true});
      dispatch({type:ProductFetching,payload:data.data});
    } catch (error) {
      dispatch({type:ProductError,payload:error.response});
    }
  }


 


  const SingleProductFetch= async(id)=>{
     
    try{
      dispatch({type:Loading});
      const data = await axios.get(`${process.env.REACT_APP_DOMAINURL}/api/v1/product/${id}`);
      if(data){
        dispatch({type:SingleProductFetching,payload:data});
      }
    }catch(err){
      dispatch({type:ProductError,payload:err.response});
    
    }
  }

  
  return ( 
    <PrdContex.Provider value={{
        ...state,
        SingleProductFetch,
        productfetching,
      
    }}>
        {children}
    </PrdContex.Provider>
  )
}
export default ProductContex;

export const useGlobalProductContex=()=>{
    return useContext(PrdContex);
}
