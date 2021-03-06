import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../user-service.service';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: '15.207.86.202', port: '5001', protocol: 'http' })
const toBuffer = require('it-to-buffer')

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  data: { fileHash: string; fileName: string};
	uploadedFiles: File ;
  hash: string;
  fileName: string;
  getAPI: string
  showUpload: boolean = false;
  isLoading: boolean = false;
  teamname:string = "team";
  val:any;
  userName: string;
  //commits:any = ["First commit V1", "Second commit V2", "Third commit V3"];


  constructor(private http: HttpClient, 
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserServiceService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.val = params;
    });

    this.userName = this.val.username;
    this.userService.getUserName(this.userName).subscribe(data => {
      this.userName = data.username;
    });
    console.log(this.userName);
  };

  

  fileChange(element) {
    console.log("File Change Achieved");
    this.uploadedFiles = element.target.files[0];
    console.log(this.uploadedFiles.name);
    $('#fileInput').html(this.uploadedFiles.name);
  };


	async upload(){
    this.isLoading = true;
    for await (const result of ipfs.add(this.uploadedFiles)){
        this.hash = result.path;
        console.log(this.hash);
    }
    console.log(this.userName);
    await this.http.post("http://13.235.242.112:8080/insertFileDetails",
      {
        "fileName": this.uploadedFiles.name ,
        "fileHash": this.hash,
        "userName": this.userName
      },
      {responseType: 'text'}).toPromise()
      .then(data  => {
        console.log(data);
        $('#myModal').on('show.bs.modal', function () {               //this sets the title to "Uploaded
          var modal = $(this)                                         //Successfully" if the show event is triggered
          if(data == 'Record Successfully inserted'){
            modal.find('.modal-title').html('<strong>File Uploaded Successfully</strong>')
          }else{
            modal.find('.modal-title').html('<strong>File Not Uploaded</strong>')
            modal.find('#modal-body-text').html('Please download the latest version of the file.')
          }
          
        })
      },
      error  => {
        console.log("Error", error);
      }

    );
      
    this.fileName = this.uploadedFiles.name;
    this.isLoading = false;
    

    $('#myModal').modal('show');                    //Triggers the show event

    $('#fileInput').text('Choose File');

  };

  handleCommit() {
    console.log("commit pressed");
    this.showUpload = !(this.showUpload);
  };

  //function to download the latest version of the filename(currently use in getdetails component)
  async handleUpdate() {
    console.log("update pressed");
    
    this.getAPI = "http://13.235.242.112:8080/viewfileDetails?id=" + this.uploadedFiles.name; //change to this.fileName
    console.log(this.getAPI);
    this.data = await this.http.get<any>(this.getAPI).toPromise();
    this.hash = this.data.fileHash;
    this.fileName = this.data.fileName;


    console.log(this.hash);
    console.log(this.fileName);

    
    //console.log(file.content);
    const file = await toBuffer(ipfs.cat(this.hash));

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


  

    $('#myModal').on('show.bs.modal', function () {    //this sets the title to "Downloaded
      var modal = $(this)                              //Successfully" if the show event is triggered
      modal.find('.modal-title').text('Downloaded Successfully!!')
    })

    $('#myModal').modal('show');                    //Triggers the show event
   
  };

  
  //Go to get Details Component with username
  goToGetDetails(){
    this.router.navigate(['/get-details', this.val]);
  }




}
