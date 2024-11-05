import React from 'react'
import style from "./BasicInfoCosmetics.module.scss"
import Input from '../Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../../redux/productSlice'


const BasicInfoCosmetics = () => {
  const productData = useSelector((state) => state.product.product)
  const dispatch = useDispatch()

  return (
    <div className={style.basicInfo}>
    <h3>Podstawowe informacje</h3>
    <Input
      placeholder="SKU"
      value={productData.productSku}
      onChange={(e) => {
        dispatch(updateProduct({ productSku: e.target.value }));
      }}
    />
    <Input
      placeholder="Nazwa produktu"
      value={productData.productName}
      onChange={(e) => {
        dispatch(updateProduct({ productName: e.target.value }));
      }}
    />
    

  </div>
  )
}

export default BasicInfoCosmetics