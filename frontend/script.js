const empresas = [
  {
    cnpj: "12345678000190",
    razaoSocial: "Alpha Tecnologia LTDA",
    situacao: "ATIVA",
    atividade: "Desenvolvimento de software",
    socios: [
      { id: 1, nome: "Leticia Teles", qualificacao: "Sócio" },
      { id: 2, nome: "Chapeu de Palha", qualificacao: "Sócia" }
    ]
  },
  {
    cnpj: "98765432000110",
    razaoSocial: "Beta Comércio SA",
    situacao: "ATIVA",
    atividade: "Comércio varejista",
    socios: [
      { id: 1, nome: "Leticia Teles", qualificacao: "Sócio" },
      { id: 3, nome: "Harvey Spectar", qualificacao: "Sócio" }
    ]
  },
  {
    cnpj: "55555555000155",
    razaoSocial: "Gamma Serviços LTDA",
    situacao: "INATIVA",
    atividade: "Serviços administrativos",
    socios: [
      { id: 4, nome: "Ana Lima", qualificacao: "Sócia" }
    ]
  },
  {
    cnpj: "11111111000111",
    razaoSocial: "Delta Participações LTDA",
    situacao: "ATIVA",
    atividade: "Holdings",
    socios: [
      { id: 1, nome: "Leticia Teles", qualificacao: "Sócio" },
      { id: 4, nome: "Ana Lima", qualificacao: "Sócia" }
    ]
  }
];

let historicoPesquisas = [];

function preencherCNPJ(cnpj) {
  document.getElementById("cnpjInput").value = cnpj;
}

function consultarEmpresa() {
  const cnpjDigitado = document.getElementById("cnpjInput").value.trim();
  const resultado = document.getElementById("resultado");

  if (cnpjDigitado === "") {
    resultado.innerHTML = `
      <div class="erro">
        Digite um CNPJ para realizar a consulta.
      </div>
    `;
    return;
  }

  const empresa = empresas.find(item => item.cnpj === cnpjDigitado);

  if (!empresa) {
    resultado.innerHTML = `
      <div class="erro">
        Empresa não encontrada na base de amostra.
      </div>
    `;
    return;
  }

  adicionarAoHistorico(cnpjDigitado);

  const relacionadas = identificarEmpresasRelacionadas(empresa);
  const risco = calcularRisco(empresa, relacionadas);

  resultado.innerHTML = `
    <section class="bloco">
      <h3>Dados da Empresa</h3>

      <div class="grid">
        <div class="info">
          <strong>CNPJ</strong>
          ${empresa.cnpj}
        </div>

        <div class="info">
          <strong>Razão Social</strong>
          ${empresa.razaoSocial}
        </div>

        <div class="info">
          <strong>Situação</strong>
          ${empresa.situacao}
        </div>

        <div class="info">
          <strong>Atividade Principal</strong>
          ${empresa.atividade}
        </div>
      </div>
    </section>

    <section class="bloco">
      <h3>Sócios</h3>

      <ul class="lista">
        ${empresa.socios.map(socio => `
          <li>
            <strong>${socio.nome}</strong><br>
            ${socio.qualificacao}
          </li>
        `).join("")}
      </ul>
    </section>

    <section class="bloco">
      <h3>Empresas Relacionadas</h3>

      ${
        relacionadas.length > 0
          ? `<ul class="lista">
              ${relacionadas.map(item => `
                <li>
                  <strong>${item.razaoSocial}</strong><br>
                  CNPJ: ${item.cnpj}
                </li>
              `).join("")}
            </ul>`
          : "<p>Nenhuma empresa relacionada encontrada na amostra.</p>"
      }
    </section>

    <section class="bloco">
      <h3>Relatório Básico de Risco</h3>

      <div class="risco ${risco.nivel.toLowerCase()}">
        Nível de risco: ${risco.nivel}
      </div>

      <ul class="lista">
        ${risco.motivos.map(motivo => `<li>${motivo}</li>`).join("")}
      </ul>
    </section>
  `;
}

function identificarEmpresasRelacionadas(empresaSelecionada) {
  const idsSocios = empresaSelecionada.socios.map(socio => socio.id);

  return empresas.filter(empresa => {
    const naoEhMesmaEmpresa = empresa.cnpj !== empresaSelecionada.cnpj;

    const possuiSocioEmComum = empresa.socios.some(socio =>
      idsSocios.includes(socio.id)
    );

    return naoEhMesmaEmpresa && possuiSocioEmComum;
  });
}

function calcularRisco(empresa, relacionadas) {
  let pontos = 0;
  let motivos = [];

  if (empresa.situacao !== "ATIVA") {
    pontos += 40;
    motivos.push("Empresa com situação cadastral diferente de ATIVA.");
  }

  if (relacionadas.length >= 2) {
    pontos += 30;
    motivos.push("Sócios aparecem em várias empresas relacionadas.");
  }

  if (motivos.length === 0) {
    motivos.push("Nenhum fator crítico identificado na amostra analisada.");
  }

  let nivel = "BAIXO";

  if (pontos >= 60) {
    nivel = "ALTO";
  } else if (pontos >= 30) {
    nivel = "MÉDIO";
  }

  return {
    nivel,
    motivos
  };
}

function adicionarAoHistorico(cnpj) {
  historicoPesquisas = historicoPesquisas.filter(item => item !== cnpj);

  historicoPesquisas.unshift(cnpj);

  if (historicoPesquisas.length > 4) {
    historicoPesquisas.pop();
  }

  atualizarHistorico();
}

function atualizarHistorico() {
  const listaHistorico = document.getElementById("listaHistorico");

  if (historicoPesquisas.length === 0) {
    listaHistorico.innerHTML = "<p>Nenhuma pesquisa realizada ainda.</p>";
    return;
  }

  listaHistorico.innerHTML = historicoPesquisas.map(cnpj => `
    <span onclick="pesquisarHistorico('${cnpj}')">${cnpj}</span>
  `).join("");
}

function pesquisarHistorico(cnpj) {
  document.getElementById("cnpjInput").value = cnpj;
  consultarEmpresa();
}
