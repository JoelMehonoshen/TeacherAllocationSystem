'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnitOfferingsSchema extends Schema {
  up () {
    this.create('unit_offerings', (table) => {
      table.increments('unitOfferingId')
      table.string('unitCode')
      table.string('semester')
      table.string('estimatedEnrolments')
      table.float('schoolShare')
      table.timestamps()
    })
  }

  down () {
    this.drop('unit_offerings')
  }
}

module.exports = UnitOfferingsSchema
