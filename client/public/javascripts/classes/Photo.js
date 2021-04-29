import axios from 'axios';

photoUpload = (photo, contentType, caption, tags, user) => {
  this.photo = photo;
  this.contentType = contentType;
  this.caption = caption;
  this.tags = tags;
  this.user = user;

  this.uploadToReport = () => {
    console.log(`Uploading ${this.photo} of type ${this.contentType} with a caption of ${caption}`);
  }
}
