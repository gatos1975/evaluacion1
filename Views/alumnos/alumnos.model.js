
class Alumnos_Model {
    constructor(
      id_estudiante,
      id_univerdidad,
      id_carrera,
      nom_estudiante,
      fing_estudiante,
      frm_alumnos,
      Ruta
    ) {
      this.cod_alumnos = cod_alumnos;
      this.ced_alumnos = ced_alumnos;
      this.nom_alumnos = nom_alumnos;
      this.fecn_alumnos = fecn_alumnos;
      this.luz_alumnos = luz_alumnos;
      this.dom_alumnos = dom_alumnos;
      this.esp_alumnos = esp_alumnos;
      this.niv_alumnos = niv_alumnos;
      this.rep_alumnos = rep_alumnos;
      this.frm_alumnos = frm_alumnos;
      this.Ruta = Ruta;
    }
    todos() {
      var html = "";
      $.get("../../Controllers/alumnos.controller.php?op=" + this.Ruta, (res) => {
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
                  <td>${valor.nom_alumnos}</td>
                  <td>${valor.esp_alumnos}</td>
                  <td>${valor.niv_alumnos}</td>
                  
              <td>
              <button class='btn btn-success' onclick='editar(${
                valor.cod_alumnos
              })'>Editar</button>
              <button class='btn btn-danger' onclick='eliminar(${
                valor.cod_alumnos
              })'>Eliminar</button>
              <button class='btn btn-info' onclick='ver(${
                valor.cod_alumnos
              })'>Ver</button>
              </td></tr>
                  `;
        });
        $("#tabla_alumnos").html(html);
      });
    }
  
    insertar() {
      var dato = new FormData();
      dato = this.frm_alumnos;//****************************************OJO */
     $.ajax({
      url: "../../Controllers/alumnos.controller.php?op=insertar",
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
          res = JSON.parse(res);
          if(res === "ok"){
              Swal.fire("Alumnos", "Alumno Registrado", "success");
              todos_controlador();
          }else{
              Swal.fire("Error", res, "error"); 
          }
      }
     });
     this.limpia_Cajas();    
    }
  
    cedula_repetida(){
      var Cedula = this.ced_alumnos;
      $.post("../../Controllers/alumnos.controller.php?op=cedula_repetida", {Cedula: Cedula}, (res) => {
          res = JSON.parse(res);
          if( parseInt(res.cedula_repetida) > 0){
              $('#CedulaRepetida').removeClass('d-none');
              $('#CedulaRepetida').html('La cédua ingresa, ya exite en la base de datos');
              $('button').prop('disabled', true);
          }else{
              $('#CedulaRepetida').addClass('d-none');
              $('button').prop('disabled', false);
          }
  
      })
    }
  
  
    uno() {
      var cod_alumnos = this.cod_alumnos;
      $.post(
        "../../Controllers/alumnos.controller.php?op=uno",
        { cod_alumnos: cod_alumnos },
        (res) => {
          console.log(res);
          res = JSON.parse(res);
          $("#cod_alumnos").val(res.cod_alumnos);
          $("#ced_alumnos").val(res.ced_alumnos);
          $("#nom_alumnos").val(res.nom_alumnos);
          $("#fecn_alumnos").val(res.fecn_alumnos);
          $("#luz_alumnos").val(res.luz_alumnos);
          $("#dom_alumnos").val(res.dom_alumnos);
          $("#esp_alumnos").val(res.esp_alumnos);
          $("#niv_alumnos").val(res.niv_alumnos);
          $("#rep_alumnos").val(res.rep_alumnos);

        }
      );
      $("#Modal_alumnos").modal("show");
    }
  
    editar() {
      var dato = new FormData();
      dato = this.frm_alumnos;
      $.ajax({
        url: "../../Controllers/alumnos.controller.php?op=actualizar",
        type: "POST",
        data: dato,
        contentType: false,
        processData: false,
        success: function (res) {
          res = JSON.parse(res);
          if (res === "ok") {
            Swal.fire("alumnos", "Alumno Registrado", "success");
            todos_controlador();
          } else {
            Swal.fire("Error", res, "error");
          }
        },
      });
      this.limpia_Cajas();
    }
  
    eliminar() {
      var cod_alumnos = this.cod_alumnos;
  
      Swal.fire({
        title: "alumnos",
        text: "Esta seguro de eliminar el alumno",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          $.post(
            "../../Controllers/alumnos.controller.php?op=eliminar",
            { cod_alumnos: cod_alumnos },
            (res) => {
              console.log(res);
              
              res = JSON.parse(res);
              if (res === "ok") {
                Swal.fire("alumnos", "Alumno Eliminado", "success");
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
    limpia_Cajas(){
      document.getElementById("cod_alumnos").value = "";
      document.getElementById("ced_alumnos").value = "";
      document.getElementById("nom_alumnos").value = "";  
      document.getElementById("fecn_alumnos").value = "";
      document.getElementById("luz_alumnos").value = "";
      document.getElementById("dom_alumnos").value = "";
      document.getElementById("esp_alumnos").value = "";
      document.getElementById("niv_alumnos").value = "";
      document.getElementById("rep_alumnos").value = "";
      $("#Modal_alumnos").modal("hide");
    }
  }
  