import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    productSku: "",
    productName: "",
    size: {
      sizeAmount: 0, 
      unit: ""
    },
    portion: {
      portionAmount: 0, 
      unit: ""
    },
    portionQuantity: 0,
    url1: "",
    url2: "",
    specialFeatures: {
      gmoFree: false,
      soyaFree: false,
      sugarFree: false,
      glutenFree: false,
      lactoseFree: false,
      fillersFree: false,
      crueltyFree: false,
      hipoalergic: false,
      ketoFriendly: false,
      lowCarb: false,
      slowRelease: false,
      fastRelease: false,
      filmCoatedTablet: false,
      wegan: false,
      wegetarian: false,
      zeroWaste: false,
    },
    ingredientsTable: [
      {
        ingredientIndex: 1,
        ingredient: "",
        ingredientValue: "",
        rws: "",
        additionalLines: [],
        // additionalLines: [
        //   { lineIndex: 1, ingredient: "", ingredientValue: "", rws: "" },
        // ],
      },
    ],
    description: "",
    shortDescription: "",
    ingredients: "",
    howToUse: "",
    bulletpoints: "",
    contraindications: "<p>Nadwrażliwość na którykolwiek ze składników preparatu. W okresie ciąży i karmienia piersią przed zastosowaniem należy skonsultować się z lekarzem lub farmaceutą.</p>",
    storage: "<p>Przechowywać w suchym i ciemnym miejscu, w temperaturze 0-25ºC, w sposób niedostępny dla małych dzieci.</p>",
    additionalInformation: "<p>Produkt nie może być stosowany jako substytut (zamiennik) prawidłowo zróżnicowanej diety. Zrównoważony sposób żywienia i prawidłowy tryb życia jest ważny dla funkcjonowania organizmu człowieka. Nie należy przekraczać maksymalnej zalecanej porcji do spożycia w ciągu dnia.</p>",
    producer: "",
    // producer: {
    //   bl: "",
    //   shop: "",
    // },
    tableEnd: "<p><b>RWS</b> - Dzienna referencyjna wartość spożycia</p> <p><b>&lt;&gt;</b> Nie ustalono dziennej referencyjnej wartości spożycia</p>",
    responsibleEntity: {
      bl: "",
      shop: "",
    },
    cosmeticsDescription1: "",
    cosmeticsDescription2: "",
    cosmeticsDescription3: "",
    cosmeticsDescription4: "",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProduct(state, action) {
      const updatedProduct = { ...state.product, ...action.payload };

      updatedProduct.ingredientsTable = updatedProduct.ingredientsTable.map(
        (ingredient) => ({
          ...ingredient,
          additionalLines: ingredient.additionalLines || [],
        })
      );

      state.product = updatedProduct;
    },
    resetProduct(state) {
      return initialState;
    },
    addIngredient(state) {
      const newIndex = state.product.ingredientsTable.length + 1;
      state.product.ingredientsTable.push({
        ingredientIndex: newIndex,
        ingredient: "",
        ingredientValue: "",
        rws: "",
        additionalLines: [],
      });
    },
    removeIngredient(state) {
      // Sprawdź, czy są jakiekolwiek składniki do usunięcia
      if (state.product.ingredientsTable.length > 0) {
        // Usuwa ostatni składnik
        state.product.ingredientsTable.pop();
      }
    },
  },
});

export const { updateProduct, resetProduct, addIngredient, removeIngredient } =
  productSlice.actions;
export default productSlice.reducer;
