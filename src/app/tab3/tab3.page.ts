import { Tab2Page } from './../tab2/tab2.page';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { DataserviceService } from '../data-service/dataservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { Contact } from '../pages/add-data/contact';




@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  name = '';
  phone: string;
  state = '';
  country = '';
  fullname: any;
  value: any;
  i: any;
  obj: any;
  new: any;
  del: any;
  constructor(public activatedRoute: ActivatedRoute, private router: Router, private file: File) {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.name = data.name;
      this.fullname = data.firstname + ' ' + data.lastname;
      this.phone = (data.phone);
      this.state = (data.state);
      this.country = (data.country);
    });
  }

  ngOnInit(): void {
    console.log(this.name);
  }
  rev() {
    this.router.navigateByUrl('add-data');
  }

  delete() {
    this.value = this.file.readAsText(this.file.dataDirectory, 'mydir').then(value => {
      let array: any;
      array = [];
      for (const obj of JSON.parse(value)) {
        if (this.name  !== obj.username) {
          array.push(obj);
        }
      }
      console.log(array);
      this.file.writeFile(this.file.dataDirectory, 'mydir', array ,  {replace: true}).then(
        response => console.log(response)
        ).catch(err => console.log(JSON.stringify(err)));
    });
    alert(this.name + ' contact deleted');
  }

  update() {
    this.value = this.file.readAsText(this.file.dataDirectory, 'mydir').then(value => {
      let array: any;
      array = [];
      for (const obj of JSON.parse(value)) {
        if (this.name === obj.username) {
          const name = obj.username;
          const phone = obj.phone;
          const state = obj.state;
          const city = obj.city;
          const country = obj.country;
          const firstname = obj.firstname;
          const lastname = obj.lastname;
          console.log(name + ' ' + ' ' + phone + ' ' + ' ' + firstname + ' ' + lastname);
          this.router.navigate(['/add-data'],
          {
            queryParams: {firstname, lastname, name, phone, city, state, country}});
         }
       }
      });
  }

//   constructor(private route: ActivatedRoute, private dataService: DataserviceService) { }
//   ngOnInit() {
//     // /* Solution 1 */
//     // let name = this.route.snapshot.paramMap.get('username');    
//     // console.log(name);
//     /* Solution 2 */
//     const phone = this.dataService.getUserName();
//     console.log(phone);
// }

// //   val: any;
// //   constructor(public navCtrl: NavController, public navParams: NavParams) {
// //       this.val = navParams.get('val');
// //   }
// // 
}

