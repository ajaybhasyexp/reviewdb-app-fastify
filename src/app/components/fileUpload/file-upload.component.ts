import { Component, OnInit, HostListener, Output,EventEmitter } from '@angular/core';
import { FileData } from 'src/app/models/fileData';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  maxFiles = 10;
  maxSize = 15;
  dragAreaClass = 'dragarea';
  fileExt = 'png, jpeg, jpg, gif';
  errors: Array<string> = [];
  formData: FormData = new FormData();
  allFiles: any[] = [];
  images: any[] = [];
  @Output() uploadedImages = new EventEmitter<FileData[]>();


  constructor() { }

  ngOnInit() {
  }

  onFileChange(event) {
    const files = event.target.files;
    this.saveFiles(files);
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    this.saveFiles(files);
  }

  saveFiles(files) {
    this.errors = [];
    if (files.length > 0 && (!this.isValidFiles(files))) {
      // this.uploadStatus.emit(false);
      return;
    }

    if (files.length > 0) {
      this.formData = new FormData();
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < files.length; j++) {
        this.formData.append('files', files[j], files[j].name);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const imgBase64Path = e.target.result;
            this.images.push(imgBase64Path);
            // tslint:disable-next-line: no-use-before-declare
            const fileData = new FileData();
            fileData.files = files[j];
            fileData.img = imgBase64Path;
            this.allFiles.push(fileData);
            this.uploadedImages.emit(this.allFiles);
          };
        };

        reader.readAsDataURL(files[j]);
      }
    }
  }

  removeSelectedImage(index) {
    this.allFiles.splice(index, 1);
  }

  private addedFilesExtensions() {
    let extensions = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allFiles.length; i++) {
      extensions = this.allFiles[i].name.toUpperCase().split('.').pop() || this.allFiles[i].name;
    }

    return extensions;
  }

  private isValidFiles(files) {
    if (files.length > this.maxFiles) {
      this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
      return;
    }

    if (this.allFiles.length > 15) {
      this.errors.push('Error: Maximum 15 file are allowed to upload');
      return;
    }

    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }

  private isValidFileExtension(files) {
    const extensions = (this.fileExt.split(','))
      // tslint:disable-next-line:only-arrow-functions
      .map(function (x) { return x.toLocaleUpperCase().trim(); });
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      const exists = extensions.indexOf(ext) !== -1;
      if (!exists) {
        this.errors.push('Error (Extension): ' + files[i].name);
      }
      this.isValidFileSize(files[i]);
    }
  }

  private isValidFileSize(file) {
    const fileSizeinMB = file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100;
    if (size > this.maxSize) {
      this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
    }
  }

}
