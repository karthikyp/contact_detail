import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform  } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  response: boolean;
  mydir = ' /contact.json';
  constructor(private file: File, public platform: Platform) {}

  ngOnInit() {
    if (this.platform.is('android')) {
      this.file.checkDir(this.file.dataDirectory, 'mydir').then(response => {
        console.log('Directory exists' + response);
      }).catch(err => {
        console.log('Directory doesn\'t exist' + JSON.stringify(err));
        this.file.createFile(this.file.dataDirectory, 'contact.json', true).then(response => {
          console.log('Directory create' + JSON.stringify(response));
        }).catch(er => {
          console.log('Directory no create' + JSON.stringify(er));
          
        });
      });
     
      
  }
  

}

click() {
  if (this.platform.is('android')) {
    this.file.checkFile(this.file.dataDirectory, 'mydir').then(
      response => console.log(response)
    ).catch(err => console.log(JSON.stringify(err)));
    }
}
}

