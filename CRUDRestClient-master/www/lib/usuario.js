/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */


// variables para el jslint
$.usuario={};
// Configuracionn del HOST y URL del servicio
$.usuario.HOST = 'http://localhost:8084';
// $.usuario.URL = '/GA-JPA/webresources/com.iesvdc.acceso.entidades.usuario';
$.usuario.URL = '/GestionBiblioteca/webresources/com.iesvdc.acceso.entidades.usuario';

$.usuario.UsuarioReadREST = function(id) {
    if ( id === undefined ) {
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#r_usuario').empty();
                $('#r_usuario').append('<h3>Listado de usuarios</h3>');
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellido</th>', '<th>direccion</th>', '<th>email</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    tbody.append($('<tr />').append('<td>' + json[clave].id + '</td>',
                                '<td>' + json[clave].nombre + '</td>', '<td>' + json[clave].apellido + '</td>', '<td>' + json[clave].direccion + '</td>', '<td>' + json[clave].email + '</td>'));
                }
                table.append(tbody);

                $('#r_usuario').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                $('#r_usuario').empty();
                $('#r_usuario').append('<h3>Error conectando al servidor</h3>');
                $('#r_usuario').append('<p>Intentelo mas tarde</p>');
            }
        });
    } else {
        $.ajax({
            url: 'http://localhost:8084/GestionBiblioteca/webresources/com.iesvdc.acceso.entidades.usuario',
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                
            },
            error: function (xhr, status) {
                this.error('Imposible leer usuario','Compruebe su conexion e intentelo mas tarde');
            }
        });
    }
};

$.usuario.UsuarioCreateREST = function(){
    var datos = {
        'nombre' : $("#c_al_nombre").val(),
        'apellido': $("#c_al_apellido").val(),
        'direccion': $("#c_al_direccion").val(),
        'email': $("#c_al_email").val()
    };
    
    // comprobamos que en el formulario haya datos...
    if ( datos.nombre.length>2 && datos.apellido.length>2 && datos.direccion.length>2 && datos.email.length>2) {
        $.ajax({
            url: $.usuario.HOST+$.usuario.URL,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.usuario.UsuarioReadREST();
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.usuario.error('Error: No ha sido posible crear el usuario. Compruebe su conexion');
            }
        });
        
        // esto es para que no vaya hacia atr'e1s (que no salga el icono volver atr'e1s en la barra de men'fa) 
        $.afui.clearHistory();
        // cargamos el panel con id r_usuario.
        $.afui.loadContent("#r_usuario",false,false,"up");
    }
    
};

$.usuario.UsuarioDeleteREST = function(id){
    // si pasamos el ID directamente llamamos al servicio DELETE
    // si no, pintamos el formulario de selecci'f3n para borrar.
    if ( id !== undefined ) {
        id = $('#d_al_sel').val();
        $.ajax({
            url: $.usuario.HOST+$.usuario.URL+'/'+id,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            // data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.usuario.UsuarioReadREST();
                // esto es para que no vaya hacia atr'e1s (que no salga el icono volver atr'e1s en la barra de men'fa) 
                $.afui.clearHistory();
                // cargamos el panel con id r_usuario.
                $.afui.loadContent("#r_usuario",false,false,"up");
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.usuario.error('Error: Usuario Delete','No ha sido posible borrar el usuario. Compruebe su conexion');
            }
        });    
    } else{
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#d_usuario').empty();
                var formulario = $('<div />');
                formulario.addClass('container');
                var select = $('<select id="d_al_sel" />');
                select.addClass('form-group');
                for (var clave in json){
                    select.append('<option value="'+json[clave].id+'">'+json[clave].nombre+' ' + json[clave].apellido+'</option>');
                }
                formulario.append(select);
                formulario.append('<div class="btn btn-danger" onclick="$.usuario.UsuarioDeleteREST(1)"> eliminar! </div>');
                $('#d_usuario').append(formulario).append(select);
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.usuario.error('Error: usuario Delete','No ha sido posible conectar al servidor. Compruebe su conexion');
            }
        });
    }
    
};

$.usuario.UsuarioUpdateREST = function(id, envio){
    if ( id === undefined ) {
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#u_usuario').empty();
                $('#u_usuario').append('<h3>Pulse sobre un usuario</h3>');
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>', '<th>direccion</th>', '<th>email</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    // le damos a cada fila un ID para luego poder recuperar los datos para el formulario en el siguiente paso
                    tbody.append($('<tr id="fila_'+json[clave].id+'" onclick="$.usuario.UsuarioUpdateREST('+json[clave].id+')"/>').append('<td>' + json[clave].id + '</td>',
                    '<td>' + json[clave].nombre + '</td>', '<td>' + json[clave].apellido + '</td>', '<td>' + json[clave].direccion + '</td>', '<td>' + json[clave].email + '</td>'));
                }
                table.append(tbody);

                $('#u_usuario').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                $.usuario.error('Error: usuario Update','Ha sido imposible conectar al servidor.');
            }
        });
    } else if (envio === undefined ){
        var seleccion = "#fila_"+id+" td";
        var al_id = ($(seleccion))[0];
        var al_nombre = ($(seleccion))[1];
        var al_apellidos = ($(seleccion))[2];
        var al_direccion = ($(seleccion))[3];
         var al_email = ($(seleccion))[4];
        
        $("#u_al_id").val(al_id.childNodes[0].data);
        $("#u_al_nombre").val(al_nombre.childNodes[0].data);
        $("#u_al_apellidos").val(al_apellidos.childNodes[0].data);
        $("#u_al_direccion").val(al_direccion.childNodes[0].data);
        $("#u_al_email").val(al_email.childNodes[0].data);
        // esto es para que no vaya hacia atr'e1s (que no salga el icono volver atr'e1s en la barra de men'fa) 
        $.afui.clearHistory();
        // cargamos el panel con id r_usuario.
        $.afui.loadContent("#uf_usuario",false,false,"up");
    } else {
        //HACEMOS LA LLAMADA REST
            var datos = {
                'id' : $("#u_al_id").val(),
                'nombre' : $("#u_al_nombre").val(),
                'apellido': $("#u_al_apellidos").val(),
                'direccion': $("#u_al_direccion").val(),
                'email': $("#u_al_email").val()
            };

            // comprobamos que en el formulario haya datos...
            if ( datos.nombre.length>2 && datos.apellido.length>2 && datos.direccion.length>2 && datos.email.length>2 ) {
                $.ajax({
                    url: $.usuario.HOST+$.usuario.URL+'/'+$("#u_al_id").val(),
                    type: 'PUT',
                    dataType: 'json',
                    contentType: "application/json",
                    data: JSON.stringify(datos),
                    success: function(result,status,jqXHR ) {
                       // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                        $.usuario.UsuarioReadREST();
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        $.usuario.error('Error: usuario Create','No ha sido posible crear el usuario. Compruebe su conexion');
                    }
                });

                // esto es para que no vaya hacia atr'e1s (que no salga el icono volver atr'e1s en la barra de men'fa) 
                $.afui.clearHistory();
                // cargamos el panel con id r_usuario.
                $.afui.loadContent("#r_usuario",false,false,"up");
            }
    }
};

$.usuario.error = function(title, msg){
    $('#err_usuario').empty();
    $('#err_usuario').append('<h3>'+title+'</h3>');
    $('#err_usuario').append('<p>'+msg+'</p>');
    // esto es para que no vaya hacia atr'e1s (que no salga el icono volver atr'e1s en la barra de men'fa) 
    $.afui.clearHistory();
    // cargamos el panel con id r_usuario.
    $.afui.loadContent("#err_usuario",false,false,"up");
};

