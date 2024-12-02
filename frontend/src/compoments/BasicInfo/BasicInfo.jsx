import React from "react";
import style from "./BasicInfo.module.scss";
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/productSlice";

const BasicInfo = () => {
  const productData = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

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
      <div className={style.basicInfo__grid}>
        <span>Wielkość opakowania:</span>
        <Input
          placeholder="Wielkość opakowania (ilość)"
          value={productData.size.sizeAmount}
          onChange={(e) =>
            dispatch(
              updateProduct({
                size: { ...productData.size, sizeAmount: e.target.value },
              })
            )
          }
        />
        <Input
          placeholder="Jednostka/typ"
          value={productData.size.unit}
          onChange={(e) =>
            dispatch(
              updateProduct({
                size: { ...productData.size, unit: e.target.value },
              })
            )
          }
        />
      </div>
      <div className={style.basicInfo__grid}>
        <span>Porcja jednorazowa:</span>
        <Input
          placeholder="Porcja jednorazowa (ilość)"
          value={productData.portion.portionAmount}
          onChange={(e) =>
            dispatch(
              updateProduct({
                portion: {
                  ...productData.portion,
                  portionAmount: e.target.value,
                },
                portionQuantity: (
                  productData.size.sizeAmount / e.target.value
                ).toFixed(0),
              })
            )
          }
        />
        <Input
          placeholder="Jednostka/typ"
          value={productData.portion.unit}
          onChange={(e) =>
            dispatch(
              updateProduct({
                portion: { ...productData.portion, unit: e.target.value },
              })
            )
          }
        />
      </div>
      <Input
        placeholder="Ilość porcji w opakowaniu"
        value={productData.portionQuantity ? productData.portionQuantity : null}
        onChange={(e) =>
          dispatch(updateProduct({ portionQuantity: e.target.value }))
        }
      />
    </div>
  );
};

export default BasicInfo;
