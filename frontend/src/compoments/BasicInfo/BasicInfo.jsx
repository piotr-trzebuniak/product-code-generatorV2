import React from 'react'
import style from "./BasicInfo.module.scss"
import Input from '../Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../../redux/productSlice'


const BasicInfo = () => {
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
    
    <Input
      placeholder="Wielkość opakowania"
      value={productData.size}
      onChange={(e) =>
        dispatch(updateProduct({ size: e.target.value }))
      }
    />
    <Input
      placeholder="Porcja jednorazowa"
      value={productData.portion}
      onChange={(e) =>
        dispatch(updateProduct({ portion: e.target.value }))
      }
    />
    <Input
      placeholder="Ilość porcji w opakowaniu"
      value={productData.portionQuantity}
      onChange={(e) =>
        dispatch(updateProduct({ portionQuantity: e.target.value }))
      }
    />
    <Input
      placeholder="url - zdjęcie 1"
      value={productData.url1}
      onChange={(e) =>
        dispatch(updateProduct({ url1: e.target.value }))
      }
    />
    <Input
      placeholder="url - zdjęcie 2"
      value={productData.url2}
      onChange={(e) =>
        dispatch(updateProduct({ url2: e.target.value }))
      }
    />

  </div>
  )
}

export default BasicInfo