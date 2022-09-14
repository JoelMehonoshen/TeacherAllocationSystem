'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfferingsSchema extends Schema {
  up () {
    this.create('offerings', (table) => {
      table.increments('id')
      table.string('code')
      table.string('semester')
      table.string('estimatedEnrolments')
      table.float('schoolShare')
      table.timestamps()
    })
  }

  down () {
    this.drop('offerings')
  }
}

module.exports = OfferingsSchema
