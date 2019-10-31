import { File } from '@ionic-native/file/ngx';
//import { DataserviceService } from '.app';
// import { Tab3Page } from './../tab3/tab3.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// // tslint:disable-next-line: no-unused-expression
// import { DataserviceService } from '../data-service/dataservice.service';
import { Platform  } from '@ionic/angular';
import { from } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  results: any;
  navCtr1: any;
  phone: any;
  array = [] ;
  private promise: Promise<string>;
  result: any;
  mydir = '/contact.json';
  filteredArr = [];


  constructor(public alertController: AlertController, private router: Router, public platform: Platform, private file: File) {}
  ngOnInit() {
    // fetch('./assets/data/contacts.json').then(res => res.json()).then(json => {
    //   console.log('results::', json);
    //   this.results = json;
    //   console.log(typeof this.results);
    // });
    if (this.platform.is('android')) {
        this.promise = this.file.readAsText(this.file.dataDirectory, 'mydir');
        this.promise.then(value => {
        //console.log(value);
        //console.log(typeof value);
        // this.result = JSON.parse(value);
        // console.log(JSON.stringify(this.result));
        //document.getElementById('dis').innerHTML = this.result.firstname + ' ' + this.result.lastname;
        // this.array.push(this.result);
        // console.log('result ' + JSON.stringify(this.result));
        // console.log('array ' + JSON.stringify(this.array));
        this.array = JSON.parse(value);
        this.filteredArr = JSON.parse(JSON.stringify(this.array));
        
        });
      }

   
    
    
    
  }

  info(val: any): void {
    const name = val.username;
    const phone = val.phone;
    const state = val.state;
    const country = val.country;
    const firstname = val.firstname;
    const lastname = val.lastname;
    const profile = val.image;
    this.router.navigate(['/tabs/tab3'],
       {queryParams: {name, phone, state, country, firstname, lastname}});
      }

  add_contact() {
    this.router.navigateByUrl('add-data');
  }

  search(fname: any) {
    const val = fname.target.value;
    console.log(val);
    console.log(fname);
    if (val) {
      this.filteredArr = this.array.filter((item) => {
        return item.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.filteredArr =  this.array;
    }
    //console.log(this.filteredArr);
  }

  // async test(val: any) {
  //   const pp = await this.alertController.create({
  //     header: val.username,
  //     buttons: ['OK']
  //   });
  //   await pp.present();
  // }
}

// export class NextPage {
//   constructor(private router: Router) {}
//   info(): void {
//     this.router.navigate(['/tabs/tab3']);
//   }
// }
