import React from "react";
import Select from "react-select";
import { ingredients } from "./ingredients";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";


const SelectIngredient = () => {

  const dispatch = useDispatch()

  function arrayToUnorderedList(dataArray) {
    // Tworzymy listę UL i dodajemy każdy element tablicy jako LI
    const listItems = dataArray.map(item => `<li>${item}</li>`).join("");
    
    // Zwracamy całą listę jako jeden ciąg znaków HTML
    return `<ul>${listItems}</ul>`;
  }

  const handleChange = (selectedOption) => {

    const bulletList = arrayToUnorderedList(selectedOption.value.bulletpoints)
    dispatch(updateProduct({ bulletpoints: bulletList }));
  };

  return (
    <Select
      options={ingredients}
      onChange={handleChange}
      placeholder="Wybierz składnik..."
    />
  );
};

export default SelectIngredient;
