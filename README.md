# cepSearching

cepSeaching is an example method of front and backend of api consumption where once consulted in an external api it will be recorded in the relational database and all other searches following must be searched from the database

## Installing

### backend

run
```bash
$ npm i 
```
or

```bash
$ yarn install 
```

#### creating database (mysql)

first create a database named `cepdb`

#### creating table in `cepdb` database using node api
[http://localhost:3333/cep/createTable](http://localhost:3333/cep/createTable)

or

```sql
create table IF NOT EXISTS cepInfos (
id int primary key auto_increment,
cep int,
logradouro varchar(250),
bairro varchar(250),
uf varchar(250),
ibge int,
gia varchar(250),
ddd int,
siafi int,
localidade varchar(250)
);  

```

#### now just start the server
```bash
$ npm run dev
```



### frontend

run
```bash
$ npm i 
```
or

```bash
$ yarn install 
```

#### now just start react server
```bash
$ npm start
```


