import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { EventoService} from './../../../services/evento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

interface Days {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './formsEvento.component.html',
})
export class AppFormsEventoComponent implements OnInit {

  eventoForm: FormGroup;
  daySelected: any;

  constructor(
    private fb: FormBuilder,
    private _eventoService: EventoService,
    private _spinnerService: NgxSpinnerService) { }

    async ngOnInit() {
      this.eventoForm = this.fb.group({
        name: ['', Validators.required],
        days: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
      });
      await this.llenadoDeDias();
      this.daySelected = this.days[0].value;
    }

  days: Days[] = [
    { value: '0', viewValue: '0' }
  ];

  async llenadoDeDias() {
    for(let i = 1; i < 8; i++){
      this.days.push({value: i.toString(), viewValue: i.toString()});
    }
  }

  async guardarEvento() {
    if (this.eventoForm.valid) {
      const formData = this.eventoForm.value;
      //console.log('Formulario enviado', formData);
      const crearEvento = this._eventoService.create(formData).subscribe((result: any) => {

        if (!result) {
          console.log('Error al crear el evento', result);
          Swal.fire({
            title: 'Error!',
            text: 'Error al crear el evento',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          this.cancel();
          return;
        }

        console.log('Evento creado', result);
        Swal.fire({
          title: 'Success!',
          text: 'Evento creado',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.cancel();
        //this.daySelected = this.days[0].value;

      }, (error) => {
        console.log('Error al crear el evento', error.message);

        /*if (error.message.includes('http failure response')) {
          Swal.fire({
            title: 'Error!',
            text: 'Error al conectar al servidor',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          return;
        }*/

        if (error.status === 400) {
          Swal.fire({
            title: 'Error!',
            text: 'Error al crear el evento',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          return;
        }

        if (error.status === 409) {
          Swal.fire({
            title: 'Error!',
            text: 'Ya existe un evento con ese nombre',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          return;
        }
      }
      );
    
    } else {
      console.log('El formulario no es válido');
    }
  }

  cancel(): void {
    this.eventoForm.reset();
    this.daySelected = this.days[0].value;
    console.log('Formulario cancelado');
  }
  
}
