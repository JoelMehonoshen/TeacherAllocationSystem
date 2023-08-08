'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PreferenceForm extends Model {
    
     classes() {
          return this.hasMany("App/Models/Offering")
      }

      academics() {
        return this.hasOne("App/Models/Academic")
      }
}

module.exports = PreferenceForm