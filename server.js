const express = require('express');

const app = express();

const porta = 8080;

const bdProdutos = [
  {
    id: 0,
    nome: "Pão",
    preco: 4
  },
  {
    id: 1,
    nome: "Suco",
    preco: 5
  },
  {
    id: 2,
    nome: "Arroz",
    preco: 20.50
  },
  {
    id: 3,
    nome: "Feijão",
    preco: 9.90
  },
  {
    id: 4,
    nome: "Farinha de trigo",
    preco: 3.15
  }
];
let carrinho = [];
let pedidos = [];

app.use(express.json()) // for parsing application/json

app.get("/listar-produtos", (req, res) => {
  res.send(JSON.stringify(bdProdutos));
});

app.post("/adicionar-carrinho", (req, res) => {
  const dados = req.body;

  const tempProduto = bdProdutos.find((produto) => produto.id === Number(dados.id));
  if(tempProduto){
    const tam = carrinho.length;
    carrinho.push(
      {
        idCarrinho: tam ? carrinho[tam - 1].idCarrinho + 1 : 0,
        produto: tempProduto,
        quantidade: Number(dados.quantidade)
      }
    );
    res.send("Produto adicionado com sucesso!\n");
  } else{
    res.send("Id inválida\n");
  }
});

app.post("/remover-carrinho", (req, res) => {
  const dados = req.body;

  const tempProduto2 = carrinho.find((produto) => produto.idCarrinho === Number(dados.id));
  if(tempProduto2){
    const tempCarrinho = carrinho.filter((produto) => produto.idCarrinho !== Number(dados.id));
    carrinho = tempCarrinho;
    res.send("Produto removido com sucesso\n");
  } else {
    res.send("Id inválida\n");
  }
});

app.get("/listar-carrinho", (req, res) => {
  res.send(JSON.stringify(carrinho));
});

app.post("/pagar", (req, res) => {
  if(carrinho.length){
    const tam = pedidos.length;
    pedidos.push(
      {
        idPedido: tam ? pedidos[tam - 1].idPedido + 1 : 0,
        produtos: carrinho.map((produto) => {
          const {idCarrinho, ...resto} = produto;
          return {...resto};
        }),
        status: "Pago"
      }
    );
    carrinho = [];
    res.send("Pedido pago com sucesso!\n");
  } else {
    res.send("O carrinho está vazio\n");
  }
});

app.put("/solicitar-entrega", (req, res) => {
  const dados = req.body;

  const tempPedido = pedidos.find((pedido) => pedido.idPedido === Number(dados.id));
  if(tempPedido){
    const tempPedidos = pedidos.map((pedido) => {
      if(pedido.idPedido === Number(dados.id)){
        return {...pedido, status: "Entrega solicitada"}
      } else{
        return pedido;
      }
    });
    pedidos = tempPedidos;
    res.send("Entrega solicitada com sucesso\n");
  } else {
    res.send("Id inválida\n");
  }
});

app.get("/listar-pedidos", (req, res) => {
  res.send(JSON.stringify(pedidos));
});

app.listen(porta, () => {
  console.log("Servidor iniciado!");
});