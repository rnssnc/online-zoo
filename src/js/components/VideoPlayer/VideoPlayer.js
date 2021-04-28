import Slider from '../../../components/rnssnc-slider/slider';
import Control from '../../contol';
import RadioButtons from '../RadioButtons/RadioButtons';

export default class VideoPlayer extends Control {
  constructor(parentNode, className, options = {}) {
    super(parentNode, 'div', `${className}-wrapper`);
    this.className = className;

    this.createVideoElement();

    this.previewsSliderContainer = new Control(
      this.node,
      'div',
      `${this.className}-previews-slider__container`,
    );
    this.previewsSliderWrapper = new Control(
      this.previewsSliderContainer.node,
      'div',
      `${this.className}-previews-slider`,
    );

    this.previewsSliderTrack = new Control(this.previewsSliderWrapper.node, 'div', 'previews-slider__track');
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
      this.previewsSliderTrack.node.innerHTML = '';
      this.createVideosPreview(videos.slice(1));
    }
  }

  swapVideo(previewLink, index) {
    const videoId = this.video.node.src.slice(this.video.node.src.lastIndexOf('/') + 1);

    const img = new Image();
    img.onload = () => {
      this.videoPreviews[index].previewImage.node.src = img.src;
      this.videoPreviews[index].link = videoId;
      this.video.node.src = `https://www.youtube.com/embed/${previewLink}`;
    };

    img.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }

  createVideosPreview(links) {
    this.videoPreviews = [];

    links.map((src, index) => {
      const previewWrapper = new Control(this.previewsSliderTrack.node, 'div', 'preview__wrapper');
      previewWrapper.previewImage = new Control(previewWrapper.node, 'img', 'preview__image');
      previewWrapper.link = src.slice(src.lastIndexOf('/') + 1);
      previewWrapper.index = index;

      const img = new Image();
      img.onload = () => {
        previewWrapper.previewImage.node.src = img.src;
      };

      img.src = `https://img.youtube.com/vi/${previewWrapper.link}/0.jpg`;

      previewWrapper.previewImage.node.addEventListener('click', () => {
        if (previewWrapper.previewImage.node.src !== this.video.node.src) {
          this.swapVideo(previewWrapper.link, index);
        }
      });

      this.videoPreviews.push(previewWrapper);
    });

    this.slider = new Slider({
      slider: `.${this.className}-previews-slider`,
      track: '.previews-slider__track',
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: false,
      // rebuild: true,
      // variableWidth: true,
      responsive: {
        1920: {
          from: 501,
          slidesToShow: 3,
        },
        500: {
          from: 0,
          slidesToShow: 2,
        },
      },
    });
  }

  createRadio(count) {
    this.radioButtons = new RadioButtons(this.node, 'video-player__radio-button');
    this.radioButtons.createRadioButtons(count);
    this.radioButtons.buttons.map((control, index) => {
      control.node.addEventListener('click', () => {
        if (this.slider) this.slider.goTo(index + 3);
      });
    });
  }
}
