# Pokedex realizado para curso Front End Trainee

## Configurar Live Sass Compiler

Por defecto Live Sass compiler compila el archivo style.css en el mismo directorio del style.scss, para este proyecto se utilizó otra configuración.
Los archivos CSS y SCSS están en carpetas separadas como se muestra a continuación

    root/
    |- css
    | |-style.css
    |- sass
    | |-style.scss

Para que Live Sass compiler funcione con esta configuración sólo se debe agregar la siguiente instrucción al settings.json

`"liveSassCompile.settings.formats": [ { "savePath": "~/../css/" } ]`

Trabajo realizado sólo con fines académicos
