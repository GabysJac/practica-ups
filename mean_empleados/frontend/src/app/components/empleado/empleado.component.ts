import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado'
import { NgForm} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  selectedEmpleado: Empleado = {
    nombre: '',
    cargo: '',
    departamento: '',
    sueldo: 0
  };
  constructor(private modalService: NgbModal,public empleadoService:EmpleadoService) {  }
  
  empleados: Empleado[] = [];
  

  ngOnInit(): void {
    this.getEmpleados();
  }
  openEditModal(editModal: any, empleado: Empleado) {
    this.selectedEmpleado = { ...empleado };
    this.modalService.open(editModal);
  }
  onEdit(form: NgForm) {
    if (form.valid) {
      this.empleadoService.updateEmpleado(this.selectedEmpleado._id!, this.selectedEmpleado).subscribe(
        res => {
          this.getEmpleados();
          this.modalService.dismissAll();
        },
        err => console.error(err)
      );
    }
  }
  getEmpleados()
  {
    this.empleadoService.getEmpleados().subscribe(
      res=>{
      this.empleadoService.empleados=res;
      },
      err=>console.error(err) 
      );
    }
  
  addEmpleado(form:NgForm){
    this.empleadoService.createEmpleado(form.value).subscribe(
      res=>{
        this.getEmpleados();
        form.reset();
      },
      err=>console.error(err)
    );
  }

  eliminarEmpleado(id: string | undefined) {
    if (id) {
      this.empleadoService.deleteEmpleado(id).subscribe(
        res => {

          this.empleadoService.getEmpleados().subscribe(
            empleados => this.empleadoService.empleados = empleados
          );
        },
        err => console.error(err)
      );
    } else {
      console.error('ID de empleado no proporcionado');
      return;
    }
  }


  actualizarEmpleado(id: string, empleado: Empleado) {
    this.empleadoService.updateEmpleado(id, empleado).subscribe(
      res => {
        
        this.empleadoService.getEmpleados().subscribe(
          empleados => this.empleadoService.empleados = empleados
        );
      },
      err => console.error(err)
    );
  }


  }
  