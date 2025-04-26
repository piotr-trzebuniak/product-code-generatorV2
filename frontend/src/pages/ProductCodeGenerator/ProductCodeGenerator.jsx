import React, { useState } from "react";
import style from "./ProductCodeGenerator.module.scss";
import Button from "../../compoments/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetProduct, updateProduct } from "../../redux/productSlice";
import { toast } from "react-toastify";
import SupplementsForm from "./SupplementsForm/SupplementsForm";
import CosmeticsForm from "./CosmeticsForm/CosmeticsForm";
import GeneratorBtns from "./GeneratorBtns/GeneratorBtns";
import { initialState } from "../../redux/productSlice";
import { generateBlHtml } from "../../utils/htmlTemplatesFunctions/allegroBL/generateBlHtml";
import {
  generateShopHtml,
  replaceH2WithH3,
  replaceH3WithH2,
} from "../../utils/htmlTemplatesFunctions/shopPL/generateShopHtml";
import { generateCosmeticsShopHtml } from "../../utils/htmlTemplatesFunctions/shopPL/generateCosmeticsShopHtml";
import { generateCosmeticsBlHtml } from "../../utils/htmlTemplatesFunctions/allegroBL/generateCosmeticsBlHtml";
import { translateAllFields, translateText } from "../../utils/translations";
import { generateEbayDeHtml } from "../../utils/htmlTemplatesFunctions/ebay/DE/generateEbayDeHtml";
import { generateEbayDeHtmlCosmetics } from "../../utils/htmlTemplatesFunctions/ebay/DE/generateEbayDeHtmlCosmetics";
import { generateEbayEnHtml } from "../../utils/htmlTemplatesFunctions/ebay/EN/generateEbayEnHtml";
import { generateEbayEnHtmlCosmetics } from "../../utils/htmlTemplatesFunctions/ebay/EN/generateEbayEnHtmlCosmetics";
import { generateEbayFrHtml } from "../../utils/htmlTemplatesFunctions/ebay/FR/generateEbayFrHtml";
import { generateEbayFrHtmlCosmetics } from "../../utils/htmlTemplatesFunctions/ebay/FR/generateEbayFrHtmlCosmetics";
import { generateEbayItHtml } from "../../utils/htmlTemplatesFunctions/ebay/IT/generateEbayItHtml";
import { generateEbayItHtmlCosmetics } from "../../utils/htmlTemplatesFunctions/ebay/IT/generateEbayItHtmlCosmetics";


const ProductCodeGenerator = () => {
  const [htmlToShop, setHtmlToShop] = useState("");
  const [htmlToBl, setHtmlToBl] = useState("");
  const [htmlToEbayDe, setHtmlToEbayDe] = useState("");
  const [htmlToEbayEn, setHtmlToEbayEn] = useState("");
  const [htmlToEbayFr, setHtmlToEbayFr] = useState("");
  const [htmlToEbayIt, setHtmlToEbayIt] = useState("");
  const [type, setType] = useState("");
  const [key, setKey] = useState(0);
  const [description, setDescription] = useState("");
  const [resetKey, setResetKey] = useState(false);
  
  // Stany do zarządzania przepływem interfejsu
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const [isSendingToSheets, setIsSendingToSheets] = useState(false);
  const [isDataSentToSheets, setIsDataSentToSheets] = useState(false);

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.product);

  // TRANSLATIONS FUNCTIONS

  const handleTranslate = async () => {
    setIsTranslating(true);
    setIsTranslated(false);
    
    try {
      // Użyj istniejącej funkcji translateAllFields
      const translatedData = await translateAllFields(
        productData,
        initialState,
        translateText
      );
      
      // Po zakończeniu całego procesu tłumaczenia
      setIsTranslated(true);
      setIsTranslating(false);
      dispatch(updateProduct(translatedData));
      toast.success("Dane zostały przetłumaczone 🎉");
    } catch (error) {
      setIsTranslating(false);
      toast.error("Błąd podczas tłumaczenia", error);
      console.error("Błąd tłumaczenia:", error);
    }
  };
  
  const skipTranslation = () => {
    // Pomijamy tłumaczenie i ustawiamy stan jako przetłumaczony
    setIsTranslated(true);
    toast.info("Tłumaczenie zostało pominięte");
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
    if (productData.shortDescription.pl) {
      try {
        await navigator.clipboard.writeText(productData.shortDescription.pl);
        console.log("Kod krótkiego opisu dla sklepu skopiowany do schowka.");
        toast.success("Kod krótkiego opisu dla sklepu skopiowany do schowka.");
      } catch (err) {
        console.error(
          "Nie udało się skopiować kodu krótkiego opisu dla sklepu:",
          err
        );
      }
    } else {
      toast.error("Brak wygenerowanego kodu krótkiego opisu dla sklepu.");
    }
  };

  const copyHtmlToShopAndShortDesc = async () => {
    if (htmlToShop && productData.shortDescription.pl) {

      const htmlToShopAndShortDesc = productData.shortDescription.pl + htmlToShop 
      try {
        await navigator.clipboard.writeText(htmlToShopAndShortDesc);
        console.log("Kod HTML krótkiego opisu dla sklepu + Kod HTML dla sklepu skopiowany do schowka.");
        toast.success("Kod HTML krótkiego opisu dla sklepu + Kod HTML dla sklepu skopiowany do schowka.");
      } catch (err) {
        console.error("Nie udało się skopiować kodu HTML krótkiego opisu dla sklepu + kodu HTML dla sklepu:", err);
      }
    } else {
      console.log("Brak wygenerowanego kodu HTML krótkiego opisu dla sklepu + kodu HTML dla sklepu.");
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
      toast.error("Brak kodu HTML do skopiowania.");
    }
  };
  const copyHtmlToEbayDe = async () => {
    if (htmlToEbayDe) {
      try {
        await navigator.clipboard.writeText(htmlToEbayDe);
        console.log("Kod HTML dla Ebay DE skopiowany do schowka.");
        toast.success("Kod HTML dla Ebay DE skopiowany do schowka.");
      } catch (err) {
        console.error(
          "Nie udało się skopiować kodu HTML dla Ebay DE:",
          err
        );
      }
    } else {
      toast.error("Brak kodu HTML do skopiowania.");
    }
  };
  const copyHtmlToEbayEn = async () => {
    if (htmlToEbayEn) {
      try {
        await navigator.clipboard.writeText(htmlToEbayEn);
        console.log("Kod HTML dla Ebay EN skopiowany do schowka.");
        toast.success("Kod HTML dla Ebay EN skopiowany do schowka.");
      } catch (err) {
        console.error(
          "Nie udało się skopiować kodu HTML dla Ebay EN:",
          err
        );
      }
    } else {
      toast.error("Brak kodu HTML do skopiowania.");
    }
  };
  const copyHtmlToEbayFr = async () => {
    if (htmlToEbayFr) {
      try {
        await navigator.clipboard.writeText(htmlToEbayFr);
        console.log("Kod HTML dla Ebay FR skopiowany do schowka.");
        toast.success("Kod HTML dla Ebay FR skopiowany do schowka.");
      } catch (err) {
        console.error(
          "Nie udało się skopiować kodu HTML dla Ebay FR:",
          err
        );
      }
    } else {
      toast.error("Brak kodu HTML do skopiowania.");
    }
  };
  const copyHtmlToEbayIt = async () => {
    if (htmlToEbayIt) {
      try {
        await navigator.clipboard.writeText(htmlToEbayIt);
        console.log("Kod HTML dla Ebay IT skopiowany do schowka.");
        toast.success("Kod HTML dla Ebay IT skopiowany do schowka.");
      } catch (err) {
        console.error(
          "Nie udało się skopiować kodu HTML dla Ebay IT:",
          err
        );
      }
    } else {
      toast.error("Brak kodu HTML do skopiowania.");
    }
  };

  const resetForm = () => {
    dispatch(resetProduct());
    setKey((prevKey) => prevKey + 1);

    setHtmlToShop("");
    setHtmlToBl("");
    setResetKey((prevKey) => !prevKey);
    
    // Reset stanów interfejsu
    setIsTranslating(false);
    setIsTranslated(false);
    setIsCodeGenerated(false);
    setIsSendingToSheets(false);
    setIsDataSentToSheets(false);
    
    toast.success("Formularz został zresetowany");
  };

  // API CONNECTIONS

  // const sendToGoogleSheets = () => {
  //   setIsSendingToSheets(true);
  //   setIsDataSentToSheets(false);
    
  //   const data = {
  //     Sku: productData.productSku,
  //     Html: htmlToBl,
  //   };

  //   console.log(data);

  //   // fetch("https://product-code-generatorv10.onrender.com/submit", {
  //   fetch("https://product-code-generatorv10.onrender.com/submit", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Response from backend:", data);
  //       setIsSendingToSheets(false);
  //       if (data.result === "Success") {
  //         setIsDataSentToSheets(true);
  //         toast.success("Dane zostały poprawnie wysłane do arkusza google!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       setIsSendingToSheets(false);
  //       toast.error("Nie udało się wysłać danych do arkusza google!");
  //     });
  // };

  const sendToGoogleSheets = async () => {
    setIsSendingToSheets(true);
    setIsDataSentToSheets(false);
  
    const payloads = [
      {
        Sku: productData.productSku,
        Html: htmlToBl,
        target: "baselinker",
      },
      {
        Sku: productData.productSku,
        Html: htmlToEbayDe,
        target: "ebay-de",
      },
      {
        Sku: productData.productSku,
        Html: htmlToEbayEn,
        target: "ebay-en",
      },
      {
        Sku: productData.productSku,
        Html: htmlToEbayFr,
        target: "ebay-fr",
      },
      {
        Sku: productData.productSku,
        Html: htmlToEbayFr,
        target: "ebay-it",
      }
    ];
  
    try {
      for (const payload of payloads) {
        toast.info(`Wysyłanie payloadu: ${payload.target}`)
        console.log("Wysyłanie payloadu:", payload); // <- dodaj to!
        const response = await fetch("https://product-code-generatorv2-4.onrender.com/submit", {
        // const response = await fetch("http://localhost:3000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        const result = await response.json();
        toast.success(`Wysłano do arkusza ${payload.target}:`, result)
        console.log(`Wysłano do arkusza ${payload.target}:`, result);
      }
  
      setIsSendingToSheets(false);
      setIsDataSentToSheets(true);
      toast.success("Wszystkie dane zostały poprawnie wysłane do arkuszy!");
    } catch (error) {
      console.error("Błąd wysyłania do arkuszy:", error);
      setIsSendingToSheets(false);
      toast.error("Wystąpił błąd podczas wysyłania danych do arkuszy!");
    }
  };
  


  // SUPPLEMENTS GENERATOR FUNCTION

  const generateCode = () => {
    const newHtmlToShop = generateShopHtml(productData);
    const newHtmlToBl = generateBlHtml(productData);
    const newHtmlToEbayDe = generateEbayDeHtml(productData);
    const newHtmlToEbayEn = generateEbayEnHtml(productData);
    const newHtmlToEbayFr = generateEbayFrHtml(productData);
    const newHtmlToEbayIt = generateEbayItHtml(productData);

    setHtmlToShop(replaceH2WithH3(newHtmlToShop));
    setHtmlToBl(replaceH3WithH2(newHtmlToBl));
    setHtmlToEbayDe(newHtmlToEbayDe);
    setHtmlToEbayEn(newHtmlToEbayEn);
    setHtmlToEbayFr(newHtmlToEbayFr);
    setHtmlToEbayIt(newHtmlToEbayIt);
    
    setIsCodeGenerated(true);
    toast.success("Kod został poprawnie wygenerowany");
  };

  // COSMETICS GENERATOR FUNCTION

  const generateCodeCosmetics = () => {
    const newHtmlToShop = generateCosmeticsShopHtml(productData);
    const newHtmlToBl = generateCosmeticsBlHtml(productData);
    const newHtmlToEbayDe = generateEbayDeHtmlCosmetics(productData);
    const newHtmlToEbayEn = generateEbayEnHtmlCosmetics(productData);
    const newHtmlToEbayFr = generateEbayFrHtmlCosmetics(productData);
    const newHtmlToEbayIt = generateEbayItHtmlCosmetics(productData);

    setHtmlToShop(replaceH2WithH3(newHtmlToShop));
    setHtmlToBl(replaceH3WithH2(newHtmlToBl));
    setHtmlToEbayDe(newHtmlToEbayDe);
    setHtmlToEbayEn(newHtmlToEbayEn);
    setHtmlToEbayFr(newHtmlToEbayFr);
    setHtmlToEbayIt(newHtmlToEbayIt);
    
    setIsCodeGenerated(true);
    toast.success("Kod został poprawnie wygenerowany");
  };

  return (
    <div className={style.generator}>
      <header className={style.generator__header}>
        <h2>Medpak Code Generator 2.0</h2>
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
          <>
            <GeneratorBtns
              productType={type}
              generateCode={generateCode}
              generateCodeCosmetics={generateCodeCosmetics}
              sendToGoogleSheets={sendToGoogleSheets}
              resetForm={resetForm}
              copyHtmlToShop={copyHtmlToShop}
              copyShortDescToShop={copyShortDescToShop}
              handleTranslate={handleTranslate}
              copyHtmlToBl={copyHtmlToBl}
              copyHtmlToEbayDe={copyHtmlToEbayDe}
              copyHtmlToEbayEn={copyHtmlToEbayEn}
              copyHtmlToEbayFr={copyHtmlToEbayFr}
              copyHtmlToEbayIt={copyHtmlToEbayIt}
              copyHtmlToShopAndShortDesc={copyHtmlToShopAndShortDesc}
              htmlToShop={htmlToShop}
              htmlToBl={htmlToBl}
              style={style}
              isTranslating={isTranslating}
              isTranslated={isTranslated}
              skipTranslation={skipTranslation}
              isCodeGenerated={isCodeGenerated}
              isSendingToSheets={isSendingToSheets}
              isDataSentToSheets={isDataSentToSheets}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCodeGenerator;