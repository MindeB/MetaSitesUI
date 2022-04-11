export class FileContent {

  constructor(content: Map<any, any>, fileName: string, fileFormat: string, text: string) {
    this.contentInMap = content;
    this.contentInText = text;
    this.fileName = fileName;
    this.fileFormat = fileFormat;
  }

  contentInMap: Map<any, any>;
  contentInText: string;
  fileName: string;
  fileFormat: string;

}


