function consultarCEP() {
  const cep = document.getElementById("cep").value;
  const resultado = document.getElementById("resultado");
  const loader = document.getElementById("loader");

  // Validação do CEP
  if (!/^\d{8}$/.test(cep)) {
    resultado.innerHTML = "CEP inválido. Digite 8 dígitos numéricos.";
    return;
  }

  // Exibir loader
  loader.style.display = "block";
  resultado.innerHTML = "";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://viacep.com.br/ws/${cep}/json/`, true);

  xhr.onload = function () {
    loader.style.display = "none";
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      if (data.erro) {
        resultado.innerHTML = "CEP não encontrado.";
      } else {
        resultado.innerHTML = `
                    <h2>Resultado:</h2>
                    <p>CEP: ${data.cep}</p>
                    <p>Logradouro: ${data.logradouro}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Cidade: ${data.localidade}</p>
                    <p>Estado: ${data.uf}</p>
                `;
      }
    } else {
      resultado.innerHTML = "Erro ao consultar o CEP. Tente novamente.";
    }
  };

  xhr.onerror = function () {
    loader.style.display = "none";
    resultado.innerHTML =
      "Erro de conexão. Verifique sua internet e tente novamente.";
  };

  xhr.send();
}
