# 🥳 TFE

![](https://media.giphy.com/media/xHMIDAy1qkzNS/giphy.gif)

## **Headless TFE website build with [Nuxt.js](https://nuxtjs.org)**

# 📦 Requirments

-   [Node.js v10 or higher](https://nodejs.org/en/)
-   [Yarn v1.16 or higher](https://yarnpkg.com/lang/en/) or NPM v6.7
-   Login at [Prismic.io CMS](https://thefactore.prismic.io/) (password manager > website-tfe)
-   ☕ Coffee

# 🐎 QuickStart

## Development

1. type in the terminal:

    ```bash
    # install dependencies
    $ yarn

    # served at localhost:3000
    $ yarn dev
    ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Extra plugins

-   https://github.com/nuxt-community/device-module

## Production

Because there is no backend integration all deploys are automated with a `CI build` and pushed to `AWS`.

Build can be triggerd in 3 ways:

-   Merge requests (`master` needs aproval from Maintainer)
-   Webhook trigger from CMS
-   Manual CI build

# 🌎 Browser support

-   Chrome
-   Edge (Chrome)
-   Firefox (not officially supported but because of ❤️)
-   IE11 (🤮)
-   Safari

# 🔗 Url's

-   [Local](https://localhost:3000)
-   [Staging](https://tfe.acc.tfe.nl/)
-   [Production](https://tfe.nl/)
