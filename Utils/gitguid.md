#Introducción

Esta es una guía con los comandos básicos para el uso de git desde la terminal 

##¿Qué necesitas antes de arrancar? 

Solo tener git instalado y abrir la terminal 

##Pasos para hacer tu aporte a este repositorio

1) Clona el repositorio de forma local. 
Para esto dirigite a la carpeta donde queres guardar el repositorio y ejecuta: 
```
git clone https://github.com/ISW-GRUPO-1/GRUPO1-2019
```
2) Ahora estás ubicado en la rama master de forma local, para crear tu propia rama usá el comando:
```
git checkout -b <nombreDeTuRama>
```
3) Realizá todos los cambios que quieras proponer para el repositorio
4) Agrega esos cabios de forma local con el comando:
```
git add <nombreDeLosArchivosQueQuierasAgregar>
```
* También podemos agregar todos los cambios que hicimos de la siguiente forma: 
```
git add .
```
5) Realizá un commit de los cambios realizados con el comando:
```
git commit -m "aquí poner SIEMPRE un comentario de los cambios que hiciste"
```
Recorda que el comentario siempre debe ser descriptivo por si en algún momento se desea volver a este punto sea fácil de encontrar! 
6) Subí tus cambios locales al repositorio usando el comando:
``` 
git push origin <nombreDeTuRama>
```
7) Dirigite al [repositorio](https://github.com/ISW-GRUPO-1/GRUPO1-2019/branches)y crea un nuevo __Pull Request__ para que tus cambios sean revisados y mergeados a la rama principal! 

8) Recordá volver siempre a la rama master que es la rama que tiene los cambios estables para volver a agregar nuevas propuestas con una nueva rama. Para volver a master podes usar el comando:
``` 
git checkout master
```

*Repetir los pasos del 3 al 6 hasta agregar todos los cambios que queremos proponer 

*Recordá siempre hacer un pull de las cosas nuevas que hay en el repositorio remoto con los comandos
``` 
git pull

git pull origin <nombreDeLaRamaRemota>
```

## Comandos utiles

* Listado de ramas locales que tenes
``` 
git branch
```
* Borrar una rama local
``` 
git branch -D <nombreDeLaRama>
```
* Cambiarse de rama de trabajo
``` 
git checkout <nombreDeLaRama>
```
* Crear una nueva rama (cuidado! Este comando va a crear una rama que sale desde la rama donde nos encontremos)
``` 
git checkout -b <nombreDeLaRama>
```
* Volver a un commit anterior
``` 
git checkout <commit>
```

* Listar los commit de la rama
``` 
git log
```
* Ver los cambios que tenes realizados hasta ahora
``` 
git status
```
__Changes to be commited__: Son los cambios que hiciste un commit pero todavia no fueron subidos al repositorio remoto (git push)
__Untracked files__: Cambios realizados en local que no fueron commiteados. Si hacemos un git push, estos archivos no van a ser enviados al repositorio remoto