// codigo para page recados

const tableBody = document.getElementById("table-body");
const addItem = document.getElementById("add-item");
const API_URL = "https://recados-backend-victor.herokuapp.com/recados"

async function getInfos() {
  const response = await fetch(API_URL);
  const recados = await response.json();
  mostrarRecados(recados);
}

getInfos();

// Funcao para add recados

async function addRecados(event) {
  event.preventDefault();
  const descricao = document.getElementById('register-descrition').value
  const detalhamento = document.getElementById('register-details').value

  const newItem = {
    descricao,
    detalhamento,
  };

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  getInfos();
}

// Funcao para alterar um recado

async function alterarRecados(id) {
  const descricao = prompt("digite a nova descricao");
  const detalhamento = prompt("digite o novo detalhe");

  const values = {
    descricao,
    detalhamento,
  };

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  getInfos();
}

// Funcao para mostrar recados

function mostrarRecados(recados) {
  tableBody.innerHTML = "";
  return recados.map((recado) => {
    console.log(recado);

    const html_recado = `
        <tr class="table-active" method="post">
            <td>${recado.id}</td>
            <td>${recado.descricao}</td>
            <td>${recado.detalhamento}</td>
            <td>
                <button type="button" class="btn btn-success" onClick="alterarRecados(${recado.id})">editar</i></button>
                <button type="button" class="btn btn-danger btn-delete-item" onClick="removerRecados(${recado.id})">apagar</button>
            </td>
        </tr>
    `
    tableBody.insertAdjacentHTML('beforeend', html_recado)
  });
}

async function removerRecados(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  getInfos();
}
