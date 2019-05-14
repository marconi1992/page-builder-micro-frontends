# Page Builder using micro-frontends

## Setup environment

### Create Algolia Index
It's necessary create a `pages` index in [Algolia](https://www.algolia.com) and adding the field `path` as a facet attribute in the index configuration..

You can go directly to the facets configuration replacing `app-id` for your application id in the next link:
`https://www.algolia.com/apps/<app-id>/explorer/configuration/pages/facets`

### Set Algolia credentials in website.

You need to add your algolia credentials inside the `.env` file in the folder `website`

```
ALGOLIA_APP_ID=
ALGOLIA_API_KEY=
```

### Set GitHub token

You need to create a token in the [settings page](https://github.com/settings/tokens) on Github.

After the token is created, you need to set that token in the  `.env` file inside the folder `micro-2`

```
GITHUB_TOKEN=
```

### Run Application

Once  everything is setup you only need to run some docker containers.

```
docker-compose up
```

This command runs the necessary containers but the first time it could take around 1 or 2 minutes to install all the dependencies.