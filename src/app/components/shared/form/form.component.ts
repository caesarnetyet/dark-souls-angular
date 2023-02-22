import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  @Input() data: { [key: string]: any } = {};
  @Input() url: string = '';
  @Input() method: string = 'POST';

  form: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder) { }
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
  getHeaders(): string[] {return Object.keys(this.form.controls)}

}
