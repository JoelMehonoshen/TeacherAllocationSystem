'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
    unit() {
        return this.belongsTo("App/Models/Unit")
    }
    Allocation() {
        return this.belongsTo("App/Models/Academic")
    }
    Academic() {
        return this.belongsTo("App/Models/Allocation")
    }
}

module.exports = Tag
