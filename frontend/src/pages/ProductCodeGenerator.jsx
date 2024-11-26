import React, { useState } from "react";
import style from "./ProductCodeGenerator.module.scss";
import Input from "../compoments/Input/Input";
import Button from "../compoments/Button/Button";
import RwsCalc from "../compoments/RwsCalc/RwsCalc"; 
import BasicInfo from "../compoments/BasicInfo/BasicInfo";
import SpecialFeatures from "../compoments/SpecialFeatures/SpecialFeatures";
import { useDispatch, useSelector } from "react-redux";
import Table from "../compoments/Table/Table";
import {
  addIngredient,
  removeIngredient,
  resetProduct,
} from "../redux/productSlice";
import { Tiptap } from "../compoments/Tiptap/Tiptap";
import Details from "../compoments/Tiptap/Details";
import { ShortDescription } from "../compoments/Tiptap/ShortDescription";
import { Ingredients } from "../compoments/Tiptap/Ingredients";
import { HowToUse } from "../compoments/Tiptap/HowToUse";
import { Contraindications } from "../compoments/Tiptap/Contraindications";
import { Storage } from "../compoments/Tiptap/Storage";
import { AdditionalInformation } from "../compoments/Tiptap/AdditionalInformation";
import { Producer } from "../compoments/Tiptap/Producer";
import { ResponsibleEntity } from "../compoments/Tiptap/ResponsibleEntity";
import { TableEnd } from "../compoments/Tiptap/TableEnd";
import BasicInfoCosmetics from "../compoments/BasicInfoCosmetics/BasicInfoCosmetics";
import { CosmeticsDesc1 } from "../compoments/Tiptap/CosmeticsDesc1";
import { CosmeticsDesc2 } from "../compoments/Tiptap/CosmeticsDesc2";
import { CosmeticsDesc3 } from "../compoments/Tiptap/CosmeticsDesc3";
import { CosmeticsDesc4 } from "../compoments/Tiptap/CosmeticsDesc4";
import SelectProducers from "../compoments/SelectProducers/SelectProducers";
import { Bulletpoints } from "../compoments/Tiptap/Bulletpoints";
import SelectIngredient from "../compoments/SelectIngredient/SelectIngredient";
import SelectResponsibleEntity from "../compoments/SelectResponsibleEntity/SelectResponsibleEntity";
import { toast } from "react-toastify";

const ProductCodeGenerator = () => {
  const [htmlToShop, setHtmlToShop] = useState("");
  const [htmlToBl, setHtmlToBl] = useState("");

  function replaceH2WithH3(htmlString) {
    return htmlString.replace(/<h2>/g, "<h3>").replace(/<\/h2>/g, "</h3>");
  }

  const [type, setType] = useState("");
  // const [resetDescription, setResetDescription] = useState(false);
  const [key, setKey] = useState(0); // Dodany stan key

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.product);

  const handleAddIngredient = () => {
    dispatch(addIngredient());
  };

  const handleRemoveIngredient = (index) => {
    dispatch(removeIngredient());
  };

  const [description, setDescription] = useState("");

  // Funkcja do generowania HTML z tablicy składników
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

  const sendToGoogleSheets = () => {
    const data = {
      Sku: productData.productSku,
      Html: htmlToBl,
      // Photo1: productData.url1,
      // Photo2: productData.url2,
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    toast.success("Kod wysłany do arkusza google...");
  };

  const generateCode = () => {
    const ingredientsHTML = generateIngredientsHTML(); // generowanie HTML dla składników

    const descriptionHTML = productData.description
      ? `<section class="section">
<div class="item item-12">
<section class="text-item">
${productData.description}
</section>
</div>
</section>`
      : "";

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

    // Generowanie sekcji z cechami specjalnymi
    const specialFeaturesHTML = generateSpecialFeaturesList();

    const responsibleEntityBl = productData.responsibleEntity.bl;

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
<img src="#" />
</section>
</div>
<div class="item item-6">
<section class="text-item">
<h2>Skład</h2>
<p>Wielkość opakowania:<strong> ${productData.size.sizeAmount} ${productData.size.unit}</strong></p>
<p>Porcja jednorazowa: <strong> ${productData.portion.portionAmount} ${productData.portion.unit}</strong></p>
<p>Ilość porcji w opakowaniu: <strong> ${(productData.size.sizeAmount / productData.portion.portionAmount).toFixed(0)}</strong></p>
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
<img src="https://medpak.com.pl/45365-large_default/olimp-gold-omega-3-sport-edition-120-kapsulek.jpg" />
</section>
</div>
</section>
<section class="section">
<div class="item item-12">
<section class="text-item">
<p><strong>Składniki&nbsp; &nbsp;${productData.portion.portionAmount} ${productData.portion.unit}&nbsp; &nbsp;RWS</strong></p>
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

//     const ingredientsHTML2 = productData.ingredientsTable
//       .map((ingredient) => {
//         // Podstawowy składnik
//         let ingredientName = `<strong>${ingredient.ingredient}</strong>`;
//         let ingredientValue = `${ingredient.ingredientValue}`;
//         let ingredientRws = ingredient.rws ? `${ingredient.rws}` : "";

//         // Dodatkowe linie składnika
//         if (
//           ingredient.additionalLines &&
//           ingredient.additionalLines.length > 0
//         ) {
//           ingredient.additionalLines.forEach((line) => {
//             ingredientName += `<br>${line.ingredient}`;
//             ingredientValue += `<br>${line.ingredientValue}`;
//             ingredientRws += `<br>${line.rws || ""}`;
//           });
//         }

//         return `
// <tr>
// <td>${ingredientName}</td>
// <td>${ingredientValue}</td>
// <td>${ingredientRws}</td>
// </tr>`;
//       })
//       .join("");



const ingredientsHTML2 = productData.ingredientsTable
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

    const specialFeaturesHTML2 = generateSpecialFeaturesList();

    const newHtmlToShop = `
<div class="row">
<div class="col-md-6">
<div class="left-column">
  ${descriptionHTML}
<h3>Skład:</h3>
<p>Wielkość opakowania: <strong>${productData.size.sizeAmount} ${productData.size.unit}</strong></p>
<p>Porcja jednorazowa: <strong>${productData.portion.portionAmount} ${productData.portion.unit}</strong></p>
<p>Ilość porcji w opakowaniu: <strong>${
(productData.size.sizeAmount / productData.portion.portionAmount).toFixed(0)
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
${ingredientsHTML2}
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

    // console.log("Stan htmlToShop:", htmlToShop); // Może nie zaktualizować od razu przez asynchroniczność stanu
    // console.log("Stan htmlToBl:", htmlToBl);
  };

  const generateCodeCosmetics = () => {
    const ingredientsHTML = generateIngredientsHTML(); // generowanie HTML dla składników

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

    // Generowanie sekcji z cechami specjalnymi
    const specialFeaturesHTML = generateSpecialFeaturesList();

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
<img src="https://medpak.com.pl/45365-large_default/olimp-gold-omega-3-sport-edition-120-kapsulek.jpg" />
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

    // .............

    const ingredientsHTML2 = productData.ingredientsTable
      .map((ingredient) => {
        // Podstawowy składnik
        let ingredientHTML = `
<tr>
  <td><strong>${ingredient.ingredient}</strong></td>
  <td>${ingredient.ingredientValue}</td>
  <td>${ingredient.rws}</td>
</tr>`;

        // Dodatkowe linie składnika
        if (
          ingredient.additionalLines &&
          ingredient.additionalLines.length > 0
        ) {
          ingredient.additionalLines.forEach((line) => {
            ingredientHTML += `
    <tr>
      <td style="border-top: none; padding-top: 2px; padding-bottom: 2px;">
        ${line.ingredient}
      </td>
      <td style="border-top: none; padding-top: 2px; padding-bottom: 2px;">
        ${line.ingredientValue}
      </td>
      <td style="border-top: none; padding-top: 2px; padding-bottom: 2px;">
        ${line.rws}
      </td>
    </tr>`;
          });
        }
        return ingredientHTML;
      })
      .join("");

    const specialFeaturesHTML2 = generateSpecialFeaturesList();

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
<th>${productData.portion}</th>
<th>RWS</th>
</tr>
</thead>
<tbody>
   ${ingredientsHTML2}
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
    setHtmlToBl(newHtmlToBl);
    toast.success("Kod został wygenerowany...");

    // console.log("Stan htmlToShop:", htmlToShop); // Może nie zaktualizować od razu przez asynchroniczność stanu
    // console.log("Stan htmlToBl:", htmlToBl);
  };

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
      console.log("Brak wygenerowanego kodu krótkiego opisu dla sklepu.");
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
      console.log("Brak wygenerowanego kodu HTML dla Baselinkera.");
    }
  };

  const resetForm = () => {
    dispatch(resetProduct());
    setKey((prevKey) => prevKey + 1);

    setHtmlToShop("");
    setHtmlToBl("");
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
            <div className={style.generator__grid}>
              <BasicInfo />
              <SpecialFeatures />
            </div>
            <div className={style.generator__editor}>
              <ShortDescription setDescription={setDescription} key={key} />
            </div>

            <div>
              <RwsCalc />
              <Table />
              <Button onClick={handleAddIngredient}>Dodaj składnik</Button>
              <Button
                className={style.generator__deleteBtn}
                onClick={handleRemoveIngredient}
              >
                Usuń składnik
              </Button>
              <div className={style.generator__editor}>
                <TableEnd setDescription={setDescription} key={key} />
              </div>
            </div>

            <div className={style.generator__grid2}>
              <div className={style.generator__editor}>
                <Tiptap setDescription={setDescription} key={key} />
              </div>
              <div className={style.generator__editor}>
                <Ingredients setDescription={setDescription} key={key} />
              </div>
              <div className={style.generator__editor}>
                <HowToUse setDescription={setDescription} key={key} />
              </div>
              <div className={style.generator__editor}>
                <Contraindications setDescription={setDescription} key={key} />
              </div>
              <div className={style.generator__editor}>
                <AdditionalInformation
                  setDescription={setDescription}
                  key={key}
                />
              </div>
              <div className={style.generator__editor}>
                <Storage setDescription={setDescription} key={key} />
              </div>
              <div className={style.generator__select}>
                <h4>Lista producentów</h4>
                <SelectProducers />
              </div>
              <div className={style.generator__select}>
                <h4>Lista podmiotów odpowiedzialnych</h4>
                <SelectResponsibleEntity />
              </div>
              <div className={style.generator__select}>
                <h4>Lista składników</h4>
                <SelectIngredient />
              </div>
              <div className={style.generator__editor}>
                <Producer
                  setDescription={setDescription}
                  key={key}
                  initialContent={productData.producer.bl}
                />
              </div>
              <div className={style.generator__editor}>
                <ResponsibleEntity
                  setDescription={setDescription}
                  key={key}
                  initialContent={productData.responsibleEntity.bl}
                />
              </div>
              <div className={style.generator__editor}>
                <Bulletpoints
                  setDescription={setDescription}
                  key={key}
                  initialContent={productData.bulletpoints}
                />
              </div>
            </div>

            <div>
              <Button
                onClick={generateCode}
                className={style.generator__generateBtn}
              >
                Generuj kod
              </Button>
              <Button onClick={sendToGoogleSheets}>Dodaj kod do arkusza</Button>
              <Button onClick={resetForm} className={style.generator__resetBtn}>
                Resetuj formularz
              </Button>
            </div>
            {htmlToShop && htmlToBl && (
              <div>
                <Button onClick={copyHtmlToShop}>
                  Skopiuj kod HTML dla sklepu
                </Button>
                <Button onClick={copyShortDescToShop}>
                  Skopiuj kod HTML krótkiego opisu dla sklepu
                </Button>
                <Button onClick={copyHtmlToBl}>
                  Skopiuj kod HTML dla baselinkera
                </Button>
              </div>
            )}
          </div>
        )}

        {type === "cosmetics" && (
          <div className={style.generator__cosmetics}>
            <BasicInfoCosmetics />
            <SpecialFeatures />
            <div className={style.generator__editor}>
              <ShortDescription setDescription={setDescription} key={key} />
            </div>
            <div className={style["generator__cosmetics-columns"]}>
              <div>
                <div className={style.generator__editor}>
                  <CosmeticsDesc1 setDescription={setDescription} key={key} />
                </div>
                <div className={style.generator__editor}>
                  <CosmeticsDesc2 setDescription={setDescription} key={key} />
                </div>
                <div className={style.generator__editor}>
                  <CosmeticsDesc3 setDescription={setDescription} key={key} />
                </div>
              </div>
              <div>
                <div className={style.generator__editor}>
                  <CosmeticsDesc4 setDescription={setDescription} key={key} />
                </div>
              </div>
            </div>
            <div>
              <Table />
              <Button onClick={handleAddIngredient}>Dodaj składnik</Button>
              <Button
                className={style.generator__deleteBtn}
                onClick={handleRemoveIngredient}
              >
                Usuń składnik
              </Button>
              <div className={style.generator__editor}>
                <TableEnd setDescription={setDescription} key={key} />
              </div>
              <Button
                onClick={generateCodeCosmetics}
                className={style.generator__generateBtn}
              >
                Generuj kod
              </Button>
              <Button onClick={sendToGoogleSheets}>Dodaj kod do arkusza</Button>
              <Button onClick={resetForm} className={style.generator__resetBtn}>
                Resetuj formularz
              </Button>
            </div>
            {htmlToShop && htmlToBl && (
              <div>
                <Button onClick={copyHtmlToShop}>
                  Skopiuj kod HTML dla sklepu
                </Button>
                <Button onClick={copyHtmlToBl}>
                  Skopiuj kod HTML dla baselinkera
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCodeGenerator;
