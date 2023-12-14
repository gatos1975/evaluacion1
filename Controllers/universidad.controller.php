<?php
require_once('../Models/cls_universidad.model.php');
$universidad = new Clase_Universidad;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $universidad->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $id_universidad = $_POST["id_universidad"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $universidad->uno($id_universidad); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $nom_universidad = $_POST["nom_universidad"];
        $ciu_universidad = $_POST["ciu_universidad"];
        $fun_universidad = $_POST["fun_universidad"];

        $datos = array(); //defino un arreglo
        $datos = $universidad->insertar($nom_universidad, $ciu_universidad, $fun_universidad); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $id_universidad = $_POST["id_universidad"];
        $nom_universidad = $_POST["nom_universidad"];
        $ciu_universidad = $_POST["ciu_universidad"];
        $fun_universidad = $_POST["fun_universidad"];

        $datos = array(); //defino un arreglo
        $datos = $universidad->actualizar($nom_universidad, $ciu_universidad, $fun_universidad, $id_universidad); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'eliminar':
        $id_universidad = $_POST["id_universidad"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $universidad->eliminar($id_universidad); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable       
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'actualizar_contrasenia':
        $UsuarioId = $_POST["UsuarioId"];
        $Contrasenia = $_POST["Contrasenia"];
        $datos = array(); //defino un arreglo
        $datos = $usuarios->actualizar_contrasenia($UsuarioId, $Contrasenia); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos);
        break;
    case 'login':
        $correo = $_POST["correo"];
        $contrasenia = $_POST["contrasenia"];
        if (empty($correo) || empty($contrasenia)) {
            header("Location:../login.php?op=1"); //llenar datos vacios
            exit();
        }
        try {
            $datos = array(); //defino un arreglo
            $datos = $usuarios->login($correo, $contrasenia); // almano en el arreglo la información de la base de datos
            $respuesta = mysqli_fetch_assoc($datos); // declaro una variable "respuesta" para usar los valores que trae
            if (is_array($respuesta) and count($respuesta) > 0) {  // comparar si la variable "respuesta" tiene datos y es un arreglo
                //poner variables de session controlar accessos
                //$respuesta -> trae toda la información del usuario
                session_start();
                if ($contrasenia == $respuesta["Contrasenia"]) {  //comparar la contraseña de la base con la contraseña que ingreso el usuario
                    $_SESSION['Nombres']  = $respuesta["Nombres"];
                    $_SESSION['Apellidos'] = $respuesta["Apellidos"];
                    $_SESSION['Correo']    = $respuesta["Correo"];
                    $_SESSION['Rol']       = $respuesta["Rol"];
                    $_SESSION['UsuarioId'] = $respuesta["UsuarioId"];
                    header("Location:../views/index.php");
                } else {
                    header("Location:../login.php?op=2"); //el usuario o la contraseña son incorrectos
                    exit();
                }
            } else {
                header("Location:../login.php?op=2"); //el usuario o la contraseña son incorrectos
                exit();
            }
        } catch (\Throwable $th) {
            echo json_encode($th->getMessage());
            header("Location:../login.php?op=3"); // no se que error escribir  es para capturar un error de codigo
        }
        break;
    case 'verificar_universidad':
        $nom_universidad = $_POST["nom_universidad"];
        $datos = array(); //defino un arreglo
        $datos = $universidad->verificar_universidad($nom_universidad);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;
    case "cedula_repetida":
        $Cedula = $_POST["Cedula"];
        $datos = array(); //defino un arreglo
        $datos = $usuarios->cedula_repetida($Cedula); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case "verifica_correo":
        $Correo = $_POST["Correo"];
        $datos = array(); //defino un arreglo
        $datos = $usuarios->verifica_correo($Correo); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
}
