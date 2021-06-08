'use strict'

const Academic = use("App/Models/Academic");
const Database = use('Database')

class AcademicController {

    async addacademic({ request, response }) {
        Database
        .table('academics')
        .insert({   name: request.input("name"),
                    year: request.input("year"),
                    semester: request.input("school"),
                    assignedLoad: request.input("load") 
                })

        return response.route('/academics', true)
    }
    
    async render ({ request, view }) {
       if (request.input("search")) {
        const academics = await Database
        .from('academics')
        .where('name', request.input("search"))
      
        return view.render('academics', { academics: academics})
          
       } else {
        const academics = await Academic.all()
        return view.render('academics', { academics: academics.toJSON()})
       }   
      }
}
module.exports = AcademicController