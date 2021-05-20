'use strict'

const AcademicController = require('../app/Controllers/Http/AcademicController')

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

//Authenticated Views
Route.get('/', ({view }) => {
    return view.render('home')
})

Route.get('/allocations', 'AllocationController.render')
.middleware(["auth"])

Route.get('/academics', 'AcademicController.render')
.middleware(["auth"])

Route.get('/units', 'UnitController.render')
.middleware(["auth"])

Route.get('/import', ({view }) => {
    return view.render('import')
}).middleware(["auth"])

Route.get('/export', ({view }) => {
    return view.render('export')
}).middleware(["auth"])

Route.get('/help', ({view }) => {
    return view.render('help')
}).middleware(["auth"])

// Unauthenticated views
Route.get('/signup', ({view }) => {
    return view.render('signup')
})

Route.get('/login', ({view }) => {
    return view.render('login')
})

//UserController Routes
Route.post('/auth/login', 'UserController.login')
Route.post('/auth/signup', 'UserController.signup')
Route.get('/auth/signout', 'UserController.signout')


//academics testing functionality
Route.get('/academics/addDummy', 'AcademicController.AddDummy')
