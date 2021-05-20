'use strict'

class UnitController {
    async addunit({request, auth, response}) {
    }

    async render({request, response, view}) {
        return view.render('units')
    }
}

module.exports = UnitController
