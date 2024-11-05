import React, { useState } from "react";
import style from "./Table.module.scss";
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { removeIngredient, updateProduct } from "../../redux/productSlice";
import Button from "../Button/Button";
import deleteIcon from '../../assets/delete-button.png'

const Table = () => {
  const dispatch = useDispatch();
  const ingredientsTable = useSelector(
    (state) => state.product.product.ingredientsTable
  );
  const portion = useSelector((state) => state.product.product.portion);
  // console.log(ingredientsTable);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = ingredientsTable.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    dispatch(updateProduct({ ingredientsTable: updatedIngredients }));
  };

  const handlePortionChange = (e) => {
    dispatch(updateProduct({ portion: e.target.value }));
  };

  const handleRemoveIngredient = (index) => {
    dispatch(removeIngredient(index));
  };

  const handleAdditionalLineChange = (
    ingredientIndex,
    lineIndex,
    field,
    value
  ) => {
    const updatedIngredients = ingredientsTable.map((ingredient, i) => {
      if (i === ingredientIndex) {
        const updatedLines = ingredient.additionalLines.map((line, li) =>
          li === lineIndex ? { ...line, [field]: value } : line
        );
        return { ...ingredient, additionalLines: updatedLines };
      }
      return ingredient;
    });
    dispatch(updateProduct({ ingredientsTable: updatedIngredients }));
  };

  const handleAddLine = (ingredientIndex) => {
    const updatedIngredients = ingredientsTable.map((ingredient, i) =>
      i === ingredientIndex
        ? {
            ...ingredient,
            additionalLines: [
              ...ingredient.additionalLines,
              {
                lineIndex: ingredient.additionalLines.length + 1,
                ingredient: "",
                ingredientValue: "",
                rws: "",
              },
            ],
          }
        : ingredient
    );
    dispatch(updateProduct({ ingredientsTable: updatedIngredients }));
  };

  const handleRemoveLine = (ingredientIndex, lineIndex) => {
    const updatedIngredients = ingredientsTable.map((ingredient, i) =>
      i === ingredientIndex
        ? {
            ...ingredient,
            additionalLines: ingredient.additionalLines.filter(
              (_, li) => li !== lineIndex
            ),
          }
        : ingredient
    );
    dispatch(updateProduct({ ingredientsTable: updatedIngredients }));
  };

  return (
    <div className={style.table}>
      <h4>Tabela wartości odżywczych</h4>
      <div className={style.table__tableHeadings}>
        <Input value="Składniki" />
        <Input
          placeholder="Wielkość porcji"
          value={portion}
          onChange={handlePortionChange}
        />
        <Input value="RWS" />
      </div>

      {ingredientsTable.map((ingredient, ingredientIndex) => (
        <div
          key={ingredient.ingredientIndex}
          className={style.table__ingredient}
        >
          <div className={style["table__ingredient-row"]}>
            <Input
              placeholder={`Składnik ${ingredient.ingredientIndex}`}
              value={ingredient.ingredient}
              onChange={(e) =>
                handleIngredientChange(
                  ingredientIndex,
                  "ingredient",
                  e.target.value
                )
              }
              className={style["table__ingredient-bold"]}
            />
            <Input
              value={ingredient.ingredientValue}
              onChange={(e) =>
                handleIngredientChange(
                  ingredientIndex,
                  "ingredientValue",
                  e.target.value
                )
              }
            />
            <Input
              value={ingredient.rws}
              onChange={(e) =>
                handleIngredientChange(ingredientIndex, "rws", e.target.value)
              }
            />
          </div>

          {ingredient.additionalLines && Array.isArray(ingredient.additionalLines) && ingredient.additionalLines.map((line, lineIndex) => (
            <div
              key={line.lineIndex}
              className={style["table__ingredient-row"]}
            >
              <Input
                placeholder={`Dodatkowa linia ${line.lineIndex}`}
                value={line.ingredient}
                onChange={(e) =>
                  handleAdditionalLineChange(
                    ingredientIndex,
                    lineIndex,
                    "ingredient",
                    e.target.value
                  )
                }
              />
              <Input
                value={line.ingredientValue}
                onChange={(e) =>
                  handleAdditionalLineChange(
                    ingredientIndex,
                    lineIndex,
                    "ingredientValue",
                    e.target.value
                  )
                }
              />
              <Input
                value={line.rws}
                onChange={(e) =>
                  handleAdditionalLineChange(
                    ingredientIndex,
                    lineIndex,
                    "rws",
                    e.target.value
                  )
                }
              />
              <img className={style["table__ingredient-delete"]} src={deleteIcon} alt="" onClick={() => handleRemoveLine(ingredientIndex, lineIndex)} />
            </div>
          ))}

          <Button onClick={() => handleAddLine(ingredientIndex)}>
            Dodaj linię
          </Button>
        </div>
      ))}

    </div>
  );
};

export default Table;
