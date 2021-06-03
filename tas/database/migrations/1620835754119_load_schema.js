'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoadSchema extends Schema {
  up () {
    this.create('loads', (table) => {
        table.integer('academics_id').references('id').inTable("academics")
        table.integer('year')
        table.float('load')
        table.primary(['academics_id', 'year'])
    })
  }

  down () {
    this.drop('loads')
  }
}

module.exports = LoadSchema
