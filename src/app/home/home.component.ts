import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {FileContent} from '../models/FileContent';
import {FileService} from '../shared/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  zipFile: Blob;
  received: boolean;
  filesList: FileContent[] = [];

  constructor(private sharedService: SharedService, private fileService: FileService) {
    this.received = false;
  }

  ngOnInit(): void {
  }

  uploadFile($event): void {
    this.sharedService.uploadFile($event.target.files).subscribe(value => {
        this.parseZipFile(value);
        this.received = true;
        this.zipFile = value;
      }, error => {
        this.received = false;
        console.log(error);
      }
    );
  }

  parseZipFile(data: any): void {
    this.filesList = this.fileService.parseZipFile(data);
    this.filesList.sort((a, b) => a.fileName[0].localeCompare(b.fileName[0]));
  }

  downloadFile(file: FileContent): void {
    const createdFile = this.fileService.createFile(file.contentInText, file.fileFormat);
    this.prepareDownloadLink(createdFile, file.fileName);
  }

  downloadAllFiles(): void {
    const zipFile = this.fileService.createFile(this.zipFile, 'application/zip');
    this.prepareDownloadLink(zipFile, 'all');
  }

  private prepareDownloadLink(createdFile: Blob, fileName: string): void {
    const a = document.createElement('a');
    const url = URL.createObjectURL(createdFile);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  goBack(): void {
    this.received = false;
    this.filesList = [];
  }
}
