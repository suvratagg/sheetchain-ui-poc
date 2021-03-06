import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { timeout, catchError } from "rxjs/operators";
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: '15.207.86.202', port: '5001', protocol: 'http' })
const toBuffer = require('it-to-buffer')

import { File } from './file'
import { txnHistory } from "./file";

@Injectable()
export class MyService {
  constructor(private http: HttpClient) {}

  getAPI: string;
  data: File;
  fileName: string;

  getFileList(): Observable<File[]> {
    return this.http.get<File[]>('http://13.235.242.112:8080/fetchFileDetails').pipe(timeout(10000));
  }

  async handleUpdate(name: string, username: string) {
    //console.log(username);
    console.log("update pressed");
    this.fileName =  name;
    this.getAPI = "http://13.235.242.112:8080/viewfileDetails?id=" + this.fileName; //change to this.fileName
    
    console.log(this.getAPI);
    
    this.data = await this.http.get<any>(this.getAPI).toPromise();
    //this.hash = this.data.fileHash;
    this.fileName = this.data.fileName;

    console.log(this.fileName);

    const file = await toBuffer(ipfs.cat(this.data.fileHash));

    //save hash details with user
    await this.http.post("http://13.235.242.112:8080/saveHashDetails",
      {
        "fileHashPK":{
          "username": username,
          "fileName": name
        },
        "fileHash": this.data.fileHash
      },
      {responseType: 'text'}).toPromise()
      .then(data  => {
        console.log(data);
      },
      error  => {
      console.log("Error", error);
      }

    );

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

    
   
  };

  viewHistory(name: string): Observable<txnHistory[]> {

    this.fileName =  name;
    this.getAPI = "http://13.235.242.112:8080/getTxnHistory?id=" + this.fileName;
    return this.http.get<txnHistory[]>(this.getAPI);
    //console.log(this.txnHistory);
  }


}