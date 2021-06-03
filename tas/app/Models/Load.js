'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Load extends Model {
    academic() {
        return this.belongsTo("App/Models/Academic")
    }
}

module.exports = Load