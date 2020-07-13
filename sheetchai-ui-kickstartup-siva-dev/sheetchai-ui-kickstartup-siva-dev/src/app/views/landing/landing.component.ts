import { Component, OnInit } from '@angular/core';


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'localhost', port: '5001', protocol: 'http' })

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

	uploadedFiles: File ;
	hash: string;

  constructor() { }

  ngOnInit(): void {
  };

  showUpload: boolean = false;
  teamname:string = "team";
  commits:any = ["First commit V1", "Second commit V2", "Third commit V3"];

  fileChange(element) {
    console.log("File Change Achieved");
    this.uploadedFiles = element.target.files[0];
	  console.log(this.uploadedFiles.name);
  };


  /*upload() {
    console.log("upload pressed");
  };*/


	async upload(){
      for await (const result of ipfs.add(this.uploadedFiles)){
        this.hash = result.path;
        console.log(result.path);
      };
}

  handleCommit() {
    console.log("commit pressed");
    this.showUpload = true;
  };

  async handleUpdate() {
    console.log("update pressed");

    for await (const file of ipfs.cat(this.hash)){		//hash will be needed from backend
      //console.log(file.content);
      const blob = new Blob([file]);

      const fileName = 'version1.xlsx'; 	// filename is hardcoded for now
      if (navigator.msSaveBlob) {
        // IE 10+
      navigator.msSaveBlob(blob, fileName);
      } else {
        const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', fileName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }


    }

  };

}
