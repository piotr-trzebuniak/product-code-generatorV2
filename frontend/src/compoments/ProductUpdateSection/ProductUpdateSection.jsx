import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { parsePolishHtmlToProduct } from "../../utils/parsers/parsePolishHtmlToProduct";
import { updateProduct } from "../../redux/productSlice";
import style from "./ProductUpdateSection.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";

const ProductUpdateSection = () => {
  const [sku, setSku] = useState(""); // stan dla SKU
  const [productName, setProductName] = useState(""); // stan dla nazwy produktu
  const [shortDescription, setShortDescription] = useState(""); // stan dla krótkiego opisu
  const [longDescription, setLongDescription] = useState(""); // stan dla długiego opisu (HTML)
  const dispatch = useDispatch();

  const handleApply = () => {
    try {
      const partial = parsePolishHtmlToProduct(longDescription);

      if (!partial || Object.keys(partial).length === 0) {
        toast.warn(
          "Nie wykryto danych do aktualizacji. Sprawdź strukturę HTML."
        );
        return;
      }

      partial.productSku = sku;
      partial.productName = { pl: productName };

      // Jeśli użytkownik wpisał krótki opis ręcznie, użyj go zamiast automatycznego
      if (shortDescription.trim()) {
        partial.shortDescription = { pl: shortDescription };
      }
      // W przeciwnym razie zostanie ten wyciągnięty przez funkcję

      dispatch(updateProduct(partial));
      toast.success(
        "Produkt został zaktualizowany na podstawie wklejonego HTML."
      );
    } catch (e) {
      console.error(e);
      toast.error("Błąd podczas parsowania HTML.");
    }
  };

  return (
    <section>
      <h3>Aktualizacja produktu</h3>

      <div className={style.checkboxes}>
        <h4>Typ aktualizacji:</h4>
        <div className={style.checkboxes__checkbox}>
          <input type="checkbox" name="gmoFree" onChange={() => {}} />
          <span>Opis</span>
        </div>
        <div className={style.checkboxes__checkbox}>
          <input type="checkbox" name="gmoFree" onChange={() => {}} />
          <span>Zdjęcie</span>
        </div>
        <div className={style.checkboxes__checkbox}>
          <input type="checkbox" name="gmoFree" onChange={() => {}} />
          <span>Nazwa produktu</span>
        </div>
        <div className={style.checkboxes__checkbox}>
          <input type="checkbox" name="gmoFree" onChange={() => {}} />
          <span>Inna</span>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <Input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Wprowadź SKU"
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <Input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Wprowadź nazwę produktu"
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <Input
          value={shortDescription}
          className={style.input}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="Wklej tutaj krótki opis w HTML..."
          rows={6}
          style={{ width: "100%", height: "100px" }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <Input
          className={style.input}
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          placeholder="Wklej tutaj cały kod HTML..."
          rows={12}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <Button onClick={handleApply}>Autouzupełnianie pól formularza</Button>
      </div>
    </section>
  );
};

export default ProductUpdateSection;
