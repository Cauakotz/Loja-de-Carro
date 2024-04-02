let clientes = [];
let carros = [];
let vendas = [];

// Função para inicializar o aplicativo
function init() {
  // Verifica se há dados armazenados no LocalStorage e os carrega
  if (localStorage.getItem('clientes')) {
    clientes = JSON.parse(localStorage.getItem('clientes'));
    exibirClientes();
  }
  if (localStorage.getItem('carros')) {
    carros = JSON.parse(localStorage.getItem('carros'));
    exibirCarros();
  }
  if (localStorage.getItem('vendas')) {
    vendas = JSON.parse(localStorage.getItem('vendas'));
    exibirVendas();
  }
}

// Função para exibir clientes na tabela
function exibirClientes() {
  const listaClientes = document.getElementById('listaClientes');
  listaClientes.innerHTML = '';
  clientes.forEach(cliente => {
    listaClientes.innerHTML += `
      <tr>
        <td>${cliente.nome}</td>
        <td>${cliente.endereco}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.email}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editarCliente(${cliente.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirCliente(${cliente.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

// Função para adicionar ou editar cliente
function adicionarEditarCliente(form) {
  const formData = new FormData(form);
  const cliente = {
    id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
    nome: formData.get('nome'),
    endereco: formData.get('endereco'),
    telefone: formData.get('telefone'),
    email: formData.get('email')
  };
  const index = clientes.findIndex(c => c.id === cliente.id);
  if (index === -1) {
    clientes.push(cliente);
  } else {
    clientes[index] = cliente;
  }
  localStorage.setItem('clientes', JSON.stringify(clientes));
  form.reset();
  exibirClientes();
}

// Função para editar cliente
function editarCliente(id) {
  const cliente = clientes.find(c => c.id === id);
  if (cliente) {
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('endereco').value = cliente.endereco;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('email').value = cliente.email;
  }
}

// Função para excluir cliente
function excluirCliente(id) {
  clientes = clientes.filter(cliente => cliente.id !== id);
  localStorage.setItem('clientes', JSON.stringify(clientes));
  exibirClientes();
}

// Função para exibir carros na tabela
function exibirCarros() {
  const listaCarros = document.getElementById('listaCarros');
  listaCarros.innerHTML = '';
  carros.forEach(carro => {
    listaCarros.innerHTML += `
      <tr>
        <td>${carro.marca}</td>
        <td>${carro.modelo}</td>
        <td>${carro.ano}</td>
        <td>${carro.tipo}</td>
        <td>${carro.preco}</td>
        <td>${carro.disponibilidade ? 'Disponível' : 'Indisponível'}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editarCarro(${carro.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirCarro(${carro.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

// Função para adicionar ou editar carro
function adicionarEditarCarro(form) {
  const formData = new FormData(form);
  const carro = {
    id: carros.length > 0 ? carros[carros.length - 1].id + 1 : 1,
    marca: formData.get('marca'),
    modelo: formData.get('modelo'),
    ano: formData.get('ano'),
    tipo: formData.get('tipo'),
    preco: formData.get('preco'),
    disponibilidade: formData.get('disponibilidade') === 'true'
  };
  const index = carros.findIndex(c => c.id === carro.id);
  if (index === -1) {
    carros.push(carro);
  } else {
    carros[index] = carro;
  }
  localStorage.setItem('carros', JSON.stringify(carros));
  form.reset();
  exibirCarros();
}

// Função para editar carro
function editarCarro(id) {
  const carro = carros.find(c => c.id === id);
  if (carro) {
    document.getElementById('marca').value = carro.marca;
    document.getElementById('modelo').value = carro.modelo;
    document.getElementById('ano').value = carro.ano;
    document.getElementById('tipo').value = carro.tipo;
    document.getElementById('preco').value = carro.preco;
    document.getElementById('disponibilidade').value = carro.disponibilidade;
  }
}

// Função para excluir carro
function excluirCarro(id) {
  carros = carros.filter(carro => carro.id !== id);
  localStorage.setItem('carros', JSON.stringify(carros));
  exibirCarros();
}

// Função para exibir vendas na tabela
function exibirVendas() {
  const historicoVendas = document.getElementById('historicoVendas');
  historicoVendas.innerHTML = '';
  vendas.forEach(venda => {
    const cliente = clientes.find(c => c.id === venda.clienteId);
    const carro = carros.find(c => c.id === venda.carroId);
    historicoVendas.innerHTML += `
      <tr>
        <td>${venda.data}</td>
        <td>${cliente ? cliente.nome : '-'}</td>
        <td>${carro ? `${carro.marca} ${carro.modelo}` : '-'}</td>
        <td>${venda.valorTotal}</td>
      </tr>
    `;
  });
}

// Função para registrar venda
function registrarVenda(form) {
  const formData = new FormData(form);
  const venda = {
    data: new Date().toLocaleDateString(),
    clienteId: parseInt(formData.get('cliente')),
    carroId: parseInt(formData.get('carro')),
    valorTotal: calcularValorTotal(formData)
  };
  vendas.push(venda);
  localStorage.setItem('vendas', JSON.stringify(vendas));
  form.reset();
  exibirVendas();
}

// Função para calcular o valor total da venda
function calcularValorTotal(formData) {
  // Lógica para calcular o valor total da venda aqui
  return 0; 
}
init();
