import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    productSku: "",
    productName: { pl: "", en: "", de: "", fr: "", it: "" },
    size: {
      sizeAmount: 0,
      unit: { pl: "", en: "", de: "", fr: "", it: "" },
    },
    portion: {
      portionAmount: 0,
      unit: { pl: "", en: "", de: "", fr: "", it: "" },
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
        ingredient: { pl: "", en: "", de: "", fr: "", it: "" },
        ingredientValue: "",
        rws: "",
        additionalLines: [],
      },
    ],
    description: { pl: "", en: "", de: "", fr: "", it: "" },
    shortDescription: { pl: "", en: "", de: "", fr: "", it: "" },
    ingredients: { pl: "", en: "", de: "", fr: "", it: "" },
    howToUse: { pl: "", en: "", de: "" },
    bulletpoints: { pl: "", en: "", de: "", fr: "", it: "" },
    research: {},
    contraindications: {
      pl: "<p>Nadwrażliwość na którykolwiek ze składników preparatu. W okresie ciąży i karmienia piersią przed zastosowaniem należy skonsultować się z lekarzem lub farmaceutą.</p>",
      en: "<p>Hypersensitivity to any of the ingredients of the preparation. During pregnancy and lactation consult a doctor or pharmacist before use.</p>",
      de: "<p>Überempfindlichkeit gegen einen der Bestandteile des Präparates. Während der Schwangerschaft und Stillzeit konsultieren Sie einen Arzt oder Apotheker vor der Verwendung.</p>",
      fr: "Hypersensibilité à l'un des ingrédients de la préparation. Pendant la grossesse et l'allaitement, consulter un médecin ou un pharmacien avant l'utilisation.",
      it: "<p>Ipersensibilità a uno qualsiasi degli ingredienti del preparato. In gravidanza e durante l'allattamento consultare il medico o il farmacista prima dell'uso.</p>",
    },
    storage: {
      pl: "<p>Przechowywać w suchym i ciemnym miejscu, w temperaturze 0-25ºC, w sposób niedostępny dla małych dzieci.</p>",
      en: "<p>Store in a dry and dark place, at a temperature of 0-25ºC, out of the reach of small children.</p>",
      de: "<p>Trocken und dunkel lagern, bei einer Temperatur von 0-25ºC, außerhalb der Reichweite von kleinen Kindern.</p>",
      fr: "Conserver dans un endroit sec et sombre, à une température comprise entre 0 et 25ºC, hors de portée des jeunes enfants.",
      it: "Conservare in un luogo asciutto e buio, a una temperatura di 0-25ºC, fuori dalla portata dei bambini.",
    },
    additionalInformation: {
      pl: "<p>Produkt nie może być stosowany jako substytut (zamiennik) prawidłowo zróżnicowanej diety. Zrównoważony sposób żywienia i prawidłowy tryb życia jest ważny dla funkcjonowania organizmu człowieka. Nie należy przekraczać maksymalnej zalecanej porcji do spożycia w ciągu dnia.</p>",
      en: "<p>The product must not be used as a substitute (replacement) for a properly varied diet. A balanced diet and a healthy lifestyle is important for the functioning of the human body. Do not exceed the maximum recommended daily serving.</p>",
      de: "<p>Das Produkt darf nicht als Substitut (Ersatz) für eine abwechslungsreiche Ernährung verwendet werden. Eine ausgewogene Ernährung und eine gesunde Lebensweise sind wichtig für das Funktionieren des menschlichen Körpers. Überschreiten Sie nicht die empfohlene Tageshöchstmenge.</p>",
      fr: "Le produit ne doit pas être utilisé comme substitut (remplacement) d'un régime alimentaire équilibré. Une alimentation équilibrée et un mode de vie sain sont importants pour le fonctionnement du corps humain. Ne pas dépasser la dose journalière maximale recommandée.",
      it: "Il prodotto non deve essere utilizzato come sostituto (sostituzione) di una dieta ben bilanciata. Una dieta equilibrata e uno stile di vita sano sono importanti per il funzionamento del corpo umano. Non superare la dose massima giornaliera raccomandata.",
    },
    producer: { shop: "", bl: "" },
    responsibleEntity: { shop: "", bl: "" },
    tableEnd: {
      pl: "<p><b>RWS</b> - Dzienna referencyjna wartość spożycia</p> <p><b>&lt;&gt;</b> Nie ustalono dziennej referencyjnej wartości spożycia</p>",
      en: "<p><strong>RI</strong> - Daily reference intake value</p><p><strong>&lt;&gt;</strong> No daily reference intake value has been established</p>",
      de: "<p><strong>RM</strong> - Täglicher Referenzaufnahmewert</p><p><strong>&lt;&gt;</strong> Es wurde kein täglicher Referenzaufnahmewert festgelegt</p>",
      fr: "<p><b>VNR</b> - Valeur de l'apport journalier de référence</p> <p><b>&lt;&gt;</b> Aucune valeur d'apport journalier de référence n'a été établie</p>",
      it: "<p><b>VNR</b> - Valore di assunzione giornaliero di riferimento</p> <p><b>&lt;&gt;</b> Non è stato stabilito un valore di assunzione giornaliera di riferimento</p>",
    },
    cosmeticsDescription1: { pl: "", en: "", de: "", fr: "", it: "" },
    cosmeticsDescription2: { pl: "", en: "", de: "", fr: "", it: "" },
    cosmeticsDescription3: { pl: "", en: "", de: "", fr: "", it: "" },
    cosmeticsDescription4: { pl: "", en: "", de: "", fr: "", it: "" },
    htmlToBl: "",
    htmlToShop: "",
    ebayDE: {
      logoAndMenu: "",
      productName: "",
      gallery: "",
      shortDescription: "",
      variants: "",
      bulletpoints: "",
      icons: "",
      longDescription: "",
      productComparison: "",
      research: "",
      boughtTogether: "",
      productSeries: "",
    },
    ebayEN: {
      logoAndMenu: "",
      productName: "",
      gallery: "",
      shortDescription: "",
      variants: "",
      bulletpoints: "",
      icons: "",
      longDescription: "",
      productComparison: "",
      research: "",
      boughtTogether: "",
      productSeries: "",
    },
    ebayFR: {
      logoAndMenu: "",
      productName: "",
      gallery: "",
      shortDescription: "",
      variants: "",
      bulletpoints: "",
      icons: "",
      longDescription: "",
      productComparison: "",
      research: "",
      boughtTogether: "",
      productSeries: "",
    },
    ebayIT: {
      logoAndMenu: "",
      productName: "",
      gallery: "",
      shortDescription: "",
      variants: "",
      bulletpoints: "",
      icons: "",
      longDescription: "",
      productComparison: "",
      research: "",
      boughtTogether: "",
      productSeries: "",
    },
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProduct(state, action) {
      initialState;
      const updatedProduct = { ...state.product, ...action.payload };

      updatedProduct.ingredientsTable = updatedProduct.ingredientsTable.map(
        (ingredient) => ({
          ...ingredient,
          additionalLines: ingredient.additionalLines || [],
        })
      );

      state.product = updatedProduct;
    },
    resetProduct() {
      return initialState;
    },
    addIngredient(state) {
      const newIndex = state.product.ingredientsTable.length + 1;
      state.product.ingredientsTable.push({
        ingredientIndex: newIndex,
        ingredient: { pl: "", en: "", de: "", fr: "", it: "" },
        ingredientValue: { pl: "", en: "", de: "", fr: "", it: "" },
        rws: "",
        additionalLines: [],
      });
    },
    removeIngredient(state) {
      if (state.product.ingredientsTable.length > 0) {
        state.product.ingredientsTable.pop();
      }
    },
  },
});

export const { updateProduct, resetProduct, addIngredient, removeIngredient } =
  productSlice.actions;
export { initialState };
export default productSlice.reducer;
