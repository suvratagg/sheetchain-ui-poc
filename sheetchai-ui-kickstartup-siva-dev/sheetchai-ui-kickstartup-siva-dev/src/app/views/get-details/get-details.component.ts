import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, txnHistory } from './file';
import { MyService } from "./get-details.service";
import { element } from 'protractor';


@Component({
  selector: 'app-get-details',
  templateUrl: './get-details.component.html',
  styleUrls: ['./get-details.component.css'],
  providers: [MyService]
})


export class GetDetailsComponent implements OnInit {

  constructor(private myService: MyService) { }

  files: File[] ;
  history: txnHistory[];
  fileName: string;

  getFiles():void {
    this.myService.getFileList()
        .subscribe(
            files => {
              this.files = files;
              console.log(this.files[0].fileName);
              console.log(this.files[0].fileHash);
            },
            err => {
              console.log(err);
            }
        )

  }

  ngOnInit(): void {
    this.getFiles();          //everytime the component is loaded the list of files is retrieved
  }

  
  download(name): void {
    console.log(name);
    this.fileName = name;
    this.myService.handleUpdate(name);
  }

  getHistory(name): void {
    this.fileName = name;
    this.myService.viewHistory(name)
        .subscribe(
        element => {
          this.history = element;
          console.log(this.history[0]);
          console.log(this.history[0].timestampDate);
        },
        err => {
          console.log(err);
        }
        )

    

    $('#myModalLong').on('show.bs.modal', function () {    //this sets the title to "Downloaded
        var modal = $(this)                              //Successfully" if the show event is triggered
        modal.find('.modal-title').text(name)
    })
 
    $('#myModalLong').modal('show');  
  
  }

}
