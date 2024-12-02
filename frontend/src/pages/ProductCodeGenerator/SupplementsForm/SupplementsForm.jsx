import React, { useState } from "react";
import style from "./SupplementsForm.module.scss";
import BasicInfo from "../../../compoments/BasicInfo/BasicInfo";
import SpecialFeatures from "../../../compoments/SpecialFeatures/SpecialFeatures";
import { ShortDescription } from "../../../compoments/Tiptap/ShortDescription";
import RwsCalc from "../../../compoments/RwsCalc/RwsCalc";
import Table from "../../../compoments/Table/Table";
import Button from "../../../compoments/Button/Button";
import { TableEnd } from "../../../compoments/Tiptap/TableEnd";
import { LongDescription } from "../../../compoments/Tiptap/LongDescription";
import { Ingredients } from "../../../compoments/Tiptap/Ingredients";
import { HowToUse } from "../../../compoments/Tiptap/HowToUse";
import { Contraindications } from "../../../compoments/Tiptap/Contraindications";
import { AdditionalInformation } from "../../../compoments/Tiptap/AdditionalInformation";
import SelectProducers from "../../../compoments/SelectProducers/SelectProducers";
import SelectResponsibleEntity from "../../../compoments/SelectResponsibleEntity/SelectResponsibleEntity";
import SelectIngredient from "../../../compoments/SelectIngredient/SelectIngredient";
import { Producer } from "../../../compoments/Tiptap/Producer";
import { ResponsibleEntity } from "../../../compoments/Tiptap/ResponsibleEntity";
import { Bulletpoints } from "../../../compoments/Tiptap/Bulletpoints";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, removeIngredient } from "../../../redux/productSlice";
import { Storage } from "../../../compoments/Tiptap/Storage";

const SupplementsForm = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.product);

  const handleAddIngredient = () => {
    dispatch(addIngredient());
  };

  const handleRemoveIngredient = () => {
    dispatch(removeIngredient());
  };

  return (
    <div className={style.supplements}>
      <div className={style.supplements__grid}>
        <BasicInfo />
        <SpecialFeatures />
      </div>
      <ShortDescription />
      <div>
        <RwsCalc />
        <Table />
        <Button onClick={handleAddIngredient}>Dodaj składnik</Button>
        <Button
          className={style.supplements__deleteBtn}
          onClick={handleRemoveIngredient}
        >
          Usuń składnik
        </Button>
        <TableEnd />
      </div>

      <div className={style.supplements__grid2}>
        <LongDescription />
        <Ingredients />
        <HowToUse />
        <Contraindications />
        <AdditionalInformation />
        <Storage />
        <div className={style.supplements__select}>
          <h4>Lista producentów</h4>
          <SelectProducers />
        </div>
        <div className={style.supplements__select}>
          <h4>Lista podmiotów odpowiedzialnych</h4>
          <SelectResponsibleEntity />
        </div>
        <div className={style.supplements__select}>
          <h4>Lista składników</h4>
          <SelectIngredient />
        </div>
        <Producer initialContent={productData.producer.bl} />
        <ResponsibleEntity initialContent={productData.responsibleEntity.bl} />
        <Bulletpoints initialContent={productData.bulletpoints} />
      </div>
    </div>
  );
};

export default SupplementsForm;
