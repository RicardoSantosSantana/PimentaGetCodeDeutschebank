o proposito deste projeto é gerar um CODE para consumir api do deustscheBank
para isso é necessário criar uma aplicação no simulador e recolher o client_id e o client_secret
depois disso é também necessário cadastrar um usuário de teste que também é fornecido pela plataforma
o projeto está totalmente dockerizado e ao receber o novo CODE ele salva na base de dados mysql
https://developer.db.com/dashboard/overview
variaveis de ambiente
#mysql
MYSQL_SERVER='mysql_transactions'
MYSQL_HOST=database
MYSQL_ROOT_PASSWORD=pimenta001
MYSQL_DATABASE=bank_transactions
MYSQL_USER=pimenta
MYSQL_PASSWORD=pimenta001
MYSQL_PORT=3306

é importante explicar que as variaveis do nextjs iniciam com NEXT_PUBLIC, É COISA DO NEXTJS
#nextjs variables
NEXT_PUBLIC_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_CLIENT_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_API=https://simulator-api.db.com/gw/oidc/authorize
NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000/
NEXT_PUBLIC_RESPONSE_TYPE=code
NEXT_PUBLIC_STATE=PimentaGroup
