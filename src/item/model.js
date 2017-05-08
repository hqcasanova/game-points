import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default Backbone.Model.extend({
    regularPoints: null,        //total non-bonus points according to number of units
    bonusPoints: null,          //total bonus points according to number of units

    defaults: function () {
        return {
            name: '',
            points: 0,
            bonusPoints: 0,
            bonusUnits: 0,
            quantity: 0
        }
    },

    incQuantity: function (step = 1) {
        this.set('quantity', this.get('quantity') + step);
    },

    //If the item has no bonus units, it just performs a good old multiplication 
    totalRegular: function () {
        const bonusUnits = this.get('bonusUnits');
        const quantity = this.get('quantity');
        const numRegulars = bonusUnits ? quantity % bonusUnits : quantity;
        
        this.regularPoints = numRegulars * this.get('points');
        return this.regularPoints;
    },

    //If the item has no bonus units, it yields zero.
    totalBonus: function () {
        const bonusUnits = this.get('bonusUnits');
        const numBonuses = bonusUnits && Math.floor(this.get('quantity') / bonusUnits);
        
        this.bonusPoints = numBonuses * this.get('bonusPoints');
        return this.bonusPoints;
    },

    //Resets all counters, suppressing "change" events if so specified.
    resetCounts: function (isSilent = false) {
        this.regularPoints = 0;
        this.bonusPoints = 0;
        this.set('quantity', 0, {silent: isSilent});
    }
});