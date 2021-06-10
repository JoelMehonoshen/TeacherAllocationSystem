'use strict'

const Unit = use("App/Models/Unit");
const Database = use('Database')

class UnitController {

    async addunit({ request, response }) {
       await Database
       .table('units')
       .insert({   
                    id: request.input("id"), 
                    name: request.input("name"),
                    year: request.input("year"),
                    semester: request.input("semester"),
                    assignedLoad: request.input("load") 
                })

        return response.route('/units', true)
    }
    
    async render ({ request, view }) {
       if (request.input("search")) {
        const units = await Database
        .from('units')
        .where('id', request.input("search"))
        .orWhere('name', request.input("search"))

        return view.render('units', { units: units})
          
       } else {
        const units = await Unit.all()
        return view.render('units', { units: units.toJSON()})
       }   
      }
}
module.exports = UnitController