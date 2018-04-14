import BaseComponent from '../BaseComponent';
import Element from '../../dom/Element';

import styles from './BannerComponent.scss';

class BannerComponentModel {
  constructor({ banners, infinity = true, auto = true, time = 3000 }) {
    this.banners = banners;
    this.infinity = infinity;
    this.auto = auto;
    this.time = time;
  }
}

export default class BannerComponent extends BaseComponent {
  constructor({ banners, infinity = true, auto = true, time = 5000 }) {
    super();
    this.vm = new BannerComponentModel({ banners, infinity, auto, time });

    this._current_slide = 1;
    this._last_slide = this.vm.banners.length;

    if (this.vm.auto) {
      this._autoSliding();
    }
  }

  showSlide(slide_number) {
    if (slide_number < 1) {
      slide_number = 1;
    } else if (slide_number > this._last_slide) {
      slide_number = this._last_slide;
    } else {
      this._current_slide = slide_number;
    }

    let slide_items = document.getElementsByClassName(styles['hero-item']);
    let slide_dots = document.getElementsByClassName(styles['hero-indicator-btn']);

    for (let i = 0; i < this._last_slide; i++) {
      if (this._current_slide - 1 === i) {
        slide_items[i].classList.add(styles['on']);
        slide_dots[i].classList.add(styles['on']);
      } else {
        slide_items[i].classList.remove(styles['on']);
        slide_dots[i].classList.remove(styles['on']);
        slide_items[i].classList.add(styles['off']);
      }
    }
  }

  prevSlide() {
    if (this._isFirst()) {
      return this.showSlide(this._last_slide);
    }
    this.showSlide(this._current_slide - 1);
  }

  nextSlide() {
    if (this._isLast()) {
      return this.showSlide(1);
    }
    this.showSlide(this._current_slide + 1);
  }

  _isFirst() {
    if (this._current_slide <= 1) {
      return true;
    }
    return false;
  }

  _isLast() {
    if (this._current_slide >= this._last_slide) {
      return true;
    }
    return false;
  }

  _autoSliding() {
    if (!this.vm.infinity && this._isLast()) {
      return;
    }
    setTimeout(() => {
      this.nextSlide();
      this._autoSliding();
    }, this.vm.time);
  }

  _createBannerItems(items) {
    if (!Array.isArray(items)) {
      throw new Error('The Element children have to be Array type');
    }

    return items.map((item, index) => {
      return new Element({
        tag: 'div',
        attributes: {
          className: [styles['hero-item'], index === 0 ? styles['on'] : styles['off'], 'fade'],
        },
        children: [
          new Element({
            tag: item.link.tagName ? item.link.tagName : 'a',
            attributes: {
              href: item.link.value,
              className: item.link.className ? item.link.className : styles['hero-item-link'],
            },
            children: [
              new Element({
                tag: item.image.tagName ? item.image.tagName : 'img',
                attributes: {
                  src: item.image.value,
                  className: item.image.className ? item.image.className : styles['hero-item-image'],
                },
              }),
            ],
          }),
        ],
      });
    });
  }

  _createBannerIndcators(items) {
    if (!Array.isArray(items)) {
      throw new Error('The Element children have to be Array type');
    }
    return items.map((item, index) => {
      return new Element({
        tag: 'i',
        attributes: {
          className: [styles['hero-indicator-btn'], index === 0 ? styles['on'] : ''],
        },
        on: {
          event: 'click',
          function: () => this.showSlide(index + 1),
        },
      });
    });
  }

  view() {
    const bannerList = new Element({
      tag: 'aside',
      children: [
        new Element({
          tag: 'div',
          attributes: {
            className: styles['hero-slide'],
          },
          children: [
            ...this._createBannerItems(this.vm.banners),
            new Element({
              tag: 'div',
              attributes: {
                className: styles['hero-nav'],
              },
              children: [
                new Element({
                  tag: 'button',
                  attributes: {
                    className: styles['prev'],
                  },
                  on: {
                    event: 'click',
                    function: () => this.prevSlide()
                  },
                }),
                new Element({
                  tag: 'button',
                  attributes: {
                    className: styles['next']
                  },
                  on: {
                    event: 'click',
                    function: () => this.nextSlide()
                  },
                }),
              ],
            }),
            new Element({
              tag: 'div',
              attributes: {
                className: styles['hero-indicator'],
              },
              children: [
                ...this._createBannerIndcators(this.vm.banners),
              ],
            }),
          ],
        }),
      ],
    });
    window.onload = () => {
      app.appendChild(bannerList.render());
    }
  }
}
