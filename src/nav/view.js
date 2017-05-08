import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
    template: false,

    events: {
        'click .new-game': 'newGame'
    },

    collectionEvents: {
        'sync': 'renderScores',
        'change': 'renderScores'
    },

    templateContext: function () {
        const items = this.collection;

        return {
            totalScore: function () {
                return items.totalRegulars() + items.totalBonuses();
            },

            bonusScore: function () {
                return items.bonusScore;
            }
        }
    },

    onRender: function () {
        this.totalEl = this.el.querySelector('.score-total');
        this.bonusEl = this.el.querySelector('.score-bonus');
    },

    newGame: function () {
        this.collection.resetCounts();
    },

    //Updates only the score counts as this view is a template-less one.
    //NOTE: the logic to calculate the scores is defined as template helpers 
    //should the whole view be re-rendered in future implementations.
    renderScores: function () {
        this.totalEl.textContent = this.templateContext().totalScore();
        this.bonusEl.textContent = this.templateContext().bonusScore();
    }
});