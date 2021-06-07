'use strict'

const Unit = use("App/Models/Unit");
const Database = use('Database')

class UnitController {

    async addunit({ request, response }) {
        const userId = await Database
        .table('units')
        .insert({   id: request.input("id"), 
                    name: request.input("name"),
                    year: request.input("year"),
                    semester: request.input("semester"),
                    assignedLoad: request.input("load") 
                })

        return response.route('/units', true)
    }
    
    // async UnitQuery (request, response, view) {
    //    const results= await Database
    //       .table('units')
    //       .where('unit_code', request.search)
    //     if(results.rows[0] == null){
    //         return view.render('units', {results: "No Search Results"})
    //     }else{
    //         return view.render('units', {selectResponse: data.rows[0]})
    //     }
    //   }

    async render ({ view }) {
        const units = await Unit.all()
      
        return view.render('units', { units: units.toJSON()})
      }
}
module.exports = UnitController