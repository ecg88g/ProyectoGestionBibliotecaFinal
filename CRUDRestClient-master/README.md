# Cliente REST

El presente proyecto de cliente REST forma parte de una de las tareas de 
la asignatura de Acceso a Datos del Ciclo Formativo de Grado Superior de 
Desarrollo de Aplicaciones Multiplataforma. 

## Introducción a la tarea

Básicamente se trata de crear un CRUD para usuarios/clientes, otro CRUD para libros/productos, otro CRUD para reservas/pedidos y un maestro-detalle para ver préstamos/pedidos.

Para implementarlo, deberemos tener un servicio REST programado como un servlet Java en un contenedor Tomcat (cuidado, Tomcat no es un contenedor de EJB luego no soportará correctamente la inyección del EntityManagerFactory en las clases de los servicios), TomEE o GlashFish, contra una base de datos relacional Oracle o MySQL.

En cuanto al cliente, deberá ser en HTML5+JS (concretamente jQuery) y comunicarse con el servicio anterior en XML o en JSON.

El código de ejemplo para crear el servicio así como la base de datos lo 
puedes encontrar [en este otro repositorio](https://github.com/juangualberto/GA-JPA).

*** RECOMENDAMOS MONTAR EL SERVICIO SOBRE GLASHFISH 4.1 ***. Glashfish 4.1.1 tiene un bug que da problemas a la hora de producir / consumir JSON. Tomcat no es un contenedor EJB, luego no van a funcionar todas las inyeccciones y tedremos que tocar el código generado por Netbeans.


## Documentación

Nos basta con una escueta documentación, aunque sí vamos a necesitar varios diagramas que detallamos a continuación. 
Veamos unos ejemplos con el proyecto que hemos estado usando en clase (Gestión Académica).

### Casos de uso

Un caso de uso no es más que plasmar ejemplos de cómo los actores (usuarios 
de nuestro sistema) interactúan con nuestra aplicación. Esto nos ayudará 
a dividir el problema en cada una de sus partes.

![](Screenshot_20170219_215302.png)

### Diagrama entidad/relación

El diagrama entidad/relación es el paso previo al diseño de tablas de la 
base de datos y nunca debe faltar en la fase de diseño.
![](Captura%20de%20pantalla_2017-02-19_21-48-56.png)

### Diagrama de clases

Otro diagrama fundamental en UML es el diagrama de clases. En el vemos los objetos que habrá en nuestra aplicación y cómo 
interactuarán entre ellos. 
![](Screenshot_20170219_215403.png)

### Manual de instalación y configuración

#### Fichero README.md / README.txt

Es fundamental tener un fichero en el raíz del proyecto donde se explique cómo instalar y configurar el servicio.

#### Instalación automática

La instalación automatizada es muy recomendable.

Puede hacerse descomprimiendo el proyecto y mediante scripts (bash, poweshell...) o bien mediante clonación desde GitHub, GitBucket... y siguiendo las instrucciones del README del repositorio.

### Breve manual de usuario

Basta con explicar las funcionalidades del sistema.

## Generando servicios REST con el IDE

#### Creación de la base de datos, usuarios y las tablas

Creación de la base de datos y carga inicial: ***Videotutorial en Youtube*** 
[![Creación de la base de datos y carga inicial](http://img.youtube.com/vi/pPQ5Ul2-RFs/0.jpg)](http://www.youtube.com/watch?v=pPQ5Ul2-RFs)

Código fuente: [CargaInicial.sql](https://github.com/juangualberto/GA-JPA/blob/master/src/java/CargaInicial.sql)

#### Creación del servicio REST con Netbeans

***Videotutorial en Youtube***: 

[![Creación del servicio REST](http://img.youtube.com/vi/kZQ60EW6gLg/0.jpg)](http://www.youtube.com/watch?v=kZQ60EW6gLg)

## Creación del cliente

### jQuery

Ejemplo de fichero JS para hacer

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
```javascript
function AlumnoReadREST(id) {
    if ( id=== undefined ) {
        $.ajax({
            url: 'http://localhost:8080/GA-JPA/webresources/com.iesvdc.acceso.entidades.alumno',
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                $('#r_alumno').empty();
                $('#r_alumno').append('<h3>Listado de Alumnos</h3>');
                var table = $('<table />').addClass('table table-stripped');
                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>')));
                var tbody = $('<tbody />');
                for (var alumno in json) {
                    console.log(alumno);
                    tbody.append($('<tr />').append('<td>' + json[alumno].id + '</td>',
                                '<td>' + json[alumno].nombre + '</td>', '<td>' + json[alumno].apellido + '</td>'));
                }
                table.append(tbody);
                $('#r_alumno').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema');
            }
        });
    }
}
```


### Intel XDK

Ejemplo de menús de aplicación con Intel XDK.

```html 
<!DOCTYPE html>
<!--HTML5 doctype-->
<html>
<head>
    <title>App Framework Kitchen Sink</title>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta HTTP-EQUIV="Pragma" CONTENT="no-cache" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="stylesheet" type="text/css" href="lib/appframework/icons.css" />
    <link rel="stylesheet" type="text/css" href="lib/appframework/af.ui.css" />
    <script type="text/javascript" charset="utf-8" src="lib/jquery.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="lib/fastclick.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="lib/appframework/appframework.ui.min.js"></script>
    <script src='cordova.js'></script>
    <script src="lib/alumno.js"> </script>
</head>
<body>
    <div id="splashscreen" class='ui-loader heavy'>
        App Framework
        <br>
        <span class='ui-icon ui-icon-loading spin'></span>
        <h1>Starting app</h1>
    </div>
    <div class="view splitview">        
        <header>
            <a class="menuButton" data-left-menu="left" data-transition="cover" style="float:left"></a>
            <h1>Title</h1>
        </header>        
        <div class="pages">
            <div class="panel" id="main" data-title="Inicio" data-selected="true">
                <h1>Alumno CRUD</h1>
                <p>Ejemplo de APP híbrida que produce/consume un servicio REST</p>
            </div>
            <div class="panel" id="c_alumno" data-title="Create Alumno">
                <h1>Create Alumno</h1>
            </div>
            <div class="panel" id="r_alumno" data-title="Read Alumno">
                <h1>Read Alumno</h1>
            </div>
            <div class="panel" id="u_alumno" data-title="Update Alumno">
                <h1>Update Alumno</h1>
            </div>
            <div class="panel" id="d_alumno" data-title="Delete Alumno">
                <h1>Delete Alumno</h1>
            </div>
        </div>
        <nav id="left">
            <div class="view active">
                <header>
                    <h1>Left</h1>
                </header>
                <div class="pages">
                    <div class="panel active" id="navPage1" data-title="Foobar">
                        <ul class="list">
                            <li><a href="#main" onclick="$.afui.clearHistory()">Inicio</a></li>
                            <li><a href="#c_alumno" onclick="$.afui.clearHistory()">Crear Alumno</a></li>
                            <li><a href="#r_alumno" onclick="$.afui.clearHistory();AlumnoReadREST();">Leer Alumno</a></li>
                            <li><a href="#u_alumno" onclick="$.afui.clearHistory()">Actualizar Alumno</a></li>
                            <li><a href="#d_alumno" onclick="$.afui.clearHistory()">Borrar Alumno</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</body>
</html>
```
## Descripción detallada

### Opción 1: Gestión de pedidos

En nuestra aplicación un operario es el único agente que interactúa con el sistema.

El operario puede dar de alta, modificar o borrar los productos del almacén. **<span style="text-decoration: underline;">Para cada producto hay que guardar la cantidad que hay.</span>**

El operario puede dar de alta, modificar o borrar los clientes de la tienda.

El operario recibe llamadas telefónicas de los clientes y crea los pedidos en el sistema.

Un pedido es para un cliente.

Los pedidos tienen un detalle de pedido donde está la lista de productos y la cantidad de cada uno. Antes de procesar un pedido hay que ver si hay productos suficientes para poder hacerlo. En caso de no haberlos, no se podrá hacer el pedido (lo puedes controlar con transacciones, disparadores, software -cliente- o software -servidor-).

Una vez grabado, se pueden añadir nuevos productos o borrar existentes al mismo.

Se permite eliminar pedidos.

La consulta de pedidos se hace por cliente. Selecciono un cliente y me muestra sus pedidos. Selecciono un pedido y me muestra los productos del mismo.

### Opción 2: Gestión básica de biblioteca

En nuestra aplicación un operario es el único agente que interactúa con el sistema.

El operario puede dar de alta, modificar o borrar los libros de la biblioteca. **<span style="text-decoration: underline;">Para cada libro hay un único ejemplar.</span>**

El operario puede dar de alta, modificar o borrar los usuarios de la biblioteca.

Para grabar un préstamo, escaneamos el código de barras del ISBN del libro, seleccionamos del listado de usuarios el usuario (o escaneamos su tarjeta de préstamo) y aceptamos.

El sistema debe permitir listar los préstamos que ha realizado un usuario seleccionando el mismo de un desplegable con todos los usuarios del mismo.

Los préstamos se pueden modificar (p. ej. extender la fecha de entrega) o borrar.

No se especifica si se borra un préstamo cuando devolvemos un libro. Puedes hacerlo así y fijar un número máximo de préstamos por usuario. Si no borras los préstamos el sistema debe permitir buscar entre dos fechas posibles todos los préstamos que se hayan hecho. También puedes usar dos tablas y en una borrar y en otra llevar el histórico.

#### Pista para usar el lector del framework

```javascript
function scanNow()
{
	//Esta función lanza el QR Code scanner.
	intel.xdk.device.scanBarcode();
}

//Este evento se lanza cuando un código es escaneado:
document.addEventListener("intel.xdk.device.barcode.scan",function(evt){
	if (evt.success == true) {
		//successful scan
	   
		alert(evt.codedata);
	}
	else
	{
		//failed scan
		alert("Please try again");
	}
},false);

```

## Solución al problema del CORS

Si queremos usar XML y AJAX, tenemos que habilitar el CORS en nuestros servicios con Tomcat. La manera más usual es creando un filtro:
```java
package com.iesvdc.acceso.filtro;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class SimpleCORSFilter implements Filter {

 public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
  HttpServletResponse response = (HttpServletResponse) res;
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
  response.setHeader("Access-Control-Max-Age", "3600");
  response.setHeader("Access-Control-Allow-Headers", "Origin, x-requested-with, Content-Type, Accept");
  chain.doFilter(req, res);
 }

 public void init(FilterConfig filterConfig) {}

 public void destroy() {}
 
}
```

## Puntuación rápida

Básicamente, por la documentación y el servicio REST se obtendrá el 50% de la nota. Si no se hace cliente, se deberán crear varios scripts o comandos CURL de test para probarlo.

Del 50% restante, 20% es conseguir en el cliente una interfaz maestro/detalle y 30% por el resto de CRUD desde el cliente.

El cliente debe estar implementado usando jQuery y la comunicación entre cliente/servidor con XML/JSON.

Si el cliente no usa JavaScript pero está en HTML, la nota máxima posible sería 60% (sobre el 100%).

Si se implementa un lector de código de barras con XDK para un CRUD, estás exento del maestro/detalle.


