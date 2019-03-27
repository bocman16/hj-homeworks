/* eslint-disable no-unused-vars */
// eslint-disable-next-line one-var
const addClass = (className, context) => context.classList.add(className),
  removeClass = (className, context) => context.classList.remove(className),
  hasClass = (className, context) => context.classList.contains(className);
class iLayout {
  constructor(container) {
    this.container = container;
    this.positionsContainer = container.querySelector('.layout__positions');
    this.actionButton = container.querySelector('.layout__button');
    this.result = container.querySelector('.layout__result');
    this.layout = {
      left: null,
      top: null,
      bottom: null,
    };
    this.registerEvents();
  }

  // eslint-disable-next-line class-methods-use-this
  registerEvents() {
    const filesInfo = document.querySelectorAll('.layout__item');
    filesInfo.forEach((item) => {
      item.addEventListener('dragover', (event) => {
        event.preventDefault();
        if (!hasClass('layout__item_active', item)) {
          addClass('layout__item_active', item);
        } else {
          removeClass('layout__item_active', item);
        }
      });


      item.addEventListener('drop', (event) => {
        event.preventDefault();
        item.innerHTML = '';

        removeClass('layout__item_active', item);

        const files = Array.from(event.dataTransfer.files);
        const imageTypeRegExp = /^image\//;

        if (imageTypeRegExp.test(files[0].type)) {
          const img = document.createElement('img');

          img.style.width = `${files[0].offsetWidth}px`;
          img.style.height = `${files[0].offsetHeight}px`;

          img.src = URL.createObjectURL(files[0]);
          addClass('layout__image', img);

          img.addEventListener('load', (event) => {
            URL.revokeObjectURL(event.target.src);
          });
          item.appendChild(img);
        } else {
          console.log('Добавьте файлы типа Image');
        }
      });
    });
    this.actionButton.addEventListener('click', (evt) => {
      console.log(evt);
    });
  }
}


new iLayout(document.getElementById('layout'));
