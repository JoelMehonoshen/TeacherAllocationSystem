'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnitSchema extends Schema {
  up () {
    this.create('units', (table) => {
      table.string('id')
      table.string('name')
      table.integer('year')
      table.integer('semester')
      table.integer('students')
      table.float('share')
      table.float('assignedLoad')
      table.primary(['id', 'year', 'semester'])
      table.timestamps()
    })
  }

  down () {
    this.drop('units')
  }
}

module.exports = UnitSchema
