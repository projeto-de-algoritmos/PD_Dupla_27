import "../mochila.css";
import { React, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";

let q_item = [];
let troco = 0;
let troco2 = 0;

function Mochilas() {
  class Item {
    constructor(name, value, qty) {
      this.name = name;
      this.value = value;
      this.qty = qty;
      this.color = "green";
    }
  }
  const initialInputState = {
    name: "sabonete",
    value: 1.5,
    qty: 1,
    color: "green",
  };
  const [items, setItems] = useState([]);
  const [result, setResult] = useState();
  const [form, setForm] = useState(initialInputState);
  const [dinheiro, setDinheiro] = useState(0);
  const [visibleTroco, setVisibleTroco] = useState(false);
  // const [troco2, setTroco2] = useState(0);

  useEffect(() => {}, [items]);

  return <div className="mochila">mochila</div>;
}

export default Mochilas;
