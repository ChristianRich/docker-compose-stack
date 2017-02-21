const mongoose = require('mongoose')
    , async = require('async')
    , models = require('../models');

exports.init = function(cb){

    console.log('Creating 3 sample customer records..');

    const customers = [

        new models.customer({
            firstName: 'Jonh',
            lastName: 'Conner'
        }),

        new models.customer({
            firstName: 'Sarah',
            lastName: 'Conner'
        }),

        new models.customer({
            firstName: 'Richard',
            lastName: 'Smith'
        })
    ];

    const save = function(customer, cb){

        customer.save(function(err){

            if(err){
                return cb(err);
            }

            cb();
        })
    };

    models.customer.remove({}, function(err){

        if(err){
            return cb(err);
        }

        async.mapLimit(customers, 1, save, function(err){

            if(err){
                return cb(err);
            }

            cb();
        });
    });
};
