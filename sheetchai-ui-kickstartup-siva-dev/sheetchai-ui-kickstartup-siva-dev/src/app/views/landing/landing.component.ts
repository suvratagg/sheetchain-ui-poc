import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: '13.127.174.142', port: '5001', protocol: 'http' })


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  };

  data: { fileHash: string; fileName: string; };
	uploadedFiles: File ;
  hash: string;
  fileName: string;
  getAPI: string
  showUpload: boolean = false;
  teamname:string = "team";
  //commits:any = ["First commit V1", "Second commit V2", "Third commit V3"];

  fileChange(element) {
    console.log("File Change Achieved");
    this.uploadedFiles = element.target.files[0];
	  console.log(this.uploadedFiles.name);
  };


	async upload(){
    for await (const result of ipfs.add(this.uploadedFiles)){
        this.hash = result.path;
        console.log(this.hash);
    }

    this.http.post("http://13.127.174.142:8080/insertFileDetails",
      {
        "fileName": this.uploadedFiles.name ,
        "fileHash": this.hash
      },
      {responseType: 'text'})
      .subscribe(data  => {
        console.log(data);
      },
      error  => {
       console.log("Error", error);
      }

    );
      
    this.fileName = this.uploadedFiles.name;
     
    $('#myModal').on('show.bs.modal', function () {    //this sets the title to "Uploaded
      var modal = $(this)                              //Successfully" if the show event is triggered
      modal.find('.modal-title').text('File Uploaded Successfully!!')
    })

    $('#myModal').modal('show');                    //Triggers the show event

      
  };

  handleCommit() {
    console.log("commit pressed");
    this.showUpload = !(this.showUpload);
  };

  async handleUpdate() {
    console.log("update pressed");
    
    this.getAPI = "http://13.127.174.142:8080/viewfileDetails?id=" + this.uploadedFiles.name; //change to this.fileName
    console.log(this.getAPI);
    this.data = await this.http.get<any>(this.getAPI).toPromise();
    this.hash = this.data.fileHash;
    this.fileName = this.data.fileName;


    console.log(this.hash);
    console.log(this.fileName);

    for await (const file of ipfs.cat(this.hash)){		//hash will be needed from backend
      //console.log(file.content);
      const blob = new Blob([file]);

      const nameOfFile = this.fileName; 	//filename is taken from get request
      if (navigator.msSaveBlob) {
        // IE 10+
      navigator.msSaveBlob(blob, nameOfFile);
      } else {
        const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', nameOfFile);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }


    }

    $('#myModal').on('show.bs.modal', function () {    //this sets the title to "Downloaded
      var modal = $(this)                              //Successfully" if the show event is triggered
      modal.find('.modal-title').text('Downloaded Successfully!!')
    })

    $('#myModal').modal('show');                    //Triggers the show event
   
  };

}
