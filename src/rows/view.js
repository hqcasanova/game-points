import ItemsView from '../items/view';

export default ItemsView.extend({
    options: {
        sortingAttr: 'quantity',    //By default, sorts by the "quantity" attribute
        sortingDesc: true           //By default, sorting direction is descending
    },

    childViewOptions: {
        tagName: 'tr'
    },

    reorderOnSort: true,

    initialize: function () {
        this.listenTo(this.collection, 'change:quantity', this.reorder);
    },

    viewComparator: function (model) {
        let sortingSign;

        if (this.options.sortingDesc) {
            sortingSign = -1;
        } else {
            sortingSign = 1;
        }
        return sortingSign * model.get(this.options.sortingAttr);
    }
});