const todoList = document.querySelector('.todo-list');
const doneAll = todoList.querySelectorAll('input');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');

for (const button of doneAll) {
    button.addEventListener('click', itIsDone);
};
function itIsDone(event) {
    const tagNameParent = event.target.parentElement;
    if (event.target.checked) {
        done.appendChild(tagNameParent);
    } else {
        undone.appendChild(tagNameParent);
    };
};