'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AcademicSchema extends Schema {
  up () {
    this.create('academics', (table) => {
      table.string('academicId')
      table.string('name')
      table.string('category')
      table.float('teachingFraction')
      table.timestamps()
    })
  }

  down () {
    this.drop('academics')
  }
}

module.exports = AcademicSchema
