# prestashop-module-action

A github action to perform CI/CD validation on a PrestaShop module. This action can be called within the `.github` directory of your github project ot build up workflows.

More information about this framework on the [github actions documentation](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions).

## Available actions

`prestashop-module-action` embeds several sub-actions:

- `composer-install`: installs composer dependencies
- `build-zip`: make a zip build out of the `module-directory`
- `php-lint`: lint the sources with PHP
- `phpunit`: run the php unit tests
- `phpstan`: run phpstan
- `php-cs-fixer`: run php-cs-fixer
- `prestashop-installation`: installs the module in PrestaShop

Each of the above actions are sensitive to the `PS_VERSION` and `PHP_VERSION` environment variables. If not provided, the latest PrestaShop is used. The PHP resolution defaults to the recommended version.

> Note: these actions are run sequentially.

## Example usage

```yml
steps:
  # checkout the source code of the repository
  - uses: actions/checkout@v3

  # run composer install and zip everything up
  - uses: prestashop/prestashop-module-action@v0.0.1
    with:
      module-directory: ./
      actions: |
        composer-install
        build-zip

  # quality check and prestashop installation
  - uses: prestashop/prestashop-module-action@v0.0.1
    with:
      module-zip-file: "./dist/my_module.zip"
      module-name: "my_module"
      prestashop-version: ["1.7.8.10", "8.1.1"]
      phpunit-configuration: "./tests/phpunit.xml"
      phpstan-configuration: "./tests/phpstan/phpstan.neon"
      actions: |
        php-lint
        phpunit
        phpstan
        php-cs-fixer
        prestashop-installation
```

Alternatively if you alreay use a makefile:


```yml

```

## Environment variables

- `MODULE_VERSION`: overrides the autoguessed version from tags, useful for "build-zip" action.
- `PS_VERSION`:
- `PHP_VERSION`:
