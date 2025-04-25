import React from "react";
import Button from "../../../compoments/Button/Button";

const GeneratorBtns = ({
  productType,
  generateCode,
  generateCodeCosmetics,
  sendToGoogleSheets,
  resetForm,
  copyHtmlToShop,
  copyShortDescToShop,
  copyHtmlToShopAndShortDesc,
  copyHtmlToBl,
  copyHtmlToEbayDe,
  copyHtmlToEbayEn,
  copyHtmlToEbayFr,
  copyHtmlToEbayIt,
  htmlToShop,
  htmlToBl,
  style,
  handleTranslate,
  skipTranslation,
  isTranslating,
  isTranslated,
  isCodeGenerated,
  isSendingToSheets,
  isDataSentToSheets,
}) => {
  return (
    <div className={style.generator__btns}>
      {/* Krok 1: Przyciski tłumaczenia */}
      <div className={style.generator__translationBtn}>
        {/* {!isTranslated && ( */}
          <>
            <Button 
              onClick={handleTranslate} 
              disabled={isTranslating}
              className={style.generator__translateBtn}
            >
              {isTranslating ? "Tłumaczenie w toku..." : "Przetłumacz"}
            </Button>
            <Button 
              onClick={skipTranslation} 
              disabled={isTranslating}
              className={style.generator__skipTranslateBtn}
            >
              Pomiń tłumaczenie
            </Button>
          </>
        {/* )} */}
      </div>

      {/* Wskaźniki stanu tłumaczenia */}
      {isTranslating && (
        <div className={style.generator__translationStatus}>
          <div className={style.generator__translationItem}>
            <span>Dane są tłumaczone...</span>
            <div className={style.generator__loadingIcon}>
              {/* Ikona ładowania */}
              <div className={style.generator__spinner}></div>
            </div>
          </div>
        </div>
      )}

      {isTranslated && (
        <div className={style.generator__translationStatus}>
          <div className={style.generator__translationItem}>
            <span>Dane zostały poprawnie przetłumaczone!!! ✅</span>
            <div className={style.generator__successIcon}>
              {/* Ikona zielonej "okejki" */}
              <div className={style.generator__checkmark}></div>
            </div>
          </div>
        </div>
      )}

      {/* Krok 2: Przycisk generowania kodu (pojawia się po tłumaczeniu) */}
      {/* {isTranslated && !isCodeGenerated && ( */}
        <Button
          onClick={productType === "cosmetics" ? generateCodeCosmetics : generateCode}
          className={style.generator__generateBtn}
        >
          Generuj kod
        </Button>
      {/* )} */}

      {/* Informacja o wygenerowaniu kodu */}
      {isCodeGenerated && (
        <div className={style.generator__codeGeneratedInfo}>
          <span>Kod został poprawnie wygenerowany!!! ✅</span>
          <div className={style.generator__successIcon}>
            {/* Ikona zielonej "okejki" */}
            <div className={style.generator__checkmark}></div>
          </div>
        </div>
      )}

      {/* Krok 3: Przyciski do kopiowania kodu (pojawiają się po generacji) */}
      {isCodeGenerated && htmlToShop && htmlToBl && (
        <div className={style.generator__copyBtns}>
          <Button onClick={copyHtmlToShop} className={style.generator__copyBtn}>
            Kod HTML dla sklepu
          </Button>
          <Button onClick={copyShortDescToShop} className={style.generator__copyBtn}>
            Kod HTML krótkiego opisu dla sklepu
          </Button>
          <Button onClick={copyHtmlToShopAndShortDesc} className={style.generator__copyBtn}>
            Kod HTML krótkiego opisu dla sklepu + Kod HTML dla sklepu
          </Button>
          <Button onClick={copyHtmlToBl} className={style.generator__copyBtn}>
            Kod HTML dla BaseLinkera
          </Button>
          <Button onClick={copyHtmlToEbayDe} className={style.generator__copyBtn}>
            Kod HTML dla EBAY DE
          </Button>
          <Button onClick={copyHtmlToEbayEn} className={style.generator__copyBtn}>
            Kod HTML dla EBAY EN
          </Button>
          <Button onClick={copyHtmlToEbayFr} className={style.generator__copyBtn}>
            Kod HTML dla EBAY FR
          </Button>
          <Button onClick={copyHtmlToEbayIt} className={style.generator__copyBtn}>
            Kod HTML dla EBAY IT
          </Button>
        </div>
      )}

      {/* Krok 4: Przycisk dodawania do arkusza (pojawia się po generacji) */}
      {isCodeGenerated && !isSendingToSheets && !isDataSentToSheets && (
        <div className={style.generator__sheetBtns}>
          <Button 
            onClick={sendToGoogleSheets} 
            className={style.generator__sheetBtn}
          >
            Dodaj kod do arkusza
          </Button>
        </div>
      )}

      {/* Status wysyłania do arkusza */}
      {isSendingToSheets && (
        <div className={style.generator__sheetStatus}>
          <span>Dane są wysyłane do arkusza...</span>
          <div className={style.generator__loadingIcon}>
            {/* Ikona ładowania */}
            <div className={style.generator__spinner}></div>
          </div>
        </div>
      )}

      {isDataSentToSheets && (
        <div className={style.generator__sheetStatus}>
          <span>Dane zostały poprawnie wysłane do arkusza!!! ✅</span>
          <div className={style.generator__successIcon}>
            {/* Ikona zielonej "okejki" */}
            <div className={style.generator__checkmark}></div>
          </div>
        </div>
      )}

      {/* Krok 5: Przycisk resetowania (pojawia się na końcu) */}
      {isDataSentToSheets && (
        <div className={style.generator__resetBtnContainer}>
          <Button onClick={resetForm} className={style.generator__resetBtn}>
            Resetuj formularz
          </Button>
        </div>
      )}
    </div>
  );
};

export default GeneratorBtns;