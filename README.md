# Proyecto Controles

Rama Desarrollo: [![Medalla](http://ci.ciriscr.com/ciris/controles-angular/badge?branch=desarrollo)](http://ci.ciriscr.com/ciris/controles-angular/)


Proyecto de frontend que sirve como base para los desarrollos.
Las principales tecnologias del proyecto son:

* Angular           → https://angularjs.org/  |  Egghead: https://egghead.io/technologies/angularjs
* Bootstrap         → http://getbootstrap.com/css/
* UI-Bootstrap      → http://angular-ui.github.io/bootstrap/
* Broserify         → http://browserify.org/
* Moment            → http://momentjs.com/docs
* Lodash            → https://lodash.com/docs
* ng-file-upload    → https://github.com/danialfarid/ng-file-upload/blob/master/README.md
* LESS              → http://lesscss.org/
* UI-Router         → https://github.com/angular-ui/ui-router/wiki
* Satellizer        → https://github.com/sahat/satellizer
* Karma             → http://karma-runner.github.io/0.13/index.html
* Jasmine           → http://jasmine.github.io/2.3/introduction.html
* Gulp              → http://gulpjs.com/
* Vorlon            → http://vorlonjs.com/ | Panel de control: http://ciriscr.com:1337/dashboard/   
* Angular print  → https://github.com/samwiseduzer/angularPrint


> Este proyecto usa Node.js, Gulp y Bower para ejecutarse y construirse, y Karma para las pruebas.
>

## Instalar Node:

    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash

### Cargar nvm en la sesión actual

    source ~/.bashrc

Una vez cargado nvm en sesión, se debe instalar node ejecutando el siguiente comando el siguiente comando:

    nvm install 4

Luego, para usar node, se debe hacer:

    nvm use 4

>Se puede agregar ese comando al final del .bashrc para que se cargue nvm automáticamente

Fuente: https://github.com/creationix/nvm

### Instalar paquetes de node necesarios:
Desde cualquier ubicación ya que se van a instalar de forma global:

    npm install -g gulp bower karma-cli

## Configurar el proyecto
Luego de hacer el fork y clonar el proyecto, se debe hacer desde el directorio raíz:

    npm install
    bower install

Esos dos comandos instalaran todas las librerias que el proyecto necesita.


## Comandos de gulp

>Los comandos se pueden encontrar en el archivo ./gulp/tareas.js
> y ./gulp/qa/tareas.js

El proyecto proveé una serie de comandos para ayudar en el desarrollo:
[comment]: <> (COMANDOS:INICIO)

### Herramientas de QA

* gulp js:hint          → valida el código en busca de errores comunes
* gulp js:inspect       → valida que no haya código copiado
* gulp js:complexity    → evalua la complejidad del código
* gulp js:cs            → valida el estilo de codificación y formatea el código
* gulp js:qa            → Ejecuta js:hint, js:complexity, js:cs y js:inspect

### Comandos de compilación - desarrollo

* gulp clean            → limpia todos los elementos constuidos
* gulp recursos         → copia el directorio de recursos a la carpeta dist para ser servidos
* gulp desarrollo       → compila el urlAPI con la ruta del backend de desarrollo
* gulp build:js         → construir el archivo compilado de javascript
* gulp build:bower      → construir el archivo compilado de recursos de bower. Sólo se toman en cuenta los archivos Javascript de cada librería.
* gulp build:less       → construir el archivo compilado de css
* gulp build:html       → constuir todas las plantillas de angular en un solo archivo
* gulp build            → ejecuta build:js build:less, build:html, build:bower, desarrollo y recursos
* gulp watch:js         → Ejecuta browserify en modo watch para compilar todas las fuentes dentro de 'src'
* gulp watch            → Ejecuta watch:js y espera cambios en todos los archivos para ejecutar el build correspondiente
* gulp serve:dev        → ejecuta clean, build y watch, y levanta un servidor de pruebas.
* gulp                  → ejecuta serve:dev

### Comandos de compilación - produccion

* gulp produccion       → compila el urlAPI con la ruta del backend de produccion
* gulp dist:js          → construir el archivo compilado de javascript (minificado y uglificado)
* gulp dist:bower       → construir el archivo compilado de recursos de bower (minificado y uglificado)
* gulp dist:less        → construir el archivo compilado de css (minificado)
* gulp dist:html        → constuir todas las plantillas de angular en un solo archivo (minificado)
* gulp dist             → ejecuta dist:js dist:less, dist:html, dist:bower, produccion y recursos
* gulp serve:dist        → ejecuta clean y dist, y levanta un servidor de pruebas.
* gulp serve            → levanta el servidor de pruebas con lo que sea que haya en ./dist

### Otros

* gulp help             → Imprime todos los comandos disponibles
* gulp util:size        → tamaño de los archivos del proyecto
* gulp util:loc         → cantidad de líneas de código del proyecto
* gulp util             → ejecuta util:size y util:loc

### Generación de código
* gulp generarModulo --nombre [NombreModulo] → genera un módulo con el nombre NombreModulo
* gulp generarMantenimiento --nombre [NombreManteniemiento] --modulo [NombreModulo] → genera un mantenimiento con el nombre NombreManteniemiento bajo el módulo NombreModulo

[comment]: <> (COMANDOS:FIN)

#### Por defecto, el comando default es gulp serve
Esto quiere decir, que con sólo hacer:

    gulp

estaremos ejecutando:

    gulp serve

## Karma y correr los tests
Para correr todas las pruebas de unidad, basta con ejecutar:

      karma start

Esto inilizará un PhantomJS que correrá todos los scripts indicados.

### Buenas prácticas
Mientras se está ejecutando gulp en una pestaña, se debe tener corriendo en otra pestaña karma.


## Generador de módulos
El proyecto incluye un comando para generar todos los archivos básicos de un nuevo módulo:

    gulp generarModulo --nombre <NOMBRE DEL MODULO>

## Generador de mantenimientos
El proyecto incluye un comando para generar un mantenimiento de un tipo de dato.
Se debe especificar el nombre del módulo al que se desea agregar el mantenimiento.
El mantenimiento incluye:

* 2 vistas: una para listar los objetos y otra para mostrar un objeto (form)
* 2 controladores de angular: 1 por vista
* 1 servicio rest
* 1 modelo
* Modifica las rutas
* Modifica el archivo del módulo para agregar los componentes de angular

    gulp generarMantenimiento --nombre <NOMBRE DEL OBJETO> --modulo <NOMBRE DEL MODULO>

## ¿Cómo hacer deploy?

El proyecto 'compila' todo lo necesario a un directorio 'dist'. Cualquier servidor HTTP debe servir ese directorio y listo.