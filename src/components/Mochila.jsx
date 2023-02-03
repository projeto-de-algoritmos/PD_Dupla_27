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

  useEffect(() => {}, [items]);

  const onSubmit = () => {
    setResult(null);
    setVisibleTroco(false);

    updateItems(form);
  };

  const updateItems = (newJob) => {
    const item = new Item(newJob.name, newJob.value, newJob.qty);
    setItems([...items, item]);
  };
  const findTotal = () => {
    var dinheiro = document.getElementById("dinheiro").value;

    for (let i = 0; i < items.length; i++) {
      const newItems = [...items];
      newItems[i].buyed_qty = 0;
      setItems(newItems);
    }

    const sortedItems = items.sort((a, b) => a.value - b.value);

    setResult(sortedItems);
    for (let i = 0; i < sortedItems.length; i++) {
      q_item[i] = sortedItems[i].qty;
    }

    for (let i = 0; i < sortedItems.length; i++) {
      while (q_item[i] > 0) {
        dinheiro -= sortedItems[i].value;
        q_item[i]--;

        const newItems = [...sortedItems];
        newItems[i].buyed_qty += 1;
        setResult(newItems);

        troco = dinheiro;
      }
    }

    setDinheiro(dinheiro);
    troco2 = troco;
    // setTroco2(troco);

    addTagItem();
  };

  const addTagItem = () => {
    const sortedItems = items.sort((a, b) => a.value - b.value);

    for (const iterator of sortedItems) {
      if (troco < 0) {
        iterator.color = "red";
      } else {
        iterator.color = "green";
      }
      troco += iterator.value * iterator.qty;
      const newItems = [...sortedItems];
      setResult(newItems);
    }
  };

  const findTotal2 = () => {
    removeAllOccurrencesColor();
    setVisibleTroco(true);
  };

  const removeAllOccurrencesColor = () => {
    const sortedItems = items.sort((a, b) => a.value - b.value);

    for (const iterator of sortedItems) {
      if (troco2 < 0) {
        let newqty = iterator.qty;

        while (newqty > 0 && troco2 < 0) {
          troco2 += Number(iterator.value);
          newqty--;
        }
        if (troco2 >= 0) {
          iterator.color = "green";
        } else {
          iterator.color = "red";
        }
        iterator.qty = newqty;

        if (newqty === 0) {
          iterator.color = "black";
        }
      } else {
        iterator.color = "green";
      }
    }

    setItems(sortedItems);
    setResult(sortedItems);
    itemsToRemove();
  };

  const itemsToRemove = () => {
    const sortedItems = items.sort((a, b) => a.value - b.value);
   
    let i = 0;
    while (i < sortedItems.length) {
      if (sortedItems[i].color === "black") {
        sortedItems.splice(i, 1);
      } else {
        i++;
      }
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="main">
      <div className="container">
        <div style={{ maxWidth: "400px", textAlign: "center" }}>
          <p style={{ color: "black" }}>
            Jairo é dono de um mercadinho na cidade a mais de 30 anos. Ele
            possui uma política de compra generosa, porém um tanto suspeita. O
            mercadinho de Jairo segue as seguintes regras: <br />
            <br />
            1 - Ele não trabalha com moedas abaixo de 1 real, (mas pode lhe dar
            troco em bala. Cada bala custa 1 centavo.) <br />
            2 - Ele nunca aceita que fiquem devendo para ele.
            <br />3 - Ele exige que os clientes passem e levem primeiro os itens
            mais caros <br />
            4 - Ele sempre exige que o cliente passe todos os itens, mesmo que
            isso signifique que o cliente não vá conseguir comprar todos os
            itens que ele queira. Caso o cliente não consiga pagar todos os
            itens, Jairo bolou um algoritmo muito interessante... Ele vai
            remover os itens mais baratos do carrinho até que o cliente consiga
            comprar todos os itens. <br />
            <br />
          </p>
        </div>
      </div>
      <div className="container">
        <h2> Lista de Compras </h2>

        <form>
          <TextField
            id="standard-basic"
            label="Nome"
            variant="standard"
            value={form.name}
            name="name"
            onChange={handleInputChange}
            required
          />
          <TextField
            id="standard-basic"
            label="Valor"
            variant="standard"
            value={form.value}
            name="value"
            onChange={handleInputChange}
            type="number"
            required
          />
          <TextField
            id="standard-basic"
            label="Quantidade"
            variant="standard"
            value={form.qty}
            name="qty"
            onChange={handleInputChange}
            type="number"
            required
          />

          <Button variant="outlined" onClick={onSubmit}>
            Adicionar Item
          </Button>
        </form>

        <div style={{ overflow: "auto", maxHeight: "400px" }}>
          {items.map((item, index) => {
            return (
              <div className="">
                <table className="payment-table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Quantidade</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody align="center" className="rendered-table">
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.value}</td>
                      <td>{item.qty}</td>
                      <button
                        onClick={() => {
                          const newItems = [...items];
                          newItems.splice(index, 1);
                          setItems(newItems);
                          setResult(null);
                        }}
                      >
                        X
                      </button>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
        <div>
          <input
            id="dinheiro"
            type="number"
            placeholder="seu dinheiro"
            style={{ marginRight: "10px" }}
          />
          <button style={{ marginTop: "20px" }} onClick={findTotal}>
            Adicionar Dinheiro
          </button>
        </div>
      </div>
      <div className="container">
        <div style={{ maxWidth: "400px", textAlign: "center" }}>
          <h2> Total </h2>
          {result && (
            <div>
              {items.map((item, index) => {
                return (
                  <div className="">
                    <table className="payment-table table-striped">
                      <thead>
                        <tr
                          style={{
                            color: item.color === "red" ? "red" : "green",
                          }}
                        >
                          <th scope="col">Nome</th>
                          <th scope="col">Valor</th>
                          <th scope="col">Quantidade</th>
                        </tr>
                      </thead>
                      <tbody align="center" className="rendered-table">
                        <tr
                          style={{
                            color: item.color === "red" ? "red" : "green",
                          }}
                        >
                          <td>{item.name}</td>
                          <td>{item.value}</td>
                          <td>{item.qty}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
              {visibleTroco && (
                <div style={{ marginTop: "20px" }}>
                  <div>
                    <div>Troco: R${(troco2 - (troco2 % 1)).toFixed(2)}</div>
                    <div>Balas: {((troco2 % 1) * 100).toFixed(0)} </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <button style={{ marginTop: "20px" }} onClick={findTotal2}>
              Remover Itens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mochilas;