import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
// Contact Details
firstname: any;
lastname: any;
name: any;
phone: any;
city: any;
state: any;
country: any;

  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe((cont) => {
      this.name = cont.name;
      this.firstname = cont.firstname;
      this.lastname = cont.lastname;
      this.phone = cont.phone;
      this.city = cont.city;
      this.state = (cont.state);
      this.country = (cont.country);
      console.log(cont.firstname);
    });
   }

  ngOnInit() {
    console.log(this.firstname);
  }
  
  contacts() {
    this.router.navigate(['/tabs/tab2']);
  }
}
