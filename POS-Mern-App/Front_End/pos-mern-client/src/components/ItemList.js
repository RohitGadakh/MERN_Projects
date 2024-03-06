import React from 'react';
import { Button, Card, Flex } from 'antd';
import {  useDispatch } from 'react-redux';
//import {  useNavigate } from "react-router-dom";
function ItemList({item}){
 
// update cart handler
const dispatch=useDispatch()
const handleAddToCart=()=>{
  dispatch({
    type:'Add_To_Cart',
    payload:{...item,quantity:1},
  })
}

  const { Meta } = Card;
return(

<Card
  
    style={{
      width: 240,marginTop:20,marginBottom:20,
    }}
    cover={<img alt={item.name} src={item.image} style={{height:200}}/>}
  >
    <Meta title={item.name}/>
    <div className='item-button'>
      <Button onClick={()=>handleAddToCart()}>Add To Cart</Button>
    </div>
  </Card>

);
}

export default ItemList



