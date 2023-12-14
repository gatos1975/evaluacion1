//aqui va a estar el codigo de usuarios.model.js

function init() {
  $("#frm_alumnos").on("submit", function (e) {
    guardaryeditar(e);
  });
}

$().ready(() => {
  todos();
});

var todos = () => {
  var html = "";
  $.get("../../Controllers/alumnos.controller.php?op=todos", (res) => {
    //console.log(res);
    res = JSON.parse(res);
    $.each(res, (index, valor) => {
      html += `<tr>
                <td>${index + 1}</td>
                <td>${valor.nom_estudiante}</td>
                <td>${valor.nom_universidad}</td>
                <td>${valor.nom_carrera}</td>
                <td>${valor.fing_estudiante}</td>
            <td>
            <button class='btn btn-success' onclick='editar(${
              valor.id_estudiante
            })'>Editar</button>
            <button class='btn btn-danger' onclick='eliminar(${
              valor.id_estudiante
            })'>Eliminar</button>
            <button class='btn btn-info' onclick='ver(${
              valor.id_estudiante
            })'>Ver</button>
            </td></tr>
                `;
    });
    $("#tabla_alumnos").html(html);
  });
};

var guardaryeditar = (e) => {
  e.preventDefault();
  var dato = new FormData($("#frm_alumnos")[0]);
  var ruta = "";
  var id_estudiante = document.getElementById("id_estudiante").value;
  if (id_estudiante > 0) {
    ruta = "../../Controllers/alumnos.controller.php?op=actualizar";
  } else {
    ruta = "../../Controllers/alumnos.controller.php?op=insertar";
  }
  $.ajax({
    url: ruta,
    type: "POST",
    data: dato,
    contentType: false,
    processData: false,
    success: function (res) {
      res = JSON.parse(res);
      if (res == "ok") {
        Swal.fire("Estudiantes", "Registrado con éxito", "success");
        todos();
        limpia_Cajas();
      } else {
        Swal.fire("Estudiantes", "Error al guardo, intente mas tarde", "error");
      }
    },
  });
};

var cargaUniversidad = () => {
  return new Promise((resolve, reject) => {
    $.post("../../Controllers/universidad.controller.php?op=todos", (res) => {
      res = JSON.parse(res);
      var html = "";
      $.each(res, (index, val) => {
        html += `<option value="${val.id_universidad}"> ${val.nom_universidad}</option>`;
      });
      $("#id_universidad").html(html);
      resolve();
    }).fail((error) => {
      reject(error);
    });
  });
};
var cargaCarrera = () => {
  return new Promise((resolve, reject) => {
    $.post("../../Controllers/carrera.controller.php?op=todos", (res) => {
      res = JSON.parse(res);
      var html = "";
      $.each(res, (index, val) => {
        html += `<option value="${val.id_carrera}"> ${val.nom_carrera}</option>`;
      });
      $("#id_carrera").html(html);
      resolve();
    }).fail((error) => {
      reject(error);
    });
  });
};

function cargarDatos() {
  cargaUniversidad()
    .then(() => cargaCarrera())
    .catch((error) => {
      console.error("Error al cargar datos:", error);
    });
}

var editar = async (id_estudiante) => {
  await cargaUniversidad();
  $.post(
    "../../Controllers/alumnos.controller.php?op=uno",
    { id_estudiante: id_estudiante},
    (res) => {
      res = JSON.parse(res);

      $("#id_estudiante").val(res.id_estudiante);
      $("#id_universidad").val(res.id_universidad);
      //document.getElementById("PaisId").value = res.PaisesId;
      $("#nom_estudiante").val(res.nom_estudiante);
    }
  );
  $("#Modal_alumnos").modal("show");
};

var eliminar = (id_estudiante) => {
  Swal.fire({
    title: "Estudiantes",
    text: "Esta seguro de eliminar al Estudiante",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post(
        "../../Controllers/alumnos.controller.php?op=eliminar",
        { id_estudiante: id_estudiante },
        (res) => {
          res = JSON.parse(res);
          if (res === "ok") {
            Swal.fire("Estudiante", "Estudiante Eliminado", "success");
            todos();
          } else {
            Swal.fire("Error", res, "error");
          }
        }
      );
    }
  });

  limpia_Cajas();
};

var limpia_Cajas = () => {
  document.getElementById("id_estudiante").value = "";
  document.getElementById("id_universidad").value = "";
  document.getElementById("id_carrera").value = "";
  document.getElementById("nom_estudiante").value = "";
  document.getElementById("fing_estudiante").value = "";

  $("#Modal_alumnos").modal("hide");
};
init();
