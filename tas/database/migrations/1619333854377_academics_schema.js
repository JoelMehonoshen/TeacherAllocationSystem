'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AcademicsSchema extends Schema {
  up () {
    this.create('academics', (table) => {
      table.increments()
      table.string('name', 255)
      table.string('faculty')
      table.timestamps()
    })
  }

  down () {
    this.drop('academics')
  }
}

module.exports = AcademicsSchema
