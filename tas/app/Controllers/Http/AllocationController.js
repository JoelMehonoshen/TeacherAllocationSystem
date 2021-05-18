'use strict'

class AllocationController {
    render({request, view}) {
        //logic goes here

        return view.render('allocations', {})
    }
}

module.exports = AllocationController
