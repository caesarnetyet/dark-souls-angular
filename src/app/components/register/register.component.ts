import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {UserService} from "../../services/user/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../interfaces/user";
import {MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: ['', Validators.required]
  });

  constructor(
    private messageService: MessagesService,
    private fb: FormBuilder, private location: Location, private userService: UserService) {
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    console.log('clicked submit')
    if (this.registerForm.invalid){
      this.messageService.updateNotification('Formulario invalido', 'red', 'Error')

    }

    if (this.registerForm.valid) {
      const user: User = {
        name: this.registerForm.value.name ?? '',
        email: this.registerForm.value.email ?? '',
        phone: this.registerForm.value.phone?? '',
        role:'',
        password: this.registerForm.value.password ?? '',
        active: false
      }
      this.userService.addUser(user).subscribe(((data) => {
        console.log(data)
        this.goBack()

      }))

    }

  }
}
