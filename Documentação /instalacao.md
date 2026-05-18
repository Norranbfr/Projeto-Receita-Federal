========================================
  GUIA DE INSTALAÇÃO — Sistema QSA Fintech
========================================

✅ PRÉ-REQUISITOS
-----------------
Antes de começar, instale os seguintes programas:

- Python 3.14        → python.org/downloads
- PostgreSQL 18      → postgresql.org/download/windows
- PyCharm            → jetbrains.com/pycharm
- VSCode             → code.visualstudio.com (para o front-end)


📁 PASSO 1 — BAIXAR O PROJETO
------------------------------
1. Acesse o repositório no GitHub:
   https://github.com/TllFabri/cnpj-data-extractor

2. Clique em Code → Download ZIP

3. Extraia a pasta na sua Área de Trabalho


🐍 PASSO 2 — CONFIGURAR O AMBIENTE PYTHON
------------------------------------------
1. Abra o PyCharm

2. Clique em File → Open e selecione a pasta extraída

3. Abra o terminal do PyCharm e crie o venv:
   python -m venv venv

4. Ative o venv:
   venv\Scripts\activate

5. Instale as bibliotecas:
   pip install -r requirements.txt


🗄️ PASSO 3 — CONFIGURAR O POSTGRESQL
--------------------------------------
1. Durante a instalação do PostgreSQL, coloque a senha:
   norran

2. Adicione o PostgreSQL no PATH do Windows:
   - Pesquise "variáveis de ambiente" no menu iniciar
   - Clique em "Editar as variáveis de ambiente do sistema"
   - Clique em "Variáveis de Ambiente"
   - Na seção "Variáveis do sistema" clique duas vezes em Path
   - Clique em Novo e adicione:
     C:\Program Files\PostgreSQL\18\bin
   - Clique OK em todas as janelas

3. Feche e reabra o terminal


📦 PASSO 4 — IMPORTAR O BANCO DE DADOS
----------------------------------------
1. Baixe o arquivo do banco "gestao_empresa" disponível
   no SAVA junto com o projeto

2. Salve o arquivo na pasta do projeto

3. Abra o terminal e crie o banco vazio:
   psql -U postgres
   (digite a senha: norran)

   Execute:
   CREATE DATABASE gestao_empresas;

   Saia com:
   \q

4. Importe o banco (substitua "caminho" pelo local do arquivo):
   pg_restore -U postgres -d gestao_empresas "caminho\gestao_empresa"

   Exemplo:
   pg_restore -U postgres -d gestao_empresas "C:\Users\SeuNome\Desktop\cnpj-data-extractor\gestao_empresa"

5. Aguarde terminar — pode demorar alguns minutos


⚙️ PASSO 5 — CONFIGURAR O ARQUIVO .env
----------------------------------------
1. Abra a pasta do projeto no PyCharm

2. Abra o arquivo .env e verifique se está assim:

   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=gestao_empresas
   DB_USER=postgres
   DB_PASSWORD=norran


🚀 PASSO 6 — RODAR O FLASK
----------------------------
1. No PyCharm, abra o arquivo main.py

2. Clique no botão Run ou pressione Shift + F10

3. Verifique se apareceu no terminal:
   Running on http://127.0.0.1:5000

4. Deixe o PyCharm rodando — não feche


🌐 PASSO 7 — ABRIR O FRONT-END
--------------------------------
1. Abra o VSCode

2. Clique em File → Open Folder e selecione a pasta do front-end

3. Instale a extensão Live Server do Ritwick Dey

4. Clique com o botão direito no index.html

5. Clique em Open with Live Server

6. O sistema vai abrir no navegador automaticamente


🧪 PASSO 8 — TESTAR O SISTEMA
-------------------------------
Use esses CNPJs para testar:

   41.056.328/0001-07
   42.946.195/0001-07
   36.801.765/0001-78

Teste 1 — Digite os primeiros dígitos e veja a lista de sugestões aparecer
Teste 2 — Clique em um CNPJ e veja os dados da empresa e sócios
Teste 3 — Clique em "Ver Informações" em um sócio e veja o modal com o nível de risco


⚠️ OBSERVAÇÕES IMPORTANTES
----------------------------
- O Flask precisa estar rodando no PyCharm para o sistema funcionar
- Se aparecer erro de conexão no site, verifique se o Flask está rodando
- Se aparecer erro de banco, verifique se o serviço do PostgreSQL está ativo:
  Pesquise "Serviços" no menu iniciar e inicie o postgresql-x64-18


========================================
  Projeto desenvolvido para a disciplina
  de Banco de Dados — Receita Federal
========================================
