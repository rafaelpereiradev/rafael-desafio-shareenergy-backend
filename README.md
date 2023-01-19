  # Documentação Backend
  
 ## Rotas Disponíveis
  
  
  
## External API Routes

Método      |Rota | Função                                                    |Body|                            Retorno|
------------| -----|---------------------------------------------------------  |-----|---------------------------------|
POST        |```/http-cat```| Solicita uma foto baseada no http-code selecionado | ```{code: string or number } ```|base64 string|
GET         |```/random-dog```| Solicita uma foto randomizada da API Random Dog|N/A                            |base64 string |
GET         |```/random-user```| Solicita uma lista de usuários da API Random User| N/A| array de objetos com informações do usuário [{ }]


## Customer Routes

GET   ```/customer/all```
- Solicita todos os clientes cadastrados 
- Retorno:
- ```status:200```
Array de objetos com as informações
```[{ id:string, name: string, email: string, phone: string, address: string, cpf: string} ... outros cadastrados]```

---------------------------------

POST  ```/customer/new```
 - Cria um novo cliente,
 
BODY : 
```{ name: string, email: string, phone: string, address: string, cpf: string }```

Retorno:
```status:200```
```{ id:string, name: string, email: string, phone: string, address: string, cpf: string }```

--------------------------------

POST ```/customer/edit/:id ```
- Atualiza Informações de um cliente

Deve ser enviado um id de um cliente como parâmetro na url


BODY :
```{ id:string, name: string, email: string, phone: string, address: string, cpf: string }```

Retorno:
``` status:201 ```
```{ id:string, name: string, email: string, phone: string, address: string, cpf: string }```

--------------------------------

DELETE ```/customer/edit/:id```
- Deleta um cliente

Deve ser enviado um id de um cliente como parâmetro na url

BODY: Não se aplica

Retorno: ```200 OK ```

--------------------------------

## user e auth routes

POST ```/user/new``` 
- Cria novo usuário da aplicação

BODY :
```{ username: string, password:string  }```

Retorno 
```status:200 ```

```{username:string, message:string}```

--------------------------------

POST ```/auth```

- Autentica na aplicação


BODY: 
```{ username: string, password:string  }```

-Retorno

```{token: jwt string token}```

