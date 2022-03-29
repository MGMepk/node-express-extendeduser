## Introducció

En aquest exercici anem afegir el paquet framework express.

<br>

## Requisits

- Primer fer un _Fork_ d'aquest repositori https://github.com/rgarciamvm/node-express-exam.git
- Després clona __el teu__ repositori

## Lliurament

Una vegada finalitzat...:

```shell
$ git add .
$ git commit -m "done"
$ git push origin master
```
## Enviament

Per enviar l'exercici feu servir el classroom:

1. Heu d'enviar-me el link del vostre repositori github (exemple : https://github.com/usuari/node-express-exam.git)
2. Heu d'enviar-me els fitxers un ZIP amb **TOT** el codi.

## Per treure un 5

- Codificar **userRoute.js**, **userController.js**, **userModel.js** per afegir les funcionalitats de **register** i **login**
- Per verificar aquestes noves funcionalitats, s'ha de poder executar les crides REST de l'arxiu **requestUsers.rest**.
- NOTA!!! Existeix un **data/user.js** amb un primer usuari registrat.

 ```
Exemple de resultat de registre:
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 145
ETag: W/"91-kGblEmGck0R2t6anqKLX2hSLqSo"
Date: Fri, 11 Mar 2022 15:27:30 GMT
Connection: close

{
  "username": "spyder@dominio.es",
  "password": "man"
 }
 ```

## Per treure un +2

- Codificar l'encriptació del password. Utilitzeu el paquet **bcrypt**. __NOTA!! Heu d'instalar aquest paquet__
- NOTA!! S'ha d'emmagatzemar el password encriptat quan **registrem** un usuari.
- NOTA!! S'ha poder comparar el password encriptat amb el password quan fem el **login** d'un usuari. __Consultar documentació **bcrypt**__
- RECOMANACIÓ!! Afegir la funcionalitat **encryptPassword** com a middleware **authHandler.js** en fitxer **userRouter.js**. 
- router.route('/register')
    .post(authHandler.encryptPassword);
    .post(userController.register);
    
 ```
Exemple de resultat de registre:
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 145
ETag: W/"91-kGblEmGck0R2t6anqKLX2hSLqSo"
Date: Fri, 11 Mar 2022 15:27:30 GMT
Connection: close

{
  "username": "spyder@dominio.es",
  "password": "$2b$10$7lrvLuTcqlvj3qehc5L1pODBnnqJzOHfRmp6UtuU5yJNh8REb/KC6"
 }
 ```

## Per treure un +1

- Codificar la verficació de; Si un usuari __ja està registar__ quan **registrem** un nou usuari.
- Si l'usuari existeix llença el missatge  __next(HttpError(400, { message: 'UPS!! Usuario Existente' }));__
 
```
 HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-S6xqngNcGpwqt+cfWsjr8p35kzQ"
Date: Fri, 11 Mar 2022 15:33:33 GMT
Connection: close

{
  "ERROR": "UPS!! Usuario Existente"
}
```
## Per treure un +1

- Codificar la verficació del format d'adreça de correu **username**. __nomusuari@domini.es__
- Si no compleix el format __nomusuari@domini.es__ llença el missatge  __next(HttpError(400, { message: 'Error formato username' }))__
- És obligatori utilitzar un middleware per realitzar aquest validació. **middleware/userHandler.js**
- RECOMANACIÓ!! Afegir la funcionalitat **validateUserEmail** com a middleware en fitxer **userRouter.js**. __router.use(userHandler.validateUserEmail);__
- Per verificar aquesta nova funcionalitat, s'ha de poder executar les crides REST de l'arxiu **requestValidateUser.rest**.
 
```
####
POST http://localhost:3000/users/register
Content-Type: application/json

{
"username":"thor", "password":"god"
}
```
 
```
Exemple de resultat de error de format d'usuari:

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 34
ETag: W/"22-mzepaUmTWwHeekX72hZEwx1jTVE"
Date: Fri, 11 Mar 2022 15:35:21 GMT
Connection: close

{
  "ERROR": "Error formato username"
}
 
```

## Per treure un +1

- Afegir un timestamp al registrar un usuari. NOTA!! No podeu modificar l'arxiu **requestUsers.rest**, és a dir no pudeu afegir aquest nou camp en el body de la crida REST POST
- __{"username":"spyder@dominio.es", "password":"man"}__
- El format és: **"timestamp": "2022-03-08T10:26:12.722Z"**
- RECOMANACIÓ!! Afegir la funcionalitat **addTimestamp** com a middleware en fitxer **userRouter.js**. __const addTimestamp = (req, res, next) => {...};__

```
Exemple de resultat de registre:
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 145
ETag: W/"91-kGblEmGck0R2t6anqKLX2hSLqSo"
Date: Fri, 11 Mar 2022 15:27:30 GMT
Connection: close

{
  "username": "spyder@dominio.es",
  "password": "$2b$10$7lrvLuTcqlvj3qehc5L1pODBnnqJzOHfRmp6UtuU5yJNh8REb/KC6",
  "timestamp": "2022-03-11T15:27:30.729Z"
 }
```

