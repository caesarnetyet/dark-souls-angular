import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.css']
})
export class CodigoComponent implements OnInit {

  verification_url?: string;
  url?: string;
  codigo?: string;
  constructor(private userService: UserService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getSigned_url();

  }

   private getSigned_url() {
     this.route.queryParams.subscribe(params => {
       this.url = decodeURIComponent(params['url']);
       this.userService.getVerificationCode(this.url).subscribe((data) => {
         this.verification_url = data;
         console.log(data)
       })
     });
    }


  async submit() {
    console.log('clicked'+ this.verification_url + this.codigo)
    if (this.verification_url && this.codigo)
      await this.userService.verifyCode(this.verification_url, this.codigo).subscribe(()=> {
         this.router.navigate(['/chibi'])
      });

  }
}
