# Painel Administrativo

Painel feito em Angular para Teste Programador (Template usado: akveo/ngx-admin)

Aplicação com Sistema de Login e níveis de acesso.

Administrador é capaz de ver lista de usuários, deletar usuários e definir permissões para lidar com os recursos.<br>
Usuários comuns são capazes de ver as telas referentes aos recursos que eles possuam permissão.

Recursos: Produtos, Categorias e Marcas.

Para facilitar o teste da aplicação, o menu lateral possui links para todas as páginas, todo acesso não permitido é direcionado para tela inicial.

## Instalação ##
1) Clone o repositório (git clone https://github.com/shineyder/Panel.git) e entre na pasta do projeto<br>
2) Execute o comando ```npm install``` para instalar as dependencias<br>
OBS: Para evitar erros e conflitos, recomenda-se uso do Node.js versão 14.14.0<br>
3) No arquivo ```proxy.conf.json``` e ```src/app/environments/environment.ts``` é configurado a URL da API<br>
4) Para rodar a aplicação execute o campo ```npm start``` ou ```ng serve --proxy-config proxy.conf.json```
