'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PreferencesSchema extends Schema {
  up () {
    this.create('preferences', (table) => {
      table.integer('academicId').references('academicId').inTable("academics")
      table.integer('unitCode').references('unitCode').inTable("unit")
      table.integer('desireToTeach')
      table.integer('abilityToTeach')
      table.timestamps()
    })
  }

  down () {
    this.drop('preferences')
  }
}

module.exports = PreferencesSchema
