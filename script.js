document.addEventListener('DOMContentLoaded', function() {
  // Carregue os registros de vendas do localStorage
  var registrosVendas = JSON.parse(localStorage.getItem('registrosVendas')) || [];

  // Atualize a tabela de vendas
  atualizarTabelaVendas(registrosVendas);

  // Adiciona o formulário de clientes
  document.getElementById("clienteForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Previne o envio padrão do formulário

      var nome = document.getElementById("nome").value;
      var endereco = document.getElementById("endereco").value;
      var telefone = document.getElementById("telefone").value;
      var email = document.getElementById("email").value;

      var cliente = {
          nome: nome,
          endereco: endereco,
          telefone: telefone,
          email: email
      };

      // Adiciona o cliente à lista de clientes
      adicionarCliente(cliente);

      this.reset(); 
  });

  // Adiciona o formulário de carros
  document.getElementById("carroForm").addEventListener("submit", function(event) {
      event.preventDefault();

      var marca = document.getElementById("marca").value;
      var modelo = document.getElementById("modelo").value;
      var ano = document.getElementById("ano").value;
      var tipo = document.getElementById("tipo").value;
      var preco = document.getElementById("preco").value;

      var carro = {
          marca: marca,
          modelo: modelo,
          ano: ano,
          tipo: tipo,
          preco: preco
      };

      // Adicione o carro à lista de carros
      adicionarCarro(carro);

      this.reset(); 
  });

  document.getElementById("vendaForm").addEventListener("submit", function(event) {
      event.preventDefault(); 

      var cliente = document.getElementById("clienteVenda").value;
      var carro = document.getElementById("carroVenda").value;
      var valorTotal = document.getElementById("valorTotalVenda").value;
      var data = new Date().toLocaleDateString(); 

      var venda = {
          data: data,
          cliente: cliente,
          carro: carro,
          valorTotal: valorTotal
      };

      var editIndex = document.getElementById("editIndex").value;
      if (editIndex !== '') {
          registrosVendas[editIndex] = venda;
      } else {
          registrosVendas.push(venda);
      }

      localStorage.setItem('registrosVendas', JSON.stringify(registrosVendas));

      atualizarTabelaVendas(registrosVendas);

      this.reset(); // Reseta todos os campos do formulário
      document.getElementById("editIndex").value = ""; 
  });

  // Função para adicionar cliente à lista de clientes
  function adicionarCliente(cliente) {
      var listaClientes = document.getElementById("listaClientes");

      var novaLinha = listaClientes.insertRow();

      var cellNome = novaLinha.insertCell(0);
      cellNome.textContent = cliente.nome;

      var cellEndereco = novaLinha.insertCell(1);
      cellEndereco.textContent = cliente.endereco;

      var cellTelefone = novaLinha.insertCell(2);
      cellTelefone.textContent = cliente.telefone;

      var cellEmail = novaLinha.insertCell(3);
      cellEmail.textContent = cliente.email;
  }

  // Função para adicionar carro à lista de carros
  function adicionarCarro(carro) {
      var listaCarros = document.getElementById("listaCarros");

      var novaLinha = listaCarros.insertRow();

      var cellMarca = novaLinha.insertCell(0);
      cellMarca.textContent = carro.marca;

      var cellModelo = novaLinha.insertCell(1);
      cellModelo.textContent = carro.modelo;

      var cellAno = novaLinha.insertCell(2);
      cellAno.textContent = carro.ano;

      var cellTipo = novaLinha.insertCell(3);
      cellTipo.textContent = carro.tipo;

      var cellPreco = novaLinha.insertCell(4);
      cellPreco.textContent = carro.preco;
  }

  // Função para editar uma venda
  function editarVenda(index) {
      var venda = registrosVendas[index];

      document.getElementById("clienteVenda").value = venda.cliente;
      document.getElementById("carroVenda").value = venda.carro;
      document.getElementById("valorTotalVenda").value = venda.valorTotal;

      document.getElementById("editIndex").value = index;
  }

  // Função para excluir uma venda da lista
  function excluirVenda(index) {

      registrosVendas.splice(index, 1);

      localStorage.setItem('registrosVendas', JSON.stringify(registrosVendas));

      atualizarTabelaVendas(registrosVendas);
  }

  // Função para atualizar a tabela de vendas
  function atualizarTabelaVendas(registrosVendas) {
      var historicoVendas = document.getElementById("historicoVendas");
      historicoVendas.innerHTML = ""; 

      registrosVendas.forEach(function(venda, index) {
          var novaLinha = historicoVendas.insertRow();
          novaLinha.innerHTML = `
              <td>${venda.data}</td>
              <td>${venda.cliente}</td>
              <td>${venda.carro}</td>
              <td>${venda.valorTotal}</td>
              <td>
                  <button onclick="editarVenda(${index})" class="btn btn-primary btn-sm">Editar</button>
                  <button onclick="excluirVenda(${index})" class="btn btn-danger btn-sm">Excluir</button>
              </td>
          `;
      });
  }
});
