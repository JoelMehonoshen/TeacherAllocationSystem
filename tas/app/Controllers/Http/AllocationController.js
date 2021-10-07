'use strict'

const Database = use('Database')

class AllocationController {
  // update the databse with new allocations and academics
  async update({response, request}){
    await Database
    .from('academics')
    .where('id',request.input("academicID"))
    .update({
       name:request.input("name"),
       load:request.input("requestedLoad")
      })
    if(request.input("unit")){
      for (var i = 0; i < request.input("allocationID").length; i++) {
        await Database
         .from('allocations')
         .where('allocation_id',request.input("allocationID")[i])
         .update({
           unit_code:request.input("unit")[i],
           load:request.input("unitLoad")[i]
         })
    }}

    return response.route('/allocations', true)
  }

  async render({ view, request }) {
    if (request.input("search")) {
      // Retrieves search information from each table
      var academics = await Database
      .select('id', 'name','load')
      .from('academics')
      .distinct('id')
      .where('name', request.input("search"))

      var allocations = await Database
      .from('academics')
      .select('allocations.unit_code', 'allocations.load','allocations.id', 'allocations.allocation_id')
      .join('allocations', 'academics.id', '=', 'allocations.id')

      var unitsUnalloc = await Database
      .from('units')
      .select('units.id')
      .whereNotIn('units.id',
          Database.from('allocations')
          .select('allocations.unit_code')
        )
    }else{
      // Retrieves all information from each table
      var academics = await Database
        .select('id', 'name','load')
        .from('academics')
        .distinct('id')
      var allocations = await Database
        .from('academics')
        .select('allocations.unit_code', 'allocations.load','allocations.id', 'allocations.allocation_id')
        .join('allocations', 'academics.id', '=', 'allocations.id')
      var unitsUnalloc = await Database
      .from('units')
      .select('units.id')
      .whereNotIn('units.id',
          Database.from('allocations')
          .select('allocations.unit_code')
      )
    }

    // Coorelates academics and their allocations based on id
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
              allocation_id: allocations[j].allocation_id,
              unit_code: allocations[j].unit_code,
              load: allocations[j].load
            }
          )
          totalLoad += parseFloat(allocations[j].load)
        }
      }
      teacher.actualLoad = totalLoad
      teacher.allocUnits = units
      allocAcademics.push(teacher)
    }
    return view.render('allocations', { allocAcademics: allocAcademics , unitsUnalloc: unitsUnalloc})
  }
}

module.exports = AllocationController
