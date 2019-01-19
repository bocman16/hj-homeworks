const todoList = document.querySelector('.todo-list');
const doneAll = todoList.querySelectorAll('input');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');

for (const button of doneAll) {
    button.addEventListener('click', itIsDone);
};
function itIsDone(event) {
    const tagNameParent = event.target.parentElement;
    const tagName = event.target;
    if (tagName.hasAttribute('checked')) {
        tagName.removeAttribute('checked');
        undone.appendChild(tagNameParent);
    } else {
        tagName.setAttribute('checked', '')
        done.appendChild(tagNameParent);
    };
};