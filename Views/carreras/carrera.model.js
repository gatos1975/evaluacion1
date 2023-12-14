class Carrera_Model {
  constructor(id_carrera, nom_carrera, det_carrera, frm_alumnos, Ruta) {
    this.id_carrera = id_carrera;
    this.nom_carrera = nom_carrera;
    this.det_carrera = det_carrera;
    this.frm_alumnos = frm_alumnos;
    this.Ruta = Ruta;
  }
  todos() {
    var html = "";
    $.get("../../Controllers/carrera.controller.php?op=" + this.Ruta, (res) => {
      res = JSON.parse(res);
      $.each(res, (index, valor) => {
        var fondo;
        /*if(valor.Rol == "Administrador") fondo ="bg-primary"
          else if(valor.Rol == "Vendedor") fondo = "bg-success"
          else if(valor.Rol == "Cliente") fondo = "bg-warning"
          else if(valor.Rol == "Gerente") fondo = "bg-danger"
          else if(valor.Rol == "Cajero") fondo = "bg-info"*/
        html += `<tr>
                  <td>${index + 1}</td>
                  <td>${valor.nom_carrera}</td>
                  <td>${valor.det_carrera}</td>
            
                  
              <td>
              <button class='btn btn-success' onclick='editar(${
                valor.id_carrera
              })'>Editar</button>
              <button class='btn btn-danger' onclick='eliminar(${
                valor.id_carrera
              })'>Eliminar</button>
              <button class='btn btn-info' onclick='ver(${
                valor.id_carrera
              })'>Ver</button>
              </td></tr>
                  `;
      });
      $("#tabla_usuarios").html(html);
    });
  }

  insertar() {
    var dato = new FormData();
    dato = this.frm_alumnos; //****************************************OJO */
    $.ajax({
      url: "../../Controllers/carrera.controller.php?op=insertar",
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        if (res === "ok") {
          Swal.fire("CArrera", "Carrera Registrada", "success");
          todos_controlador();
        } else {
          Swal.fire("Error", res, "error");
        }
      },
    });
    this.limpia_Cajas();
  }

  cedula_repetida() {
    var Cedula = this.ced_alumnos;
    $.post(
      "../../Controllers/alumnos.controller.php?op=cedula_repetida",
      { Cedula: Cedula },
      (res) => {
        res = JSON.parse(res);
        if (parseInt(res.cedula_repetida) > 0) {
          $("#CedulaRepetida").removeClass("d-none");
          $("#CedulaRepetida").html(
            "La cédua ingresa, ya exite en la base de datos"
          );
          $("button").prop("disabled", true);
        } else {
          $("#CedulaRepetida").addClass("d-none");
          $("button").prop("disabled", false);
        }
      }
    );
  }

  uno() {
    var id_carrera = this.id_carrera;
    $.post(
      "../../Controllers/carrera.controller.php?op=uno",
      { id_carrera: id_carrera },
      (res) => {
        console.log(res);
        res = JSON.parse(res);
        $("#id_carrera").val(res.id_carrera);
        $("#nom_carrera").val(res.nom_carrera);
        $("#det_carrera").val(res.det_carrera);
      }
    );
    $("#Modal_usuario").modal("show");
  }

  editar() {
    var dato = new FormData();
    dato = this.frm_alumnos;
    $.ajax({
      url: "../../Controllers/carrera.controller.php?op=actualizar",
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        if (res === "ok") {
          Swal.fire("carrera", "carrera a sido modificado", "success");
          todos_controlador();
        } else {
          Swal.fire("Error", res, "error");
        }
      },
    });
    this.limpia_Cajas();
  }

  eliminar() {
    var id_carrera = this.id_carrera;

    Swal.fire({
      title: "carrera",
      text: "Esta seguro de eliminar la carrera",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        $.post(
          "../../Controllers/carrera.controller.php?op=eliminar",
          { id: id_carrera },
          (res) => {
            console.log(res);
            res = JSON.parse(res);
            if (res === "ok") {
              Swal.fire("carrera", "carrera Eliminada", "success");
              todos_controlador();
            } else {
              Swal.fire("Error", res, "error");
            }
          }
        );
      }
    });
    this.limpia_Cajas();
  }
  limpia_Cajas() {
    document.getElementById("id_carrera").value = "";
    document.getElementById("nom_carrera").value = "";
    document.getElementById("det_carrera").value = "";

    $("#Modal_usuario").modal("hide");
  }
}
