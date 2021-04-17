'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ({view }) => {
    return view.render('home')
})

Route.get('/allocations', ({view }) => {
    return view.render('allocations')
})

Route.get('/academics', ({view }) => {
    return view.render('academics')
})

Route.get('/units', ({view }) => {
    return view.render('allocations')
})

Route.get('/import', ({view }) => {
    return view.render('import')
})

Route.get('/export', ({view }) => {
    return view.render('export')
})

Route.get('/help', ({view }) => {
    return view.render('help')
})

/* File Upload Routing */

const Helpers = use('Helpers')

Route.post('upload', async ({ request }) => {
  const spreadsheet = request.file('spreadsheet', {
    types: ['text/csv'],
    size: '2mb',
    extnames: ['xlsx','csv']
  })

  await spreadsheet.move(Helpers.tmpPath('uploads'), {
    name: 'TeachingData.csv',
    overwrite: true
  })

  if (!spreadsheet.moved()) {
    return spreadsheet.error()
  }
  return 'File moved'
})
