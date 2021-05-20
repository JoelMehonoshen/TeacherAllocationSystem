'use strict'

const Academic = use("App/Models/Academic");

const Database = use('Database');

class AcademicController {

    async AddDummy({request, auth, response}) {
        const academic = new Academic()
        academic.name = "John"
        academic.school = "Maths"
        console.log(academic)
        await academic.save()
        return response.redirect('/academics', true)
    }

    async render({request, response, view}) {
        //logic goes here
        const data = await Academic.all()

        return view.render('academics', {selectResponse: data.rows[0].school})
    }
}

module.exports = AcademicController