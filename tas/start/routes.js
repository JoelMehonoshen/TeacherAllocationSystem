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

Route.get('/signup', ({view }) => {
    return view.render('signup')
})

Route.get('/login', ({view }) => {
    return view.render('login')
})


/*Logged in user Routes */
Route.post('/auth/login', 'UserController.login')
Route.post('/auth/signup', 'UserController.signup')
Route.post('/auth/refresh', 'UserController.refresh')
Route.get('/auth/whoami', 'UserController.whoami')



