'use strict'

const Allocation = use("App/Models/Allocation");
const Academic = use("App/Models/Academic");

class AllocationController {
    async render ({ view }) {
        const allocations = await Allocation.all()
        const academics = await Academic.all()

        return view.render('allocations', { allocations: allocations.toJSON(), academics: academics.toJSON()})
      }
}

module.exports = AllocationController
