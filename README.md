<h1>Projeto de listagem de Pontos Turísticos </h1>
<p> Para criação deste projeto foi utilizado React Js e asp_net para o back end </p>
<p>Se trata de um projeto onde é possível cadastrar e listar pontos turísticos. Também é possivel filtrar os pontos através de palavras encontradas no nome, localização e 
descrição.</p>

<h2>Requisitos e passo a passo para rodar este projeto </h2>
<p>- Foi ultilizado neste projeto o visual studio 2019  para o back e visual studio code para o front, além de ter que possuir instalado o sql server na sua maquina</p>
<p>clone o repositorio em alguma pasta: link: https://github.com/MayconMartins983/ListagensPontosTuristicos.git </p>
<p>Abra a pasta back end, execulte o arquivo TurismoApllication.sln, Para ficar mais facil usaremos o migration para criar o banco e as tabelas no sql server.</p>
<p> Apague a pasta Migrattions, entre no arquivo appsettings.json e altere a string de conexao para a sua, somente o que está marcado em vermelho como mostrado na foto. </p>
<div> <img src='https://user-images.githubusercontent.com/90580797/159208313-81af2d34-2f87-4959-802b-c1eb6297ffe4.png' /></div>
<p>Abra seu gerenciador de pacotes no visual studio e digite add-migration inicial e depois update-database </p>
<p>Verifique se foi criada uma tabela com o nome pontos turísticos no sql server </p>
<p> Execute a aplicação e veja se abriu a tela do swagger </p>
<p> Abra a pasta do front end no vs code, verifique se voce tem o node installado na maquina </p>
<p> abra o terminal e execute npm install, depois de terminado execute npm start </p>
<p> Cadastre uma boa quantidade de pontos turisticos para verificar o layout do site</p>
<p> Se for cadastrar pelo swagger exclua o id e deixe o estado apenas com 2 letras </p>
<p> </p>
<p> </p>

