import _ from 'underscore';
import ItemView from '../item/view';
import template from './template.html';

export default ItemView.extend({
    template: template,

    clusteredClicks: null,      //number of clicks in sequence

    events: {
        'click': 'trackClicks'
    },

    initialize: function () {
        this.clusteredClicks = 0;
    },

    templateContext: {
        noneClass: function () {
            if (this.quantity) {
                return '';
            } else {
                return 'none';
            }
        }
    },

    //Makes sure the button element is the view's root one.
    onRender: function () {
        this.$el = this.$el.children();
        this.$el.unwrap();
        this.setElement(this.$el);
        ItemView.prototype.onRender.call(this);
    },

    //Sets the background colour of the quantity badge.
    setBgColour: function (cssColour) {
        ItemView.prototype.setBgColour.call(this, cssColour);
        this.qtyEl.style.backgroundColor = cssColour;
    },

    //Tracks the number times a click has happened before the debounced handler is called.
    trackClicks: function (event) {
        this.clusteredClicks++;
        this.bagUnits();
    },

    //Adds as many units as clicks
    bagUnits: _.debounce(function () {
        this.model.incQuantity(this.clusteredClicks);
        this.clusteredClicks = 0;
    }, 250)
});