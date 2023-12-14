<?php require_once('../html/head2.php') ?>




<div class="row">

    <div class="col-lg-8 d-flex align-items-stretch">
        <div class="card w-100">
            <div class="card-body p-4">
                <h5 class="card-title fw-semibold mb-4">Lista de Estudiantes</h5>

                <div class="table-responsive">
                    <button type="button" onclick="cargarDatos()" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal_alumnos">
                        Nuevo Estudiante
                    </button>
                    <table class="table text-nowrap mb-0 align-middle">
                        <thead class="text-dark fs-4">
                            <tr>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">#</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Nombres</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Universidad</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Carrera</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">FechaIngreso</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Opciones</h6>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tabla_alumnos">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Ventana Modal-->

<!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="Modal_alumnos" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="form_alumnos">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Estudiantes</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="id_estudiante" id="id_estudiante">
                    <div class="form-group">
                        <label for="nombres">Apellidos y nombres</label>
                        <input type="text" onfocusout="algoritmo_cedula();cedula_repetida();" required class="form-control" id="nom_estudiante" name="nom_estudiante" placeholder="Nombres del Estudiante">
                        <div class="alert alert-danger d-none" role="alert" id="errorCedula">
                        </div>
                        <div class="alert alert-danger d-none" role="alert" id="CedulaRepetida">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="ingreso">Fecha de Ingreso</label>
                        <input type="text" required class="form-control" id="fing_estudiante" name="fing_estudiante" placeholder="Fecha Ingreso">
                    </div>

                    <div class="form-group">
                        <label for="id_universidad">Universidad</label>
                        <select name="id_universidad" id="id_universidad" class="form-control">
                            <option value="0">Seleccione la universidad</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="id_carrera">Carrera</label>
                        <select name="id_carrera" id="id_carrera" class="form-control">
                            <option value="0">Seleccione la carrera</option>
                        </select>
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Grabar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php require_once('../html/script2.php') ?>

<script src="alumnos.js"></script>
