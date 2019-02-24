'use strict';

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
  }
  if (typeof children === 'string') {
    element.textContent = children;

  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

function createProductNode(comment) {
  return el('div', {
    class: 'comment-wrap'
  }, [
    el('div', {
      class: "photo",
      title: comment.author.name
    }, [
      el('div', {
        class: 'avatar',
        style: `background-image: url(${comment.author.pic})`
      }, )
    ]),
    el('div', {
      class: 'comment-block'
    }, [
      el('p', {
        class: 'comment-text'
      }, comment.text.split('<br>').join('\n')),
      el('div', {
        class: 'bottom-comment'
      }, [
        el('div', {
          class: 'comment-date'
        }, new Date(comment.date).toLocaleString('ru-Ru')),
        el('ul', {
          class: 'comment-actions'
        }, [
          el('li', {
            class: 'complain'
          }, 'Пожаловаться'),
          el('li', {
            class: 'reply'
          }, 'Ответить')
        ])
      ])
    ])
  ]);
}
// `<div class="comment-wrap">
// //     <div class="photo" title="${comment.author.name}">
// //       <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
// //     </div>
// //     <div class="comment-block">
// //       <p class="comment-text">
// //         ${comment.text.split('\n').join('<br>')}
// //       </p>
// //       <div class="bottom-comment">
// //         <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
// //         <ul class="comment-actions">
// //           <li class="complain">Пожаловаться</li>
// //           <li class="reply">Ответить</li>
// //         </ul>
// //       </div>
// //     </div>
// //   </div>`

function showComments(list) {
  const productNodes = list.map(createProductNode),
    commentsContainer = document.querySelector('.comments'),
    fragment = productNodes.reduce((fragment, currentValue) => {
      fragment.appendChild(currentValue);
      return fragment;
    }, document.createDocumentFragment());

  commentsContainer.appendChild(fragment);
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);