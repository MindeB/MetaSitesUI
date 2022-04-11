import {Injectable} from '@angular/core';
import {FileContent} from "../models/FileContent";
import * as JSZip from "jszip";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  zip: JSZip;

  constructor() {
    this.zip = new JSZip();
  }


  parseZipFile(data: any): FileContent[] {
    const filesList: FileContent[] = [];
    this.zip.loadAsync(data).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        zip.files[filename].async('string').then((fileData) => {
          filesList.push(new FileContent(new Map(Object.entries(JSON.parse(fileData))), filename, '.txt', fileData));
        });
      });
    });
    return filesList;
  }

  createFile(fileContent: any, fileType: string): Blob {
    return new Blob([fileContent], {type: fileType});
  }

}
