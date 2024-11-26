import React, { useState } from "react";
import Select from "react-select";
import { ingredients } from "./ingredients";
import Input from "../Input/Input";
import style from "./RwsCalc.module.scss";

const RwsCalc = () => {
  const [amount, setAmount] = useState(null); 
  const [rws, setRws] = useState(null); 

  const handleChange = (selectedOption) => {
    if (amount && selectedOption?.value) {
      setRws(((amount / selectedOption.value) * 100).toFixed(0)); 
    } else {
      setRws(0);
    }
  };

  return (
    <div className={style.rws}>
      <h4>Kalkulator RWS</h4>
      <div className={style.rws__grid}>
        <Input
          placeholder="Ilość"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            handleChange() 
          }}
        />
        <Select
          options={ingredients}
          onChange={handleChange}
          placeholder="Wybierz składnik..."
        />
        <Input placeholder="RWS %" value={rws} readOnly /> 
      </div>
    </div>
  );
};

export default RwsCalc;