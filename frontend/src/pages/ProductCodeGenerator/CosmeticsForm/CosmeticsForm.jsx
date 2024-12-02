import React from "react";
import style from "./CosmeticsForm.module.scss";
import BasicInfoCosmetics from "../../../compoments/BasicInfoCosmetics/BasicInfoCosmetics";
import SpecialFeatures from "../../../compoments/SpecialFeatures/SpecialFeatures";
import { ShortDescription } from "../../../compoments/Tiptap/ShortDescription";
import { CosmeticsDesc1 } from "../../../compoments/Tiptap/CosmeticsDesc1";
import { CosmeticsDesc2 } from "../../../compoments/Tiptap/CosmeticsDesc2";
import { CosmeticsDesc3 } from "../../../compoments/Tiptap/CosmeticsDesc3";
import { CosmeticsDesc4 } from "../../../compoments/Tiptap/CosmeticsDesc4";
import Table from "../../../compoments/Table/Table";
import Button from "../../../compoments/Button/Button";
import { TableEnd } from "../../../compoments/Tiptap/TableEnd";
import { useDispatch } from "react-redux";
import { addIngredient, removeIngredient } from "../../../redux/productSlice";

const CosmeticsForm = () => {
  const dispatch = useDispatch();
  const handleAddIngredient = () => {
    dispatch(addIngredient());
  };

  const handleRemoveIngredient = () => {
    dispatch(removeIngredient());
  };

  return (
    <div className={style.cosmetics}>
      <BasicInfoCosmetics />
      <SpecialFeatures />
      <ShortDescription />
      <div className={style.cosmetics__columns}>
        <div>
          <CosmeticsDesc1 />
          <CosmeticsDesc2 />
          <CosmeticsDesc3 />
        </div>
        <div>
          <CosmeticsDesc4 />
        </div>
      </div>
      <div>
        <Table />
        <Button onClick={handleAddIngredient}>Dodaj składnik</Button>
        <Button
          className={style.generator__deleteBtn}
          onClick={handleRemoveIngredient}
        >
          Usuń składnik
        </Button>
        <TableEnd />
      </div>
    </div>
  );
};

export default CosmeticsForm;
