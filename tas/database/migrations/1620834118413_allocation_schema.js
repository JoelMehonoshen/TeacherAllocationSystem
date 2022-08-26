'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AllocationSchema extends Schema {
  up () {
    this.create('allocations', (table) => {
        table.integer('academicId').references('academicId').inTable("academics")
        table.integer('unitOfferingId').references('unitOfferingId').inTable("unitOfferrings")
        table.boolean('unitCoordinator')
        table.float('fractionAllocated')
        table.timestamps()
    })
  }

  down () {
    this.drop('allocations')
  }
}

module.exports = AllocationSchema
