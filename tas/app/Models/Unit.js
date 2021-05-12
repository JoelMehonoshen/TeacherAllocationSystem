'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Unit extends Model {
    academic_preferences() {
        return this.hasMany("App/Models/AcademicPreference")
    }

    allocations() {
        return this.hasMany("App/Model/Allocation")
    }

    tags() {
        return this.hasMany("App/Models/Tag")
    }
}

module.exports = Unit
