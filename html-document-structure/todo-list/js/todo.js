const todoList = document.querySelector('.todo-list');
const doneAll = todoList.querySelectorAll('.done input');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');
const undoneAll = todoList.querySelectorAll('.undone input');

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

for (const button of undoneAll) {
    button.addEventListener('click', jobFailed);
};

function jobFailed(enent) {
    const tagNameParent = event.target.parentElement;
    const tagName = event.target;
    if (!tagName.hasAttribute('checked')) {
        tagName.setAttribute('checked', '');
        done.appendChild(tagNameParent);
    } else {
        tagName.removeAttribute('checked')
        undone.appendChild(tagNameParent);
    };
};