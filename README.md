#Pokedex realizado para curso Front End Trainee

##Configurar Live Sass Compiler
Por defecto Live Sass compiler compila el archivo style.css en el mismo directorio del style.scss, para este proyecto se utilizó otra configuración.

root/
|- css
| |-style.css
|- sass
| |-style.scss

Para hacer esto sólo agregaron las siguientes instrucciones al settings.json

`"liveSassCompile.settings.formats": [ { "savePath": "~/../css/" } ]`

Trabajo realizado sólo con fines académicos
