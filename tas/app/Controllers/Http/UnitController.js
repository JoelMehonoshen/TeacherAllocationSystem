'use strict'

class UnitController {
    async addunit({request, auth, response}) {
        // const unit = new unit()
        // academic.name = "John"
        // academic.school = "Maths"
        console.log("success")
        // await academic.save()
        // return response.redirect('/academics', true)
    }

    async render({request, response, view}) {
        // //logic goes here
        // const data = await Academic.all()

        // return view.render('academics', {selectResponse: data.rows[0].school})
    }
}

module.exports = UnitController
