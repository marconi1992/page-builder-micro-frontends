'use strict'
const { HttpException } = require('@adonisjs/generic-exceptions')

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

Route.get('/page-builder', async ({ view, request, response }) => {
  const { path = '/' } = request.get

  const AlgoliaClient = use('Algolia/Client')

  const pages = AlgoliaClient.initIndex('pages');

  const results = await pages.search('', {
    filters: `path:"${path}"`
  })

  if (!results.nbHits) {
    throw new HttpException('Page not found', 404)
  }

  const [page] = results.hits


  return view.render('page-builder', page);
})

Route.get('/', async ({ view, response }) => {
  const AlgoliaClient = use('Algolia/Client')

  const pages = AlgoliaClient.initIndex('pages');

  const results = await pages.search('', {
    filters: 'path:"/"'
  })


  if (!results.nbHits) {
    throw new HttpException('Page not found', 404)
  }

  const [page] = results.hits


  return view.render('welcome', page)
})

Route.put('/api/pages/:id', async ({ request, response, params }) => {
  const data = request.only(['components', 'path'])
  const { id } = params;

  const AlgoliaClient = use('Algolia/Client')

  const pages = AlgoliaClient.initIndex('pages')

  const results = await pages.getObjects([id])

  const [page] = await results.results

  if (!page) {
    return response.status(404).json({
      message: 'Page not found'
    });
  }

  await pages.addObjects([
    {
      ...page,
      ...data,
    }
  ]);

  return response.status(200).json({
    message: 'Page updated'
  })
})
