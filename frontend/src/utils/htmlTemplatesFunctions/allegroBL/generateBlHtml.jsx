export const generateIngredientsHTML = (ingredientsTable) => {
  let ingredientsHTML = "";

  ingredientsTable.forEach((ingredient) => {
    // główny składnik
    const name = `<strong>${ingredient.ingredient?.pl || ""}</strong>`;
    const value = ingredient.ingredientValue?.pl || "";
    const rws = ingredient.rws || "";

    ingredientsHTML += `<p>${name}&nbsp;&nbsp;${value}&nbsp;&nbsp;${rws}</p>`;

    // dodatkowe linie
    if (ingredient.additionalLines && ingredient.additionalLines.length > 0) {
      ingredient.additionalLines.forEach((line) => {
        const lineName = line.ingredient?.pl || "";
        const lineValue = line.ingredientValue?.pl || "";
        const lineRws = line.rws || "";
        ingredientsHTML += `<p>${lineName}&nbsp;&nbsp;${lineValue}&nbsp;&nbsp;${lineRws}</p>`;
      });
    }
  });

  return ingredientsHTML;
};



  

  const generateSpecialFeaturesList = (specialFeatures) => {
    const featureNames = {
      gmoFree: "Bez GMO",
      soyaFree: "Bez soi",
      sugarFree: "Bez cukru",
      glutenFree: "Bez glutenu",
      lactoseFree: "Bez laktozy",
      fillersFree: "Bez wypełniaczy",
      crueltyFree: "Cruelty-Free",
      hipoalergic: "Hipoalergiczny",
      ketoFriendly: "Keto-friendly",
      lowCarb: "Niska zawartość węglowodanów",
      slowRelease: "Wolne uwalnianie",
      fastRelease: "Szybkie uwalnianie",
      filmCoatedTablet: "Tabletka powlekana",
      wegan: "Wegański",
      wegetarian: "Wegetariański",
      zeroWaste: "Zero waste",
    };
  
    const list = Object.keys(specialFeatures)
      .filter((key) => specialFeatures[key]) // wybiera tylko włączone cechy
      .map((key) => `<li>${featureNames[key]}</li>`)
      .join(""); // skleja <li>...</li> w jeden ciąg
  
    return list ? `<h2>Cechy specjalne:</h2><ul>${list}</ul>` : "";
  };
  
  export const generateBlHtml = (productData) => {
    const ingredientsHTML = generateIngredientsHTML(productData.ingredientsTable);
    const specialFeaturesHTML = generateSpecialFeaturesList(productData.specialFeatures);
  
    const descriptionHTML = productData.description.pl
      ? `<section class="section"><div class="item item-12"><section class="text-item">${productData.description.pl}</section></div></section>`
      : "";
  
    return `
  <section class="section">
    <div class="item item-12">
      <section class="text-item">
        <h1>${productData.productName.pl}</h1>
        ${productData.shortDescription.pl}
      </section>
    </div>
  </section>
  
  <section class="section">
    <div class="item item-6">
      <section class="image-item">
        <img src="https://elektropak.pl/subiekt_kopia/foto/${productData.productSku}^1.jpg" />
      </section>
    </div>
    <div class="item item-6">
      <section class="text-item">
        <h2>Skład</h2>
        <p>Wielkość opakowania:<strong> ${productData.size.sizeAmount} ${productData.size.unit.pl}</strong></p>
        <p>Porcja jednorazowa: <strong>${productData.portion.portionAmount} ${productData.portion.unit.pl}</strong></p>
        <p>Ilość porcji w opakowaniu: <strong>${productData.portionQuantity}</strong></p>
        <h2>Sposób użycia:</h2>
        ${productData.howToUse.pl}
      </section>
    </div>
  </section>
  
  <section class="section">
    <div class="item item-6">
      <section class="image-item">
        <img src="https://elektropak.pl/subiekt_kopia/foto/${productData.productSku}^2.jpg" />
      </section>
    </div>
    <div class="item item-6">
      <section class="text-item">
        <h2>Przeciwwskazania:</h2>
        ${productData.contraindications.pl}
        <h2>Przechowywanie:</h2>
        ${productData.storage.pl}
      </section>
    </div>
  </section>
  
  <section class="section">
    <div class="item item-12">
      <section class="text-item">
        <p><strong>Składniki&nbsp; &nbsp;${productData.portion.portionAmount} ${productData.portion.unit.pl}&nbsp; &nbsp;RWS</strong></p>
        <p><strong>_________________________________________________</strong></p>
        <table>${ingredientsHTML}</table>
        <p><strong>_________________________________________________</strong></p>
        ${productData.tableEnd.pl}
      </section>
    </div>
  </section>
  
  ${descriptionHTML}
  
  <section class="section">
    <div class="item item-12">
      <section class="text-item">
        ${specialFeaturesHTML}
        ${
          productData.bulletpoints.pl
            ? `<h2>Dlaczego warto stosować?:</h2>${productData.bulletpoints.pl}`
            : ""
        }
        <h2>Składniki:</h2>
        ${productData.ingredients.pl}
        <h2>Informacja:</h2>
        ${productData.additionalInformation.pl}
        <h2>Producent:</h2>
        ${productData.producer.bl}
        ${
          productData.responsibleEntity
            ? `<h2>Podmiot odpowiedzialny:</h2>${productData.responsibleEntity.bl}`
            : ""
        }
      </section>
    </div>
  </section>`;
  };