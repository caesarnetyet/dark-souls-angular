import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {Location} from "@angular/common";
import {CharacterService} from "../../../services/character.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  @Input() data: { [key: string]: any } = {};
  @Input() path: string = '';

  @Input() isClass: boolean = false;
  @Input() method: string = 'POST';

  @Input() select: {id: number, name: string}[] = []
  @Input() selectName: string = ''


  headers: string[] = [];

  mostrar = true;
  @Output() cerrado = new EventEmitter<boolean>();

  @Input() title: string = '';
  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private location: Location,
              private characterService: CharacterService,
              private router: Router) { }
  ngOnInit() {
    this.form = this.formBuilder.group(this.generateFormControls(this.data));
    this.headers = this.getHeaders()
  }

  private generateFormControls(data: { [key: string]: any }) {
    const formControls : { [key: string]: any} = {};

    Object.keys(data).forEach(key => {

      formControls[key] = [data[key], Validators.required, ];
    });
    return formControls;
  }
  cerrar()
  {
    this.mostrar = !this.mostrar;
    this.cerrado.emit(!this.mostrar);
  }
  private goBack() {
    this.location.back()
  }
  getHeaders(): string[] {
    const headers: string[] = [];
    let control = Object.keys(this.form.controls)
    for (let i = 0; i < control.length; i++) {
      switch(control[i]) {
        case 'class':
          this.selectName = 'class'
          this.getClasses()
          break;
        case 'role':
          this.selectName = 'role'
          this.getRoles()
          break;

        default:
          headers.push(control[i])
      }
    }
    return headers
  }

  private getClasses() {
    this.characterService.getClass().subscribe(data => {
      this.select = data
      console.log(this.select)
    })
  }

  submit() {

    console.log(this.form.value)
    console.log(this.path)
    this.userService.genericRequest(this.path, this.method, this.form.value).subscribe(
      () => {
        if (this.isClass){
          this.characterService.getClasses().subscribe(data => {
            this.characterService.classes.next(data)
            this.router.navigate(['/dashboard/employee'])
          })
        }
      }
    )

  }


  private getRoles() {
    this.userService.getRoles().subscribe(data => {
      this.select = data
      console.log(this.select)
    })
  }
}
