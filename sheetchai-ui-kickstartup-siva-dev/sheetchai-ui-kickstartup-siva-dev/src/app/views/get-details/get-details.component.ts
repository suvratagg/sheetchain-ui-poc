import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, txnHistory } from './file';
import { MyService } from "./get-details.service";
import { Router, ActivatedRoute } from "@angular/router";
import { element } from 'protractor';


@Component({
  selector: 'app-get-details',
  templateUrl: './get-details.component.html',
  styleUrls: ['./get-details.component.css'],
  providers: [MyService]
})


export class GetDetailsComponent implements OnInit {

  constructor(private myService: MyService, private route: ActivatedRoute, private router: Router) { }

  files: File[] ;
  history: txnHistory[];
  fileName: string;
  isLoading: boolean;
  userName: string;
  val: any;

  async getFiles() {
    this.isLoading = true;
    await this.myService.getFileList().toPromise()
        .then(
            files => {
              this.files = files;
              console.log(this.files[0].fileName);
              console.log(this.files[0].fileHash);
              console.log(this.files[0].userName);
            },
            err => {
              console.log(err);
            }
        )
    this.isLoading = false;        
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.val = params;
    });

    this.userName = this.val.userName;

    this.getFiles();          //everytime the component is loaded the list of files is retrieved
  }

  
  async download(name) {
    this.isLoading = true;
    console.log(name);
    this.fileName = name;
    await this.myService.handleUpdate(name);
    this.isLoading = false;
    $('#myModal').on('show.bs.modal', function () {    //this sets the title to "Downloaded
       var modal = $(this)                              //Successfully" if the show event is triggered
       modal.find('.modal-title').text('Downloaded Successfully!!')
     })

     $('#myModal').modal('show');                    //Triggers the show event
  }

  async getHistory(name) {
    this.isLoading = true;
    this.history = [];          //empties the list before API call
    this.fileName = name;
    await this.myService.viewHistory(name).toPromise()
        .then(
        element => {
          this.history = element;
          console.log(this.history[0]);
          console.log(this.history[0].timestampDate);
        },
        err => {
          console.log(err);
        }
        )

    
      this.isLoading = false;
    $('#myModalLong').on('show.bs.modal', function () {    
        var modal = $(this)                              
        modal.find('.modal-title').text(name)
    })
 
    $('#myModalLong').modal('show');  
  
  }

  goToLanding() {
    this.router.navigate(['/landing', this.val]);
  }


}
