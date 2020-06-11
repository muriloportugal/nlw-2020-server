# O release, na parte do seed apaga o conteúdo de todas as tabelas do banco
# antes de inserir os itens novamente.
release: npm run prod:knex:migrate && npm run prod:knex:seed
web: node ./dist/src/server.js