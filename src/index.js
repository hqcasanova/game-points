import './styles.less';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Items from './items/collection';
import Marionette from 'backbone.marionette';
import Nav from './nav/view';
import List from './list/view';
import Rows from './rows/view';
import ItemButton from './button/view';
import ItemRow from './row/view';

//Application class
const Points = Marionette.Application.extend({
    items: null,      //items collection

    //Sets up data structures.
    onBeforeStart: function (app, options) {
        this.items = new Items([], {
            url: options.rootUrl + options.apiPath + options.itemsPath
        });
    },

    //Sets up views scaffolding around existing markup and loads item data
    onStart: function (app, options) {
        const navEl = document.body.querySelector('#game-nav .nav-links');
        const listEl = document.body.querySelector('#item-controls .item-list');
        const rowsEl = document.body.querySelector('#score-table .item-rows');

        new Nav({
            el: navEl,
            collection: this.items
        }).render();
        new List({
            el: listEl,
            collection: this.items,
            childView: ItemButton,
        }).render();
        new Rows({
            el: rowsEl,
            collection: this.items,
            childView: ItemRow
        }).render();

        //Fills the item list and table with data incrementally
        this.items.fetch();
    },
});

//Instance with app-wide options
const game = new Points().start({
    rootUrl: '',                           //Root URL for web service's endpoints
    apiPath: 'assets',                     //Path to JSON endpoints
    itemsPath: '/items.json'               //Endpoint for items
});