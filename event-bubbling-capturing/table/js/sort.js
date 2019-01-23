'use strict';

function handleTableClick(event) {
    const tagName = event.target.tagName;
    if (tagName === 'TH') {
        return;
    }
    event.target.dataset.dir = event.target.dataset.dir === '1' ? '-1' : '1';
    table.setAttribute('data-sort-by', event.target.dataset.propName);
    sortTable(event.target.dataset.propName, event.target.dataset.dir);
};