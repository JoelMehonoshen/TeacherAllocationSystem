'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Academic extends Model {
    academic_preference() {
        return this.hasMany("App/Models/AcademicPreference")
    }

    allocations() {
        return this.hasMany("App/Models/Allocation")
    }

    loads() {
        return this.hasMany("App/Models/Load")
    }

    tags() {
        return this.hasMany("App/Models/Tag")
    }
}

module.exports = Academic
