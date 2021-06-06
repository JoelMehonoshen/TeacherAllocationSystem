'use strict'

const Unit = use("App/Models/Unit");

class UnitController {

    async AddUnit({response}) {
        const Unit = new Unit()
        Unit.code = "TEST"
        Unit.year="2021"
        Unit.semester="1"
        Unit.load="1"
        console.log(unit)
        await unit.save()
        return response.redirect('/Units', true)
    }
    
    // async UnitQuery (request, response, view) {
    //    const results= await Database
    //       .table('units')
    //       .where('unit_code', request.search)
    //     if(results.rows[0] == null){
    //         return view.render('units', {results: "No Search Results"})
    //     }else{
    //         return view.render('units', {selectResponse: data.rows[0]})
    //     }
    //   }

    async render ({ view }) {
        const units = await Unit.all()
      
        return view.render('units', { units: units.toJSON()})
      }
}
module.exports = UnitController