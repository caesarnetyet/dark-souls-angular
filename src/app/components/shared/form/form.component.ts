import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  @Input() data: { [key: string]: any } = {};
  @Input() path: string = '';
  @Input() method: string = 'POST';
  @Input() select: object[] = []
  @Input() mostrar: boolean = true;
  @Input() title: string = '';
  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,private userService: UserService, private location: Location) { }
  ngOnInit() {
    this.form = this.formBuilder.group(this.generateFormControls(this.data));
  }

  private generateFormControls(data: { [key: string]: any }) {
    const formControls : { [key: string]: any} = {};
    Object.keys(data).forEach(key => {
      formControls[key] = [data[key], Validators.required, ];
    });
    return formControls;
  }
  private goBack() {
    this.location.back()
  }
  getHeaders(): string[] {return Object.keys(this.form.controls)}

  submit() {
    console.log('CLick')
    this.userService.genericRequest(this.path, this.method, this.form.value).subscribe(
      (data) => {
        console.log(data)
        this.goBack()
      }
    )

  }
}
