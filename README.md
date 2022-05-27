# Panel

Teste Programador - Panel

Aplicação com Sistema de Login e níveis de acesso.

Administrador é capaz de ver lista de usuários, deletar usuários e definir permissões para lidar com os recursos.<br>
Usuários comuns são capazes de ver as telas referentes aos recursos que eles possuam permissão.

Recursos: Produtos, Categorias e Marcas.

Back-end: Laravel, banco de dados Mysql.<br>
Autenticação: JWT Token.<br>
Front-end: Angular (Template usado: ngx-admin).

Para facilitar o teste da aplicação, o menu lateral possui links para todas as páginas, todo acesso não permitido é direcionado para tela inicial.

OBS:<br>
Versão do Node.js usado na instalação dos packages: 14.14.0.<br>
Posteriormente atualizado para 14.15.0 para compilação.<br>
Configuração da API em proxy.conf.json e src/app/environments/environment.ts.<br>
"npm start" configurado para rodar comando "ng serve --proxy-config proxy.conf.json" (ambos servem para iniciar).
