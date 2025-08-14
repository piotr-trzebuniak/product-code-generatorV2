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
    .map((key) => `<p>⭐ ${featureNames[key]}</p>`)
    .join(""); // skleja <li>...</li> w jeden ciąg

  return list ? `<h2>Cechy specjalne:</h2>${list}` : "";
};

function convertListToSection(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const listItems = tempDiv.querySelectorAll("li");

  let resultHTML = `
        <h2>Rola w organizmie:</h2>`;

  listItems.forEach((item) => {
    resultHTML += `<p>✅ ${item.textContent}</p>`;
  });
  
  return resultHTML;
}

function generateStudiesHTML_PL(data) {
  // Walidacja danych
  if (!data || !data.PL || !Array.isArray(data.PL.studies)) {
    console.log("Brak danych do wyświetlenia badań (PL.studies).");
    return "";
  }

  const studies = data.PL.studies;

  const html = `
  <section class="section">
  <div class="item item-12">
  <section class="text-item">
<h2>Badania kliniczne dot. działania substancji:</h2>
${studies
  .map(
    (study, index) => `
<p><b>${index + 1}. ${study.title}</b></p>
<p><b>➡️</b> ${study.description}</p>
<p><b>Link:</b> <a href="${study.link}" target="_blank" rel="noopener">${
      study.link
    }</a></p>
`
  )
  .join("")}
  </section>
  </div>
  </section>
`.trim();

  return html;
}

export const generateBlHtml = (productData) => {
  const ingredientsHTML = generateIngredientsHTML(productData.ingredientsTable);
  const researchHTML = generateStudiesHTML_PL(productData.research);
  const specialFeaturesHTML = generateSpecialFeaturesList(
    productData.specialFeatures
  );

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
        <img src="https://elektropak.pl/subiekt_kopia/foto/${
          productData.productSku
        }^1.jpg" />
      </section>
    </div>
    <div class="item item-6">
      <section class="text-item">
        <h2>Skład</h2>
        <p>Wielkość opakowania:<strong> ${productData.size.sizeAmount} ${
    productData.size.unit.pl
  }</strong></p>
        <p>Porcja jednorazowa: <strong>${productData.portion.portionAmount} ${
    productData.portion.unit.pl
  }</strong></p>
        <p>Ilość porcji w opakowaniu: <strong>${
          productData.portionQuantity
        }</strong></p>
        <h2>Sposób użycia:</h2>
        ${productData.howToUse.pl}
      </section>
    </div>
  </section>
    <section class="section">
    <div class="item item-6">
      <section class="image-item">
        <img src="https://elektropak.pl/subiekt_kopia/foto/${
          productData.productSku
        }^2.jpg" />
      </section>
    </div>
    <div class="item item-6">
      <section class="text-item">
      ${
      productData.bulletpoints.pl
        ? `${convertListToSection(productData.bulletpoints.pl)}`
        : ""
      }
      </section>
    </div>
  </section>


        ${researchHTML ? `${researchHTML}` : ""}
  
  <section class="section">
    <div class="item item-12">
      <section class="text-item">
        <p><strong>Składniki&nbsp; &nbsp;${productData.portion.portionAmount} ${
    productData.portion.unit.pl
  }&nbsp; &nbsp;RWS</strong></p>
        <p><strong>_________________________________________________</strong></p>
        <table>${ingredientsHTML}</table>
        <p><strong>_________________________________________________</strong></p>
        ${productData.tableEnd.pl}
      </section>
    </div>
  </section>

    <section class="section">
    <div class="item item-12">
      <section class="text-item">
        <h2>Przeciwwskazania:</h2>
        ${productData.contraindications.pl}
        <h2>Przechowywanie:</h2>
        ${productData.storage.pl}
      </section>
    </div>
  </section>
  
  ${descriptionHTML}
  
  <section class="section">
    <div class="item item-12">
      <section class="text-item">
        ${specialFeaturesHTML}
        <h2>Składniki:</h2>
        ${productData.ingredients.pl}
        <h2>Informacja:</h2>
        ${productData.additionalInformation.pl}
        <h2>Producent:</h2>
        ${productData.producer.bl}
        ${
          productData.responsibleEntity.shop
            ? `<h2>Podmiot odpowiedzialny:</h2>${productData.responsibleEntity.bl}`
            : ""
        }
      </section>
    </div>
  </section>`;
};
