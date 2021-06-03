'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnitSchema extends Schema {
  up () {
    this.create('units', (table) => {
      table.string('code', 7)
      table.integer('year')
      table.integer('semester')
      table.primary(['code', 'year', 'semester'])
    })
  }

  down () {
    this.drop('units')
  }
}

module.exports = UnitSchema
