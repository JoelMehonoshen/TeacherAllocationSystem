'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AllocationSchema extends Schema {
  up () {
    this.create('allocations', (table) => {
        table.increments('allocation_id')
        table.integer('id').references('id').inTable("academics")
        table.string('unit_code')
        table.integer('unit_year')
        table.integer('unit_semester')
        table.float('load')
        table.timestamps()
    })
  }

  down () {
    this.drop('allocations')
  }
}

module.exports = AllocationSchema
