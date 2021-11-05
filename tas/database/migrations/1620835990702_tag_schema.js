'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

// TODO: Need to revist how tags are done to reduce duplicates in the db
class TagSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.increments('id')
      table.enu('type', ['unit', 'academic', 'allocation'])
      table.integer('unit_id').nullable()
      table.integer('academic_id').nullable()
      table.integer('allocation_id').nullable()
      table.string('tag')
      table.timestamps()
    })
  }

  down () {
    this.drop('tags')
  }
}

module.exports = TagSchema
