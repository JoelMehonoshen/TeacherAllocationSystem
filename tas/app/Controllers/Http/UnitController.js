'use strict'

const Unit = use("App/Models/Unit");
const Database = use('Database');

class UnitController {

    async AddUnit({response}) {
        const Unit = new Unit()
        Unit.code = "IFBTEST"
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

    async render({request, response, view}) {
        const allUnits = JSON.stringify(await Unit.all()) 
        if (allUnits == undefined) {
            //TODO: Test this
            return view.render('units', {results: "No Units have been registered"})
        }else{
            return view.render('units', {results: allUnits})
        }
    }
}
module.exports = UnitController