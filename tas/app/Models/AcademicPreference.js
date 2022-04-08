'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AcademicPreference extends Model {
    academics() {
        return this.belongsTo("App/Models/Academic")
    }

    units() {
        return this.belongsTo("App/Models/Unit")
    }
}

module.exports = AcademicPreference
