'use strict'

const Database = use('Database')

class AllocationController {

  async render({ view }) {
    const academics = await Database.select('id', 'name','load').from('academics').distinct('id')
    const allocations = await Database
      .from('academics')
      .select('academics.id', 'allocations.unit_code', 'allocations.load')
      .join('allocations', 'academics.id', '=', 'allocations.id')

    const unitsUnalloc = await Database
    .from('units')
    .select('units.id')
    .whereNotIn('units.id',
        Database.from('allocations')
        .select('allocations.unit_code')
    )
    

    console.log(JSON.stringify(unitsUnalloc))
    console.log("\n\n\n\n")


    var allocAcademics = []
    for (var i = 0; i < academics.length; i++) {
      var teacher = {
        id: academics[i].id,
        name: academics[i].name,
        requestedLoad: academics[i].load,
      }
      var units = []
      var totalLoad = 0;
      for (var j = 0; j < allocations.length; j++) {
        if (teacher.id == allocations[j].id) {
          units.push(
            {
              unit_code: allocations[j].unit_code,
              load: allocations[j].load
            }
          )
          totalLoad += parseInt(allocations[j].load)
        }
      }
      teacher.actualLoad = totalLoad
      teacher.allocUnits = units
      allocAcademics.push(teacher)
    }
    console.log(JSON.stringify(allocAcademics))
    return view.render('allocations', { allocAcademics: allocAcademics , unitsUnalloc: unitsUnalloc})
  }
}

module.exports = AllocationController