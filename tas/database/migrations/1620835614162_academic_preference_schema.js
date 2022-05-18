'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AcademicPreferenceSchema extends Schema {
  up () {
    this.create('academic_preference', (table) => {
        table.integer('id').references('id').inTable("academics")
        table.string('unit_code', 7)
        table.primary(['id', 'unit_code'])
    })
  }

  down () {
    this.drop('academic_preference')
  }
}

module.exports = AcademicPreferenceSchema
