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
  copyHtmlToBl,
  htmlToShop,
  htmlToBl,
  style,
}) => (
  <div>
    <div>
      <Button
        onClick={
          productType === "cosmetics" ? generateCodeCosmetics : generateCode
        }
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
        <Button onClick={copyHtmlToShop}>Skopiuj kod HTML dla sklepu</Button>
        <Button onClick={copyShortDescToShop}>
          Skopiuj kod HTML krótkiego opisu dla sklepu
        </Button>
        <Button onClick={copyHtmlToBl}>Skopiuj kod HTML dla baselinkera</Button>
      </div>
    )}
  </div>
);

export default GeneratorBtns;
