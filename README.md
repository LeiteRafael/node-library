# Locadora De Filmes 


> O sistema permite a criação de usuários (clientes), logon e logoff de um usuário, listagem de filmes disponíveis, locação de um filme, devolução de um filme, e pesquisa de filme pelo título.
---
### Dependências
- bcrypt
- express
- express-session
- mysql
### Conceitos
- Session para Login/Logoff
- Bcrypt para senha do usuário 
- Destructuring assignment (ES6 )
## Rotas
- ### Create User
> |POST| localhost:5555/create

#### Body
```
{
	"nome": "nome",
	"email" : "email",
	"senha" : "senha"
}
```
#### Response 
```
{
  "msg": "Usuario cadastrado com sucesso"
}
```
---
- ### Login
> |POST| localhost:5555/login

#### Body
```
{
	"email" : "email",
	"senha" : "senha"
}
```
#### Response 
```
{
  "msg": "Login efetuado com sucesso"
}
```
---
- ### Availables
> |GET| localhost:5555/list/availables

#### Response 
```
[
  {
    "idfilme": 1,
    "qtd": 5,
    "qtd_disponivel": 4,
    "titulo": "Sonic: O Filme",
    "diretor": "Jeff Fowler"
  },
  {
    "idfilme": 4,
    "qtd": 10,
    "qtd_disponivel": 9,
    "titulo": "Velozes e Furiosos 3",
    "diretor": "Justin Lin"
  }
]
```
---
- ### Search by name
> |GET| localhost:5555/title?nomefilme=Velozes e Furio

#### Response 
```
[
  {
    "idfilme": 2,
    "qtd": 5,
    "qtd_disponivel": 1,
    "titulo": "Velozes e Furiosos 1",
    "diretor": "Justin Lin"
  },
  {
    "idfilme": 3,
    "qtd": 3,
    "qtd_disponivel": 1,
    "titulo": "Velozes e Furiosos 2",
    "diretor": "Justin Lin"
  },
  {
    "idfilme": 4,
    "qtd": 10,
    "qtd_disponivel": 9,
    "titulo": "Velozes e Furiosos 3",
    "diretor": "Justin Lin"
  }
]
```
---
- ### Rent Movie
> |POST| localhost:5555/rent?idfilme=4

#### Response 
```
{
  "filme alugado": "Velozes e Furiosos 3"
}
```
---
- ### Return Movie
> |POST| localhost:5555/return?idfilme=4

#### Response 
```
{
  "msg": "filme devolvido"
}
```
---
- ### Logoff
> |POST| localhost:5555/logoff

#### Response 
```
{
  "msg": "Logoff realizado"
}
```
---
