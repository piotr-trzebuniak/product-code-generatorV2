export const generateIngredientsHTML = (ingredientsTable) => {
  let ingredientsHTML = "";

  ingredientsTable.forEach((ingredient) => {
    // główny składnik
    const name = ingredient.ingredient?.en || "";
    const value = ingredient.ingredientValue?.en || "";
    const rws = ingredient.rws || "";

    // sprawdź czy są dodatkowe linie
    if (ingredient.additionalLines && ingredient.additionalLines.length > 0) {
      // składnik z dodatkowymi liniami
      let combinedNames = `<strong>${name} <br></strong>`;
      let combinedValues = `${value}`;

      // dodaj dodatkowe linie
      ingredient.additionalLines.forEach((line, index) => {
        const lineName = line.ingredient?.en || "";
        const lineValue = line.ingredientValue?.en || "";

        combinedNames += lineName;
        combinedValues += `<br>${lineValue}`;
      });

      ingredientsHTML += `
      <tr>
         <td>
            ${combinedNames}
         </td>
         <td>${combinedValues}</td>
         <td>${rws}</td>
      </tr>`;
    } else {
      // pojedynczy składnik bez dodatkowych linii
      ingredientsHTML += `
      <tr>
         <td><strong>${name}</strong></td>
         <td>${value}</td>
         <td>${rws}</td>
      </tr>`;
    }
  });

  return ingredientsHTML;
};

export const generateShopifyCosmetics = (productData) => {
  const ingredientsHTML = generateIngredientsHTML(productData.ingredientsTable);
  return ` 
     <p>${productData.shortDescription.en}</p>
    ${productData.cosmeticsDescription1.en}
    ${productData.cosmeticsDescription2.en}

  ${
    productData.ingredientsTable[0].ingredient.pl !== ""
      ? `
<table class="table">
   <tbody>
      <tr class="tablehead">
         <td><strong>Supplemental Information</strong></td>
         <td><strong>Amount Per Serving</strong></td>
         <td><strong>% Daily Value</strong></td>
      </tr>
  ${ingredientsHTML}
   </tbody>
</table>
<p>* Daily Value not established.</p>
  `
      : ""
  }
    ${productData.cosmeticsDescription3.en}
    ${productData.cosmeticsDescription4.en}
  
     `;
};
