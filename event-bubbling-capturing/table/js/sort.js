'use strict';

function handleTableClick(event) {
    const tagName = event.target.tagName;
    if (tagName === 'TH' && event.target.dataset.dir === '1') {
        event.target.dataset.dir = -1;

    } else if (tagName === 'TH') {
        event.target.dataset.dir = 1;
    }
    table.setAttribute('data-sort-by', event.target.dataset.propName);
    sortTable(event.target.dataset.propName, event.target.dataset.dir);
};