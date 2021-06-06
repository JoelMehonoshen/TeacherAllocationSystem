'use strict'

const Academic = use("App/Models/Academic");

class AcademicController {

    async AddDummy({request, auth, response}) {
        const academic = new Academic()
        academic.name = "John"
        academic.school = "Maths"
        console.log(academic)
        await academic.save()
        return response.redirect('/academics', true)
    }

    async render ({ view }) {
        const academics = await Academic.all()
      
        return view.render('academics', { academics: academics.toJSON()})
      }
}

module.exports = AcademicController