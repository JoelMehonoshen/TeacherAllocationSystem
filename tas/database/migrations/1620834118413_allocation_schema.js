'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AllocationSchema extends Schema {
  up () {
    this.create('allocations', (table) => {
        table.integer('academics_id').references('id').inTable("academics")
        table.string('unit_code', 7)
        table.integer('unit_year')
        table.integer('unit_semester')
        table.primary(['academics_id', 'unit_code', 'unit_year', 'unit_semester'])
        table.foreign(['unit_code', 'unit_year', 'unit_semester']).references(['code', 'year', 'semester']).inTable('units')
    })
  }

  down () {
    this.drop('allocations')
  }
}

module.exports = AllocationSchema
