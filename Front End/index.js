$(document).ready(function () {


    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ver",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")'  data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    " <button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
            });
        }
    });

    $("#enviar").submit(function (e) {
        e.preventDefault();
        enviarDatos();
        borrarCamposCrear();
    });

    $("#actualizar").submit(function (e) {
        e.preventDefault();
        actualizarDatos();
        borrarCamposActualizar();
    });

    function enviarDatos() {
        var datos = { "apellido": $("#apellido").val(), "nombre": $("#nombre").val(), "edad": $("#edad").val(), "dni": $("#dni").val() }
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/alumnos/guardar",
            data: JSON.stringify(datos),
            contentType: "application/json",
            dataType: "json",
            cache: false,
            success: function (response) {
                if (response == true) {
                    alert("Se creo el usuario")
                    resetearTabla();
                    mostrarDatos();
                } else {
                    alert("error")
                }
            }
        });
    }

    function actualizarDatos() {
        var id = $("#actualizarid").val();
        var datos = { "nombre": $("#actualizarnombre").val(), "apellido": $("#actualizarapellido").val(), "edad": $("#actualizaredad").val(), "dni": $("#actualizardni").val() }

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/alumnos/actualizar/" + id,
            data: JSON.stringify(datos),
            contentType: "application/json",
            dataType: "json",
            success: function (resp) {
                if (resp == true) {
                    alert("Datos actualizado")
                    resetearTabla();
                    mostrarDatos();
                } else {
                    alert("Error")
                }
            },
            error: function (e) {
                alert(e);
            }

        })
    }

    $("#filtroApellido").keyup(function (e) {
        e.preventDefault();
        var filtro = $("#filtroApellido").val();
        if (filtro == "") {
            resetearTabla();
            mostrarDatos();
        } else {
            resetearTabla();
            filtrarApellido(filtro);
        }
    });

    $("#ordenarPorApellido").click(function (e) {
        e.preventDefault();

        if ($('#ordenarPorApellido').hasClass('clicked')) {
            $('#ordenarPorApellido').removeClass('clicked');
            resetearTabla();
            ordenarApellidoAsc();
        } else {
            $('#ordenarPorApellido').addClass('clicked');
            resetearTabla();
            ordenarApellidoDesc();
        }

    });

    $("#ordenarPorNombre").click(function (e) { 
        e.preventDefault();
        if ($('#ordenarPorNombre').hasClass('clicked')) {
            $('#ordenarPorNombre').removeClass('clicked');
            resetearTabla();
            ordenarNombreAsc();
        } else {
            $('#ordenarPorNombre').addClass('clicked');
            resetearTabla();
            ordenarNombreDesc();
        }
    });

    $("#ordenarPorEdad").click(function (e) { 
        e.preventDefault();
        if ($('#ordenarPorEdad').hasClass('clicked')) {
            $('#ordenarPorEdad').removeClass('clicked');
            resetearTabla();
            ordenarEdadAsc();
        } else {
            $('#ordenarPorEdad').addClass('clicked');
            resetearTabla();
            ordenarEdadDesc();
        }
        
    });

    $("#ordenarPorDni").click(function (e) { 
        e.preventDefault();
        if ($('#ordenarPorDni').hasClass('clicked')) {
            $('#ordenarPorDni').removeClass('clicked');
            resetearTabla();
            ordenarDniAsc();
        } else {
            $('#ordenarPorDni').addClass('clicked');
            resetearTabla();
            ordenarDniDesc();
        }
        
    });

});

function borrarCamposCrear() { 
    $("#nombre").val("");
    $("#apellido").val("");
    $("#edad").val("");
    $("#dni").val("");
 }

 function borrarCamposActualizar(){
    $("#actualizarnombre").val("");
    $("#actualizarapellido").val("");
    $("#actualizaredad").val("");
    $("#actualizardni").val("");
 }

function eliminar(id) {
    let text = "¿Desea eliminar el alumno?";
    if (confirm(text) == true) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/alumnos/eliminar/" + id,
            contentType: "application/json",
            dataType: "json",
            cache: false,
            success: function (response) {
                alert("Se elimino");
                resetearTabla();
                mostrarDatos();
            }
        });
    } else {
        alert("No se elimino")
    }
}

function actualizar(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/obtener/" + id,
        data: "application/json",
        dataType: "JSON",
        success: function (data) {
            $("#actualizarid").val(data.id);
            $("#actualizarapellido").val(data.apellido);
            $("#actualizarnombre").val(data.nombre);
            $("#actualizaredad").val(data.edad);
            $("#actualizardni").val(data.dni);

        }
    });
}

function resetearTabla() {
    $("#datosTablas").html("");
}

function mostrarDatos() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ver",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
                
            });
        }
    });

}

function filtrarApellido(apellido) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/buscar/" + apellido,
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                    $("#datosTablas").append(row);
            });

        }
    });
}

function ordenarApellidoAsc() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ordenarApellidoAsc",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
            });
        }
    });
}

function ordenarApellidoDesc() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ordenarApellidoDesc",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
            });
        }
    });
}

function ordenarNombreAsc() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ordenarNombreAsc",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
            });
        }
    });
}


function ordenarNombreDesc() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ordenarNombreDesc",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
            });
        }
    });
}

function ordenarEdadAsc() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ordenarEdadAsc",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
            });
        }
    });
}


function ordenarEdadDesc() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ordenarEdadDesc",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
            });
        }
    });
}


function ordenarDniAsc() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ordenarDniAsc",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
            });
        }
    });
}


function ordenarDniDesc() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/alumnos/ordenarDniDesc",
        data: "application/json",
        dataType: "JSON",
        success: function (response) {
            $.each(response, function (index, data) {
                var row = "<tr>" +
                    "<td>" + data.apellido + "</td>" +
                    "<td>" + data.nombre + "</td>" +
                    "<td>" + data.edad + "</td>" +
                    "<td>" + data.dni + "</td>" +
                    "<td> <button class='btn btn-primary btn-sm' onclick='actualizar(" + data.id + ")' data-toggle='modal'"
                    + "data-target='#exampleModalActualizar'>Actualizar</button>" +
                    "<button class='btn btn-danger btn-sm' onclick='eliminar(" + data.id + ")'>Eliminar</button> </td>"
                    + "</tr>"

                $("#datosTablas").append(row);
            });
        }
    });
}