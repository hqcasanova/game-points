import ItemsView from '../items/view';

export default ItemsView.extend({

    //Wraps each child in an LI tag but without setting it as the child's element.
    //NOTE: setting the child view's element with "tagName" is not desirable when
    //the child view itself performs operations on the root element.
    appendChildren: function (listEl, childEls) {
        if (!Array.isArray(childEls)) {
            childEls = [childEls];
        }
        childEls = childEls.map(function (childEl) {
            const liEl = document.createElement('LI');
            
            liEl.appendChild(childEl);
            return liEl;
        });
        ItemsView.prototype.appendChildren.call(this, listEl, childEls);
    }
});