import { generateIngredientsHTML } from "./generateBlHtml";

// Funkcja generująca HTML dla Baselinkera
export const generateCosmeticsBlHtml = (productData) => {
    const ingredientsHTML = generateIngredientsHTML(productData.ingredientsTable);
  
    const newHtmlToBl = `
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
        ${productData.cosmeticsDescription1.pl}
      </section>
    </div>
  </section>

  <section class="section">
    <div class="item item-12">
      <section class="text-item">
        ${productData.cosmeticsDescription2.pl}
      </section>
    </div>
  </section>
  
  ${productData.ingredientsTable[0].ingredient.pl !== "" ? `
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
  ` : ""}
  
  <section class="section">
    <div class="item item-12">
      <section class="text-item">
        ${productData.cosmeticsDescription3.pl}
        ${productData.cosmeticsDescription4.pl}
      </section>
    </div>
  </section>`;
  
    return newHtmlToBl;
  };
  