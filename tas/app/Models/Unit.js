'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Unit extends Model {
    allocations() {
        return this.hasMany('App/Models/Allocation')
    }
}

module.exports = Unit
