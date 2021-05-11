import { Component, OnInit } from '@angular/core';
import { DataDbService } from '../../services/data-db.service';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { MessageI } from '../../models/message.interface';

@Component({
  selector: 'contactForm',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  emailpattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';

  createFormGroup(){
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailpattern)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)])

    });
  }

  contactForm: FormGroup;
  constructor(private dbData: DataDbService) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  onResetForm(){
    this.contactForm.reset();
  }
  onSaveForm(){
    //   para probar
    //   const newContact = {
    //   name: 'manuel',
    //   email: 'manuelpra20@gmail.com',
    //   message: 'hola mundo'
    // };

    if (this.contactForm.valid){
      this.dbData.saveMessage(this.contactForm.value);
      this.onResetForm();
      console.log('Valid');
      console.log('Saved', this.contactForm.value);
    }else{
      console.log('not valid');
    }
    // this.dbData.saveMessage(newContact);
  }
  // para que agarre cada uno de los *ngif de los mensajes del campo del formulario
  get name(){ return this.contactForm.get('name'); }
  get email(){ return this.contactForm.get('email'); }
  get message(){ return this.contactForm.get('message'); }
}


  //  SI LOS DATOS EN EN FORMULARIO SON VALIDOS : if (this.contactForm.valid){}
  //  GUARDAR DATOS this.dbData.saveMessage(this.contactForm.value);

