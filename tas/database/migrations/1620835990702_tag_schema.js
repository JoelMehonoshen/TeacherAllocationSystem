'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagSchema extends Schema {
  up () {
    this.create('tags', (table) => {
        table.string('unit_code', 7)
        table.integer('unit_year')
        table.integer('unit_semester')
        table.string('tag')
        table.primary(['unit_code', 'unit_year', 'unit_semester', 'tag'])
        table.foreign(['unit_code', 'unit_year', 'unit_semester']).references(['code', 'year', 'semester']).inTable('units')
    })
  }

  down () {
    this.drop('tags')
  }
}

module.exports = TagSchema
