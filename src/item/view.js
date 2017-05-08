import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
    qtyEl: null,            //DOM element for the quantity count  

    options: {
        bgColour: ''    //default CSS colour for backgrounds
    },

    modelEvents: {
        'change': 'render'
    },

    //Carries out DOM operations common to all item views
    onRender: function () {
        this.el.classList.add('item');
        this.qtyEl = this.el.querySelector('.quantity-count');
        this.setBgColour(this.options.bgColour);
    },

    //Updates once and applies the background color of the item element as an inline style
    setBgColour: function (cssColour) {
        const opts = this.options;

        if (!opts.bgColour) {
           opts.bgColour = cssColour;    
        }
        this.el.style.backgroundColor = opts.bgColour;
    }
});