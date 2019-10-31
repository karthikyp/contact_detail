
import { DataserviceService } from '../../data-service/dataservice.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from './contact';
import { File } from '@ionic-native/file/ngx';
import { Platform  } from '@ionic/angular';
import { stringify } from 'querystring';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.page.html',
  styleUrls: ['./add-data.page.scss'],
})
export class AddDataPage implements OnInit {
  contactDetail: any;
  //new Contact('', '', '', 0 , '', '', '');
  newDetail: any;
  fname = 'contact.json';
  mydir = '/contact.json';
  private promise: Promise<string>;
  result: any;
  array: any = [];
  value: any;
  i: any;
  obj: any;
  new: any;

  // Contact Details
  firstname: any = ' ';
  lastname: any = ' ';
  name: any = ' ';
  phone: any = 0;
  city: any = ' ';
  state: any = ' ';
  country: any = ' ';

  constructor(public activatedRoute: ActivatedRoute,  private router: Router,
              private dataservice: DataserviceService, private file: File, public platform: Platform) {
    this.activatedRoute.queryParams.subscribe((cont) => {
      this.name = cont.name;
      this.firstname = cont.firstname;
      this.lastname = cont.lastname;
      this.phone = cont.phone;
      this.city = cont.city;
      this.state = cont.state;
      this.country = cont.country;
    });
  }
  ngOnInit() {
    console.log(this.firstname);
    this.contactDetail = new Contact(this.firstname, this.lastname, this.name, this.phone , this.city, this.state, this.country);
  }
  contacts() {
    this.router.navigate(['/tabs/tab2']);
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

  // create() {
  //   this.file.createDir(this.file.dataDirectory, 'contact.json', true).then(
  //     response => console.log(response)
	// 		).catch(err => console.log(JSON.stringify(err)));
  // }


  addContact() {
    this.file.readAsText(this.file.dataDirectory, 'mydir').then(value => {
     // console.log(value);
      console.log('value ' + this.result);
      let arr: any;
      let detail: any;
      let array: any;
      array = [];
      arr = [];
      if (value !== '') {
        this.result = JSON.parse(value);
        console.log('not null');
        arr = this.result;
      }

      // pushing contact that doestnt contain current username
      detail = this.contactDetail;
      for (const obj of JSON.parse(value)) {
         if (this.name !== obj.username) {
          array.push(obj);
      }
    }

      // writing array to file
      console.log(array);
      this.file.writeFile(this.file.dataDirectory, 'mydir', array ,  {replace: true}).then(
      response => console.log(response)
    ).catch(err => console.log(JSON.stringify(err)));

      // pushing contact to array then writing array to file
      console.log('contact ' + this.contactDetail);
      array.push(this.contactDetail);
      console.log(array);
      this.file.writeFile(this.file.dataDirectory, 'mydir', array ,  {replace: true}).then(
        			response => console.log(response)
        		).catch(err => console.log(JSON.stringify(err)));
    });
    alert('Contact Saved');

  }


  click() {
	      if (this.platform.is('android')) {
			  this.file.checkDir(this.file.dataDirectory, 'mydir').then(
				response => console.log(response)
			).catch(err => console.log(JSON.stringify(err)));
      }
  }
}

