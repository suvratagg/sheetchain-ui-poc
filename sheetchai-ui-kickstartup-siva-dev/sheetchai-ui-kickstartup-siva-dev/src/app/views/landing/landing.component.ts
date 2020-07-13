import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  };

  showUpload: boolean = false;
  teamname:string = "team";
  commits:any = ["First commit V1", "Second commit V2", "Third commit V3"];

  fileChange(args) {
    console.log("File Change Achieved");
  };

  upload() {
    console.log("upload pressed");
  };

  handleCommit() {
    console.log("commit pressed");
    this.showUpload = true;
  };

  handleUpdate() {
    console.log("update pressed");
  };

}
