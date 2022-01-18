const axios = require('axios');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isInMenu = true;
let menuOption = "";

const baseUrl = "http://localhost:8080";

console.log("Digite:"+
                "\n>>>1 -> para listar os produtos"+
                "\n>>>2 -> para adicionar produtos no carrinho"+
                "\n>>>3 -> para remover produtos do carrinho"+
                "\n>>>4 -> para listar os produtos no carrinho"+
                "\n>>>5 -> para pagar os produtos no carrinho"+
                "\n>>>6 -> para solicitar a entrega de um pedido"+
                "\n>>>7 -> para listar os pedidos"
                );

rl.on('line', line => {
  if(isInMenu){
    menuOption = line.trim();
    isInMenu = false;
    if(line.trim()==="1"){
      axios.get(baseUrl+"/listar-produtos").then((res) => {
        const produtos = res.data;
      
        let mensagem = "";
    
        produtos.forEach((produto) => {
          mensagem += `Id: ${produto.id} \nNome: ${produto.nome} \nPreço: ${produto.preco}\n\n`;
        });
        console.log(mensagem);
        menuOption = "";
        isInMenu = true;
        console.log("Digite:"+
              "\n>>>1 -> para listar os produtos"+
              "\n>>>2 -> para adicionar produtos no carrinho"+
              "\n>>>3 -> para remover produtos do carrinho"+
              "\n>>>4 -> para listar os produtos no carrinho"+
              "\n>>>5 -> para pagar os produtos no carrinho"+
              "\n>>>6 -> para solicitar a entrega de um pedido"+
              "\n>>>7 -> para listar os pedidos"
              );
      }).catch((erro) => console.log("Erro ao listar produtos", erro));
    } else if(line.trim()==="2"){
      console.log("Digite a id do produto e a quantidade dele, separadas por virgula: Ex: 1, 3");
    } else if(line.trim()==="3"){
      console.log("Digite a id no carrinho do produto a ser removido do carrinho");
    } else if(line.trim()==="4"){
      axios.get(baseUrl+"/listar-carrinho").then((res) => {
        const itensCarrinho = res.data;
        let mensagem2 = "";
        let total = 0;

        itensCarrinho.forEach((produto) => {
          mensagem2 += 
            `IdCarrinho: ${produto.idCarrinho} \n`+
            `Produto: \n${`>>id: ${produto.produto.id} \n>>nome: ${produto.produto.nome} \n>>preço: ${produto.produto.preco}\n`}`+
            `Quantidade: ${produto.quantidade}\n\n`
          ;
          total += produto.produto.preco*produto.quantidade;
        });

        mensagem2 += `Total: ${total} \n`;

        if(itensCarrinho.length === 0){
          mensagem2 = "Carrinho vazio\n"
        }
        console.log(mensagem2);
        menuOption = "";
        isInMenu = true;
        console.log("Digite:"+
              "\n>>>1 -> para listar os produtos"+
              "\n>>>2 -> para adicionar produtos no carrinho"+
              "\n>>>3 -> para remover produtos do carrinho"+
              "\n>>>4 -> para listar os produtos no carrinho"+
              "\n>>>5 -> para pagar os produtos no carrinho"+
              "\n>>>6 -> para solicitar a entrega de um pedido"+
              "\n>>>7 -> para listar os pedidos"
              );
      }).catch((erro) => console.log("Erro ao listar produtos", erro));
    } else if(line.trim()==="5"){
      axios.post(baseUrl+"/pagar", {}).then((res) => {
        const mensagem = res.data;
        console.log(mensagem);
        menuOption = "";
        isInMenu = true;
        console.log("Digite:"+
              "\n>>>1 -> para listar os produtos"+
              "\n>>>2 -> para adicionar produtos no carrinho"+
              "\n>>>3 -> para remover produtos do carrinho"+
              "\n>>>4 -> para listar os produtos no carrinho"+
              "\n>>>5 -> para pagar os produtos no carrinho"+
              "\n>>>6 -> para solicitar a entrega de um pedido"+
              "\n>>>7 -> para listar os pedidos"
              );
      }).catch((erro) => console.log("Erro ao listar produtos", erro));
    } else if(line.trim()==="6"){
      console.log("Digite a id do pedido para solicitar a entrega");
    } else if(line.trim()==="7"){
      axios.get(baseUrl+"/listar-pedidos").then((res) => {
        let mensagem3 = "";
        const pedidos = res.data;

        pedidos.forEach((pedido) => {
          let tempProdutos = "";
          let total = 0;
          pedido.produtos.forEach((produto, index) => {
            tempProdutos += 
              `>Produto ${index+1}: \n${`>>id: ${produto.produto.id} \n>>nome: ${produto.produto.nome} \n>>preço: ${produto.produto.preco}\n`}`+
              `>Quantidade: ${produto.quantidade}\n`
            ;
            total += produto.produto.preco*produto.quantidade;
          });
          mensagem3 += 
            `IdPedido: ${pedido.idPedido} \n\n`+
            `Produtos: \n${tempProdutos}\n`+
            `Total: ${total}\n`+
            `Status: ${pedido.status}\n\n`
          ;
        });

        if(pedidos.length === 0){
          mensagem3 = "Sem pedidos registrados\n"
        }
        console.log(mensagem3);
        menuOption = "";
        isInMenu = true;
        console.log("Digite:"+
              "\n>>>1 -> para listar os produtos"+
              "\n>>>2 -> para adicionar produtos no carrinho"+
              "\n>>>3 -> para remover produtos do carrinho"+
              "\n>>>4 -> para listar os produtos no carrinho"+
              "\n>>>5 -> para pagar os produtos no carrinho"+
              "\n>>>6 -> para solicitar a entrega de um pedido"+
              "\n>>>7 -> para listar os pedidos"
              );
      }).catch((erro) => console.log("Erro ao listar produtos", erro));
    } else {
      menuOption = "";
      isInMenu = true;
      console.log("Você digitou uma opção inválida");
    }
  } else {
    if(menuOption==="2"){
      const params = line.split(",");

      axios.post(baseUrl+"/adicionar-carrinho", { "id": params[0], "quantidade": params[1] }).then((res) => {
        const mensagem = res.data;
        console.log(mensagem);
        menuOption = "";
        isInMenu = true;
        console.log("Digite:"+
              "\n>>>1 -> para listar os produtos"+
              "\n>>>2 -> para adicionar produtos no carrinho"+
              "\n>>>3 -> para remover produtos do carrinho"+
              "\n>>>4 -> para listar os produtos no carrinho"+
              "\n>>>5 -> para pagar os produtos no carrinho"+
              "\n>>>6 -> para solicitar a entrega de um pedido"+
              "\n>>>7 -> para listar os pedidos"
              );
      }).catch((erro) => console.log("Erro ao listar produtos", erro));
    } else if(menuOption==="3"){
      const params = line.split(",");

      axios.post(baseUrl+"/remover-carrinho", { "id": params[0] }).then((res) => {
        const mensagem = res.data;
        console.log(mensagem);
        menuOption = "";
        isInMenu = true;
        console.log("Digite:"+
              "\n>>>1 -> para listar os produtos"+
              "\n>>>2 -> para adicionar produtos no carrinho"+
              "\n>>>3 -> para remover produtos do carrinho"+
              "\n>>>4 -> para listar os produtos no carrinho"+
              "\n>>>5 -> para pagar os produtos no carrinho"+
              "\n>>>6 -> para solicitar a entrega de um pedido"+
              "\n>>>7 -> para listar os pedidos"
              );
      }).catch((erro) => console.log("Erro ao listar produtos", erro));
    } else if(menuOption==="6"){
      const params = line.split(",");

      axios.put(baseUrl+"/solicitar-entrega", { "id": params[0] }).then((res) => {
        const mensagem = res.data;
        console.log(mensagem);
        menuOption = "";
        isInMenu = true;
        console.log("Digite:"+
              "\n>>>1 -> para listar os produtos"+
              "\n>>>2 -> para adicionar produtos no carrinho"+
              "\n>>>3 -> para remover produtos do carrinho"+
              "\n>>>4 -> para listar os produtos no carrinho"+
              "\n>>>5 -> para pagar os produtos no carrinho"+
              "\n>>>6 -> para solicitar a entrega de um pedido"+
              "\n>>>7 -> para listar os pedidos"
              );
      }).catch((erro) => console.log("Erro ao listar produtos", erro));
    }
  }
});