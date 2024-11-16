import ProductCodeGenerator from "./pages/ProductCodeGenerator";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <ProductCodeGenerator />
    </>
  );
}

export default App;
