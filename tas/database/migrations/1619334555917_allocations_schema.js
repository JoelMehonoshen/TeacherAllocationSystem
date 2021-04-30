'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AllocationsSchema extends Schema {
  up () {
    this.create('allocations', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('allocations')
  }
}

module.exports = AllocationsSchema
