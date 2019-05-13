const { ServiceProvider } = require('@adonisjs/fold');
const { ioc } = require('@adonisjs/fold')
const algoliasearch = require('algoliasearch');

class AlgoliaProvider extends ServiceProvider {
  register() {
    const Config = this.app.use('Config')

    this.app.singleton('Algolia/Client', function () {
      const { applicationId, apiKey } = Config.get('services.algolia')

      return algoliasearch(applicationId, apiKey)
    })
  }
}

module.exports = AlgoliaProvider
