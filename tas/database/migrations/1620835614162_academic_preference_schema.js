'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AcademicPreferenceSchema extends Schema {
  up () {
    this.create('academic_preferences', (table) => {
        table.integer('id').references('id').inTable("academics")
        table.string('unit_code', 7)
        table.integer('unit_year')
        table.integer('unit_semester')
        table.primary(['id', 'unit_code', 'unit_year', 'unit_semester'])
    })
  }

  down () {
    this.drop('academic_preferences')
  }
}

module.exports = AcademicPreferenceSchema
