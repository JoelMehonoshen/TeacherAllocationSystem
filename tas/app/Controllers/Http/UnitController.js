'use strict'

class UnitController {
    render({request, view}) {
        //logic goes here

        return view.render('units', {})
    }
}

module.exports = UnitController
