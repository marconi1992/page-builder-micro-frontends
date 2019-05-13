/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  algolia: {
    applicationId: Env.get('ALGOLIA_APP_ID'),
    apiKey: Env.get('ALGOLIA_API_KEY'),
  }
}
