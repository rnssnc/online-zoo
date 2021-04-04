import Control from '../../contol';
import RadioButtons from '../RadioButtons/RadioButtons';
export default class VideoPlayer extends Control {
  constructor(parentNode, className, options = {}) {
    super(parentNode, 'div', `${className}-wrapper`);
    this.className = className;

    this.createVideoElement();

    this.videoPreviewsWrapper = new Control(this.node, 'div', `${this.className}-previews__wrapper`);
  }

  createVideoElement() {
    this.videoWrapper = new Control(this.node, 'div', `${this.className}-element__wrapper`);
    this.video = new Control(this.videoWrapper.node, 'iframe', this.className);
    this.video.node.frameBorder = 0;
  }

  setVideo(src) {
    this.video.node.src = src;
    // const vid = document.createElement('iframe');

    // vid.addEventListener('load', () => {
    //   console.log('y');
    //   this.video.node.src = vid.src;
    // });
    // console.log(vid);
    // vid.src = src;
  }

  loadVideos(videos) {
    this.videos = videos;

    if (!this.radioButtons) this.createRadio(3);
    this.setVideo(videos[0]);
    this.radioButtons.setActiveState(0);

    if (videos.length > 1) {
      this.videoPreviewsWrapper.node.innerHTML = '';
      this.createVideosPreview(videos);
    }
  }

  createVideosPreview(links) {
    this.videoPreviews = [];

    links.map((src) => {
      const previewWrapper = new Control(this.videoPreviewsWrapper.node, 'div', 'preview__wrapper');
      const previewImage = new Control(previewWrapper.node, 'img', 'preview__image');
      const link = src.slice(src.lastIndexOf('/') + 1);

      const img = new Image();
      img.onload = () => {
        previewImage.node.src = img.src;
      };

      img.src = `https://img.youtube.com/vi/${link}/0.jpg`;

      previewImage.node.addEventListener('click', () => {
        if (src !== this.video.node.src) this.setVideo(src);
      });

      this.videoPreviews.push(previewWrapper);
    });
  }

  createRadio(count) {
    this.radioButtons = new RadioButtons(this.node, 'video-player__radio-button');
    this.radioButtons.createRadioButtons(count);
  }
}
