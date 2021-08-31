'use strict'

const Academic = use("App/Models/Academic");
const Database = use('Database')


class AcademicController {

    async addacademic({ request, response }) {
        await Database
        .table('academics')
        .insert({   name: request.input("name"),
                    year: request.input("year"),
                    school: request.input("school"),
                    load: request.input("load") 
                })

        return response.route('/academics', true)
    }

    async updateacademic({response, request}){
        //console.log(request)
        await Database
        .from('academics')
        .where('id',request.input("academicID"))
        .update({
           name:request.input("name"),
           load:request.input("load")
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