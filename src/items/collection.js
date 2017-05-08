import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Item from '../item/model.js'

export default Backbone.Collection.extend({
    model: Item,

    regularScore: null,     //total non-bonus points across items
    bonusScore: null,       //total bonus points across items

    initialize: function (models = [], options = {}) {
        const hasUrl = options.hasOwnProperty('url');
            
        if (hasUrl) {
            this.url = options.url;
            this.resetCounts(true);
        }
    },
    
    totalRegulars: function () {
        this.regularScore = this.total('regular');
        return this.regularScore;
    },

    totalBonuses: function () {
        this.bonusScore = this.total('bonus');
        return this.bonusScore;
    },

    //Adds up each item's points of the specified type as it traverses the collection
    total: function (type) {
        return this.reduce(function (memo, item) {
            return memo + item[`${type}Points`];
        }, 0);
    },

    //Resets units and scores to 0
    resetCounts: function (isSilent = false) {
        this.regularScore = 0;
        this.bonusScore = 0;

        this.forEach(function (item) {
            item.resetCounts(isSilent);
        });
    }
});
