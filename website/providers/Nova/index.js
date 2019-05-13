const { ServiceProvider } = require('@adonisjs/fold');
const { v4 } = require('uuid');

class NovaProvider extends ServiceProvider {
  boot() {
    const View = this.app.use('View')

    View.global('nova', function (name, data) {
      const uuid = v4();

      const placeholder = `<div data-hypernova-key="${name}" data-hypernova-id="${uuid}"><div></div></div>`
      const scriptTag = `<script type="application/json" data-hypernova-key="${name}" data-hypernova-id="${uuid}"><!--${JSON.stringify(data)}--></script>`

      return this.safe(`${placeholder}\n${scriptTag}`)
    });
  }
}

module.exports = NovaProvider
