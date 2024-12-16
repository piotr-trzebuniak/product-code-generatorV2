import React, { useState } from "react";
import style from "./ProductCodeGenerator.module.scss";
import Button from "../../compoments/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProduct,
} from "../../redux/productSlice";
import { toast } from "react-toastify";
import SupplementsForm from "./SupplementsForm/SupplementsForm";
import CosmeticsForm from "./CosmeticsForm/CosmeticsForm";
import GeneratorBtns from "./GeneratorBtns/GeneratorBtns";

const ProductCodeGenerator = () => {
  const [htmlToShop, setHtmlToShop] = useState("");
  const [htmlToBl, setHtmlToBl] = useState("");
  const [type, setType] = useState("");
  const [key, setKey] = useState(0);
  const [description, setDescription] = useState("");
  const [resetKey, setResetKey] = useState(false); // Klucz resetowania

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.product);

  // HELPERS FUNCTIONS

  function replaceH2WithH3(htmlString) {
    return htmlString.replace(/<h2>/g, "<h3>").replace(/<\/h2>/g, "</h3>");
  }

  function replaceH3WithH2(htmlString) {
    return htmlString.replace(/<h3>/g, "<h2>").replace(/<\/h3>/g, "</h2>");
  }

  const generateIngredientsHTML = () => {
    let ingredientsHTML = "";
    productData.ingredientsTable.forEach((ingredient) => {
      ingredientsHTML += `<p><strong>${ingredient.ingredient}</strong>&nbsp; &nbsp;${ingredient.ingredientValue}&nbsp; &nbsp;${ingredient.rws}</p>`;
      if (ingredient.additionalLines && ingredient.additionalLines.length > 0) {
        ingredient.additionalLines.forEach((line) => {
          ingredientsHTML += `<p>${line.ingredient}&nbsp; &nbsp;${line.ingredientValue}&nbsp; &nbsp;${line.rws}</p>`;
        });
      }
    });
    return ingredientsHTML;
  };

  const generateSpecialFeaturesList = () => {
    const { specialFeatures } = productData;

    // Mapowanie cech, które mają wartość true
    const featuresList = Object.keys(specialFeatures)
      .filter((key) => specialFeatures[key]) // wybieramy tylko te, które są true
      .map((feature) => {
        // Konwertujemy klucz na czytelną nazwę
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
        return `<li>${featureNames[feature]}</li>`; // Tworzymy element listy
      })
      .join(""); // Łączymy elementy w całość

    return featuresList
      ? `<h2>Cechy specjalne:</h2><ul>${featuresList}</ul>`
      : ""; // Zwracamy listę lub pusty string, jeśli nie ma cech
  };

  const ingredientTableHtmlToShop = () => {
    return productData.ingredientsTable
      .map((ingredient) => {
        // Podstawowy składnik
        let ingredientName = `<strong>${ingredient.ingredient}</strong>`;
        let ingredientValue = `${ingredient.ingredientValue}`;
        let ingredientRws = ingredient.rws ? `${ingredient.rws}` : "";

        // Dodatkowe linie składnika
        if (
          ingredient.additionalLines &&
          ingredient.additionalLines.length > 0
        ) {
          ingredient.additionalLines.forEach((line) => {
            ingredientName += `<br>${line.ingredient}`;
            ingredientValue += `<br>${line.ingredientValue}`;
            ingredientRws += line.rws ? `<br>${line.rws}` : "";
          });
        }

        // Usuń zbędne <br> na końcu wartości, jeśli rws jest pusty
        ingredientRws = ingredientRws.replace(/(<br>)+$/, "");

        return `
<tr>
<td>${ingredientName}</td>
<td>${ingredientValue}</td>
<td>${ingredientRws}</td>
</tr>`;
      })
      .join("");
  };

  // ACTIONS FUNCTIONS

  const copyHtmlToShop = async () => {
    if (htmlToShop) {
      try {
        await navigator.clipboard.writeText(htmlToShop);
        console.log("Kod HTML dla sklepu skopiowany do schowka.");
        toast.success("Kod HTML dla sklepu skopiowany do schowka.");
      } catch (err) {
        console.error("Nie udało się skopiować kodu HTML dla sklepu:", err);
      }
    } else {
      console.log("Brak wygenerowanego kodu HTML dla sklepu.");
    }
  };
  const copyShortDescToShop = async () => {
    if (productData.shortDescription) {
      try {
        await navigator.clipboard.writeText(productData.shortDescription);
        console.log("Kod krótkiego opisu dla sklepu skopiowany do schowka.");
        toast.success("Kod krótkiego opisu dla sklepu skopiowany do schowka.");
      } catch (err) {
        console.error(
          "Nie udało się skopiować kodu krótkiego opisu  dla sklepu:",
          err
        );
      }
    } else {
      toast.error("Brak wygenerowanego kodu krótkiego opisu dla sklepu.");
    }
  };

  const copyHtmlToBl = async () => {
    if (htmlToBl) {
      try {
        await navigator.clipboard.writeText(htmlToBl);
        console.log("Kod HTML dla Baselinkera skopiowany do schowka.");
        toast.success("Kod HTML dla baselinkera skopiowany do schowka.");
      } catch (err) {
        console.error(
          "Nie udało się skopiować kodu HTML dla Baselinkera:",
          err
        );
      }
    } else {
      toast.success("Kod HTML dla baselinkera skopiowany do schowka.");
    }
  };

  const resetForm = () => {
    dispatch(resetProduct());
    setKey((prevKey) => prevKey + 1);

    setHtmlToShop("");
    setHtmlToBl("");
    setResetKey((prevKey) => !prevKey);
    toast.success("Formularz został zresetowany");
  };

  // API CONNECTION

  const sendToGoogleSheets = () => {
    const data = {
      Sku: productData.productSku,
      Html: htmlToBl,
    };

    console.log(data);

    // fetch("http://localhost:3000/submit", {
    fetch("https://product-code-generatorv10.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from backend:", data);
        if(data.result === "Success") {
          toast.success("Kod został poprawnie wysłany do arkusza google!!!!");
        }
        
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Nie udało się wysłać kodu do arkusza google!!!!");
      });
  };

  // SUPPLEMENTS GENERATOR FUNCTION

  const generateCode = () => {
    const ingredientsHTML = generateIngredientsHTML();
    const specialFeaturesHTML = generateSpecialFeaturesList();
    const tableHtmlToShop = ingredientTableHtmlToShop();

    const descriptionHTML = productData.description
      ? `
<section class="section">
<div class="item item-12">
<section class="text-item">
${productData.description}
</section>
</div>
</section>`
      : "";

    // BASELINKER CODE

    const newHtmlToBl = `<section class="section">
<div class="item item-12">
<section class="text-item">
<h1>${productData.productName}</h1>
${productData.shortDescription}
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
<p>Wielkość opakowania:<strong> ${productData.size.sizeAmount} ${
      productData.size.unit
    }</strong></p>
<p>Porcja jednorazowa: <strong> ${productData.portion.portionAmount} ${
      productData.portion.unit
    }</strong></p>
<p>Ilość porcji w opakowaniu: <strong> ${
      productData.portionQuantity
    }</strong></p>
<h2>Sposób użycia:</h2>
${productData.howToUse}
</section>
</div>
</section>
<section class="section">
<div class="item item-6">
<section class="text-item">
<h2>Przeciwwskazania:</h2>
${productData.contraindications}
<h2>Przechowywanie:</h2>
${productData.storage}
</section>
</div>
<div class="item item-6">
<section class="image-item">
<img src="https://elektropak.pl/subiekt_kopia/foto/${productData.productSku}^2.jpg" />
</section>
</div>
</section>
<section class="section">
<div class="item item-12">
<section class="text-item">
<p><strong>Składniki&nbsp; &nbsp;${productData.portion.portionAmount} ${
      productData.portion.unit
    }&nbsp; &nbsp;RWS</strong></p>
<p><strong>_________________________________________________</strong></p>
${ingredientsHTML} <!-- Wstawienie wygenerowanego HTML składników -->
<p><strong>_________________________________________________</strong></p>
${productData.tableEnd}
</section>
</div>
</section>
  ${descriptionHTML}
<section class="section">
<div class="item item-12">
<section class="text-item">
${specialFeaturesHTML}
${
  productData.bulletpoints !== ""
    ? `<h2>Dlaczego warto stosować?:</h2>${productData.bulletpoints}`
    : ""
}
<h2>Składniki:</h2>
${productData.ingredients}
<h2>Informacja:</h2>
${productData.additionalInformation}
<h2>Producent:</h2>
${productData.producer.bl}
${
  productData.responsibleEntity.shop !== ""
    ? `<h2>Podmiot odpowiedzialny:</h2>${productData.responsibleEntity.bl}`
    : ""
}
</section>
</div>
</section>`;

    // SHOP CODE

    const newHtmlToShop = `
<div class="row">
<div class="col-md-6">
<div class="left-column">
  ${descriptionHTML}
<h3>Skład:</h3>
<p>Wielkość opakowania: <strong>${productData.size.sizeAmount} ${
      productData.size.unit
    }</strong></p>
<p>Porcja jednorazowa: <strong>${productData.portion.portionAmount} ${
      productData.portion.unit
    }</strong></p>
<p>Ilość porcji w opakowaniu: <strong>${
      productData.portionQuantity
    }</strong></p>
<div class="table-responsive">
<table class="table table-hover">
<thead class="table-lighter">
<tr>
<th>Składniki</th>
<th>${productData.portion.portionAmount} ${productData.portion.unit}</th>
<th>RWS</th>
</tr>
</thead>
<tbody>
${tableHtmlToShop}
</tbody>
</table>
</div>
${productData.tableEnd}
<h3>Składniki:</h3>
<p>${productData.ingredients}</p>
</div>
</div>
<div class="col-md-6">
<div class="right-column">
${
  productData.bulletpoints
    ? `<h2>Dlaczego warto stosować?</h2><p>${productData.bulletpoints}</p>`
    : ""
}
<h3>Sposób użycia:</h3>
${productData.howToUse}
<h3>Przeciwwskazania:</h3>
${productData.contraindications}
<h3>Przechowywanie:</h3>
${productData.storage}
<h3>Informacja:</h3>
${productData.additionalInformation}
<h4>Producent:</h4>
${productData.producer.shop}
${
  productData.responsibleEntity.shop
    ? `<h2>Podmiot odpowiedzialny:</h2>${productData.responsibleEntity.shop}`
    : ""
}
</div>
</div>
</div>`;

    setHtmlToShop(replaceH2WithH3(newHtmlToShop));
    setHtmlToBl(newHtmlToBl);

    toast.success("Kod został wygenerowany...");
  };

  // COSMETICS GENERATOR FUNCTION

  const generateCodeCosmetics = () => {
    const ingredientsHTML = generateIngredientsHTML(); // generowanie HTML dla składników
    const specialFeaturesHTML = generateSpecialFeaturesList();
    const tableHtmlToShop = ingredientTableHtmlToShop();

    // BASELINKER CODE

    const newHtmlToBl = `
<section class="section">
<div class="item item-12">
<section class="text-item">
<h1>${productData.productName}</h1>
${productData.shortDescription}
</section>
</div>
</section>
<section class="section">
<div class="item item-6">
<section class="image-item">
<img src="#" />
</section>
</div>
<div class="item item-6">
<section class="text-item">
${productData.cosmeticsDescription1}
</section>
</div>
</section>
<section class="section">
<div class="item item-6">
<section class="text-item">
${productData.cosmeticsDescription2}
</section>
</div>
<div class="item item-6">
<section class="image-item">
<img src="#" />
</section>
</div>
</section>

${
  productData.ingredientsTable[0].ingredient !== ""
    ? `
    <section class="section">
    <div class="item item-12">
    <section class="text-item">
      <p>
        <strong>Składniki&nbsp; &nbsp;${productData.portion.portionAmount} ${productData.portion.unit}&nbsp; &nbsp;RWS</strong>
      </p>
      <p>
        <strong>_________________________________________________</strong>
      </p>
      ${ingredientsHTML}
      <p>
        <strong>_________________________________________________</strong>
      </p>
      ${productData.tableEnd}
    </section>
    </div>
    </section>
    `
    : ""
}

<section class="section">
<div class="item item-12">
<section class="text-item">
${specialFeaturesHTML}
${productData.cosmeticsDescription3}
${productData.cosmeticsDescription4}
</section>
</div>
</section>
`;

    // SHOP CODE

    const newHtmlToShop = `
<div class="row">
<div class="col-md-6">
<div class="left-column">
          ${productData.cosmeticsDescription1}
          ${productData.cosmeticsDescription2}
          ${productData.cosmeticsDescription3}
</div>
</div>
<div class="col-md-6">
<div class="right-column">
${
  productData.ingredientsTable[0].ingredient !== ""
    ? `
<h3>Wartości odżywcze:</h3> 
<div class="table-responsive">
<table class="table table-hover">
<thead class="table-lighter">
<tr>
<th>Składniki</th>
<th>${productData.portion.portionAmount} ${productData.portion.unit}</th>
<th>RWS</th>
</tr>
</thead>
<tbody>
   ${tableHtmlToShop}
</tbody>
</table>
</div>
    ${productData.tableEnd}
            `
    : ""
}
           ${productData.cosmeticsDescription4}
</div>
</div>
</div>`;

    setHtmlToShop(replaceH2WithH3(newHtmlToShop));
    setHtmlToBl(replaceH3WithH2(newHtmlToBl));
    toast.success("Kod został wygenerowany...");
  };

  return (
    <div className={style.generator}>
      <header className={style.generator__header}>
        <h2>Medpak Code Generator</h2>
        <div className={style["generator__header-btns"]}>
          <Button onClick={() => setType("supplements")}>
            Suplementy diety
          </Button>
          <Button onClick={() => setType("cosmetics")}>Kosmetyki/inne</Button>
        </div>
      </header>
      <div className={style.generator__content}>
        {type === "supplements" && (
          <div>
            <SupplementsForm resetKey={resetKey} />
          </div>
        )}

        {type === "cosmetics" && (
          <div className={style.generator__cosmetics}>
            <CosmeticsForm resetKey={resetKey} />
          </div>
        )}
        {(type === "cosmetics" || type === "supplements") && (
          <GeneratorBtns
            productType={type}
            generateCode={generateCode}
            generateCodeCosmetics={generateCodeCosmetics}
            sendToGoogleSheets={sendToGoogleSheets}
            resetForm={resetForm}
            copyHtmlToShop={copyHtmlToShop}
            copyShortDescToShop={copyShortDescToShop}
            copyHtmlToBl={copyHtmlToBl}
            htmlToShop={htmlToShop}
            htmlToBl={htmlToBl}
            style={style}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCodeGenerator;
