'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AcademicSchema extends Schema {
  up () {
    this.create('academics', (table) => {
      table.increments('id')
      table.string('name')
      table.integer('year')
      table.string('school')
      table.float('load')
      table.string('academic_preference', 7)
      table.timestamps()
    })
  }

  down () {
    this.drop('academics')
  }
}

module.exports = AcademicSchema
