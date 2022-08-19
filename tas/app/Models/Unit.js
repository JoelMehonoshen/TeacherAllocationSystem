'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Unit extends Model {
    allocations() {
        return this.hasMany("App/Model/Allocation")
    }

    tags() {
        return this.hasMany("App/Models/Tag")
    }
}

module.exports = Unit
