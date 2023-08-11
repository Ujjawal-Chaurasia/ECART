import React, { Fragment,useEffect   } from 'react'
import {CgMouse} from "react-icons/all"
import "./Home.css"
import ProductCard from "./ProductCard.js"
import MetaData from "../layout/MetaData";
import {clearErrors, getProduct} from "../../actions/productAction"
import {useSelector,useDispatch} from "react-redux"
import Loading from "../loader/loader"
import { useAlert } from 'react-alert';
// const product={
//     name:"blue t-shirt",
//     image:[{url:"http://i.ibb.co/DRST11n/1.webp"}],
//     price:"$99",
//     _id:"abhishek",
// }

const Home = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {loading,error,products}=useSelector((state)=>state.products);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
          }
        dispatch(getProduct())
    }, [dispatch,error,alert])  
    
  return (
    <Fragment>
        {loading?<Loading/>:<Fragment>
        <MetaData title="Ecommerce"/>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>Find amazing Products Below</h1>
            <a href="#container">
                <button>
                    Scroll<CgMouse/>
                </button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className="container" id='container'>
            {/* <Product product={product}/> */}
            {products && products.map((product)=>(
                <ProductCard  product={product}/>
            ))}

        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Home