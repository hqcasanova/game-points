import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import colours from './colours';

export default Marionette.CollectionView.extend({
    template: false,

    colours: [],      //Class variable with randomly-generated distinct colours
    
    collectionEvents: {
        'sync': 'setColours setLoaded'
    },

    onRender: function () {
        this.el.classList.add('items');
    },

    //Generates new set of background colours if not done already and applies them to
    //each item view.
    //NOTE: In order to ensure the distinctiveness of the colours, they are generated only
    //after the total number of items is known as that determines the size of the palette.
    setColours: function () {
        if (!this.colours.length) {
            this.colours.push(...colours(this.collection.length));
        }

        this.children.each((itemView, index) => {
            itemView.setBgColour(this.colours[index]);
        });
    },

    //Marks the view as loaded once the first item is rendered
    setLoaded: function () {
        this.el.classList.remove('loading');
    }
});

