import ItemView from '../item/view';
import template from './template.html';

export default ItemView.extend({
    className: 'item-row',
    template: template,

    scoreEl: null,    //DOM element for the score cell

    //Sums regular and bonus points up only if there's at least one unit.
    templateContext: function () {
        const item = this.model;

        return {
            score: function () {
                return item.totalRegular() + item.totalBonus();
            }
        }
    }
});