'use strict'

const Database = use('Database')

class AllocationController {
  async render({ view }) {
    // Retrieves required information from each table
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
    return view.render('allocations', { allocAcademics: allocAcademics , unitsUnalloc: unitsUnalloc})
  }
  // update the databse with new allocations and academics
  async update({view, request}){
    //TODO: the form will sent multiple 'names' and ids and stuff, we need to iterate through each one and update
    //update academics table
    Database
    .from('academics')
    .where('id',request.input('id'))
    .update(
      {name:request.input('name')},
      {load:request.input('load')},
    )
    //need to do fore each unit assigned to one academic 
    //update allocations table
    Database
    .from('allocations')
    .where('id',request.input('id'))
    .update(
      {}
    )
    return response.route('/allocations', true)
  }
}

module.exports = AllocationController