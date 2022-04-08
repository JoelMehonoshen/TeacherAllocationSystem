'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Allocation extends Model {
    academics() {
        return this.belongsTo("App/Models/Academic")
    }

    units() {
        return this.belongsTo("App/Models/Unit")
    }

    tags() {
        return this.hasMany("App/Models/Tag")
    }
}

module.exports = Allocation
