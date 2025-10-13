import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { parsePolishHtmlToProduct } from "../../utils/parsers/parsePolishHtmlToProduct";
import { updateProduct } from "../../redux/productSlice";

const ProductUpdateSection = () => {
  const [htmlInput, setHtmlInput] = useState("");
  const dispatch = useDispatch();

  const handleApply = () => {
    try {
      const partial = parsePolishHtmlToProduct(htmlInput);
      if (!partial || Object.keys(partial).length === 0) {
        toast.warn("Nie wykryto danych do aktualizacji. Sprawdź strukturę HTML.");
        return;
      }
      dispatch(updateProduct(partial));
      toast.success("Produkt został zaktualizowany na podstawie wklejonego HTML.");
    } catch (e) {
      console.error(e);
      toast.error("Błąd podczas parsowania HTML.");
    }
  };

  return (
    <section>
      <h3>Aktualizacja produktu</h3>
      <textarea
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
        placeholder="Wklej tutaj kod HTML z opisem produktu…"
        rows={12}
        style={{ width: "100%" }}
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={handleApply}>Zastosuj aktualizację</button>
      </div>
    </section>
  );
};

export default ProductUpdateSection;
