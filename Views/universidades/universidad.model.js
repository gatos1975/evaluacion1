class Universidad_Model {
  constructor(
    id_universidad,
    nom_universidad,
    ciu_universidad,
    fun_universidad,
    frm_alumnos,
    Ruta
  ) {
    this.id_universidad = id_universidad;
    this.nom_universidad = nom_universidad;
    this.ciu_universidad = ciu_universidad;
    this.fun_universidad = fun_universidad;
    this.frm_alumnos = frm_alumnos;
    this.Ruta = Ruta;
  }
  todos() {
    var html = "";
    $.get(
      "../../Controllers/universidad.controller.php?op=" + this.Ruta,
      (res) => {
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
                  <td>${valor.nom_universidad}</td>
                  <td>${valor.ciu_universidad}</td>
                  <td>${valor.fun_universidad}</td>
                  
              <td>
              <button class='btn btn-success' onclick='editar(${
                valor.id_universidad
              })'>Editar</button>
              <button class='btn btn-danger' onclick='eliminar(${
                valor.id_universidad
              })'>Eliminar</button>
              <button class='btn btn-info' onclick='ver(${
                valor.id_universidad
              })'>Ver</button>
              </td></tr>
                  `;
        });
        $("#tabla_usuarios").html(html);
      }
    );
  }

  insertar() {
    var dato = new FormData();
    dato = this.frm_alumnos; //****************************************OJO */
    $.ajax({
      url: "../../Controllers/universidad.controller.php?op=insertar",
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        if (res === "ok") {
          Swal.fire("Universidad", "Universidad Registrada", "success");
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
    var id_universidad = this.id_universidad;
    $.post(
      "../../Controllers/universidad.controller.php?op=uno",
      { id_universidad: id_universidad },
      (res) => {
        console.log(res);
        res = JSON.parse(res);
        $("#id_universidad").val(res.id_universidad);
        $("#nom_universidad").val(res.nom_universidad);
        $("#ciu_universidad").val(res.ciu_universidad);
        $("#fun_universidad").val(res.fun_universidad);
      }
    );
    $("#Modal_usuario").modal("show");
  }

  editar() {
    var dato = new FormData();
    dato = this.frm_alumnos;
    $.ajax({
      url: "../../Controllers/universidad.controller.php?op=actualizar",
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        if (res === "ok") {
          Swal.fire("universidad", "Universidad a sido modificado", "success");
          todos_controlador();
        } else {
          Swal.fire("Error", res, "error");
        }
      },
    });
    this.limpia_Cajas();
  }

  eliminar() {
    var id_universidad = this.id_universidad;

    Swal.fire({
      title: "universidad",
      text: "Esta seguro de eliminar la universidad",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        $.post(
          "../../Controllers/universidad.controller.php?op=eliminar",
          { id: id_universidad },
          (res) => {
            console.log(res);
            res = JSON.parse(res);
            if (res === "ok") {
              Swal.fire("universidad", "universidad Eliminado", "success");
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
    document.getElementById("id_universidad").value = "";
    document.getElementById("nom_universidad").value = "";
    document.getElementById("ciu_universidad").value = "";
    document.getElementById("fun_universidad").value = "";
    $("#Modal_usuario").modal("hide");
  }
}
