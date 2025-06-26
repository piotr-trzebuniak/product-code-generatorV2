
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
  
  
  export const generateShopify = (productData) => {
    const ingredientsHTML = generateIngredientsHTML(productData.ingredientsTable);
     return ` 
     <p>${productData.shortDescription.en}</p>
<h3>Supplements Facts:</h3>
<p>Package Size: <strong>${productData.size.sizeAmount} ${productData.size.unit.en}</strong></p>
<p>Serving Size: <strong>${productData.portion.portionAmount} ${productData.portion.unit.en}</strong></p>
<p>Servings Per Container: <strong>${productData.portionQuantity}</strong></p>
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
<h3>Other ingredients:</h3>
${productData.ingredients.en}
<h3>Suggested use:</h3>
${productData.howToUse.en}
<h3>Caution:</h3>
${productData.additionalInformation.en}
     `
  }