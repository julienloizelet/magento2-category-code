# Category Code extension for Magento 2

## Developer guide


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Local development](#local-development)
  - [DDEV-Local setup](#ddev-local-setup)
    - [DDEV installation](#ddev-installation)
    - [DDEV Magento 2 environment](#ddev-magento-2-environment)
    - [Magento 2 installation](#magento-2-installation)
    - [Set up Magento 2](#set-up-magento-2)
    - [Configure Magento 2 for local development](#configure-magento-2-for-local-development)
    - [Okaeli CategoryCode extension installation](#okaeli-categorycode-extension-installation)
  - [Extension quality](#extension-quality)
  - [Unit tests](#unit-tests)
  - [End-to-end tests](#end-to-end-tests)
- [Commit message](#commit-message)
  - [Allowed message `type` values](#allowed-message-type-values)
- [Release process](#release-process)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Local development

There are many ways to install this extension on a local Magento 2 environment.

We are using [DDEV-Local](https://ddev.readthedocs.io/en/stable/) because it is quite simple to use and customize.

You may use your own local stack, but we provide here some useful tools that depends on DDEV.


#### DDEV-Local setup

For a quick start, follow the below steps.

_We will suppose that you want to test on a Magento 2.4.3 instance. Change the version number if you prefer another 
release._

##### DDEV installation

This project is fully compatible with DDEV 1.19.3 and it is recommended to use this specific version.
For the DDEV installation, please follow the [official instructions](https://ddev.readthedocs.io/en/stable/#installation).
On a Linux distribution, you can run:
```
sudo apt-get -qq update
sudo apt-get -qq -y install libnss3-tools
curl -LO https://raw.githubusercontent.com/drud/ddev/master/scripts/install_ddev.sh
bash install_ddev.sh v1.19.3
rm install_ddev.sh
```


##### DDEV Magento 2 environment

The final structure of the project will look like below.

```
m2-sources (choose the name you want for this folder)
│   
│ (Magento 2 sources installed with composer)    
│
└───.ddev (do not change this folder name)
│   │   
│   │ (Cloned sources of a Magento 2 specific ddev repo)
│   
└───my-own-modules (do not change this folder name)
    │   
    │
    └───category-code (do not change this folder name)
       │   
       │ (Cloned sources of this repo)
         
```

**N.B:** you can use whatever name you like for the folder `m2-sources` but, in order to use our pre-configured ddev
commands, you must respect the sub folders naming: `.ddev`, `my-own-modules` and `category-code`.

- Create an empty folder that will contain all necessary sources (Magento 2 and this extension):
``` 
mkdir m2-sources
```
- Create an empty `.ddev` folder for DDEV and clone our pre-configured DDEV repo:
```
mkdir m2-sources/.ddev
cd m2-sources/.ddev
git clone git@github.com:julienloizelet/ddev-m2.git ./
```
- Copy some configurations file:

```      
cp config_overrides/config.m243.yaml config.m243.yaml
```

- Launch DDEV
```
ddev start
```
 This should take some times on the first launch as this will download all necessary docker images.


##### Magento 2 installation
You will need your Magento 2 credentials to install the source code.

     ddev composer create --repository=https://repo.magento.com/ magento/project-community-edition:2.4.3


##### Set up Magento 2

     ddev magento setup:install \
                           --base-url=https://m243.ddev.site/ \
                           --db-host=db \
                           --db-name=db \
                           --db-user=db \
                           --db-password=db \
                           --backend-frontname=admin \
                           --admin-firstname=admin \
                           --admin-lastname=admin \
                           --admin-email=admin@admin.com \
                           --admin-user=admin \
                           --admin-password=admin123 \
                           --language=en_US \
                           --currency=USD \
                           --timezone=America/Chicago \
                           --use-rewrites=1 \
                           --elasticsearch-host=elasticsearch


##### Configure Magento 2 for local development

    ddev magento config:set admin/security/password_is_forced 0
    ddev magento config:set admin/security/password_lifetime 0
    ddev magento module:disable Magento_TwoFactorAuth
    ddev magento setup:performance:generate-fixtures setup/performance-toolkit/profiles/ce/small.xml
    ddev magento c:c

##### Okaeli CategoryCode extension installation

     cd m2-sources
     mkdir -p my-own-modules/category-code
     cd my-own-modules/category-code
     git clone git@github.com:julienloizelet/magento2-category-code.git ./
     ddev composer config repositories.category-code-module path my-own-modules/category-code/
     ddev composer require okaeli/magento2-category-code:@dev
     ddev magento module:enable Okaeli_CategoryCode
     ddev magento setup:upgrade
     ddev magento cache:flush


#### Extension quality

During development, you can run some static php tools to ensure quality code:  

- PHP Code Sniffer: `ddev phpcs my-own-modules/category-code --ignore="*/node_modules/*"`
- PHP Mess Detector: `ddev phpmd --exclude "node_modules"  my-own-modules/category-code`
- PHP Stan: `ddev phpstan my-own-modules/category-code`

#### Unit tests

You can also check unit tests: `ddev phpunit my-own-modules/category-code/Test/Unit`

#### End-to-end tests

We are using a Jest/Playwright Node.js stack to launch a suite of end-to-end tests.

**Please note** that those tests modify local configurations and log content on the fly.

Tests code is in the `Test/EndToEnd` folder. You should have to `chmod +x` the scripts you will find in  
`Test/EndToEnd/__scripts__`.
    
Then you can use the `run-test.sh` script to run the tests:

- the first parameter specifies if you want to run the test on your machine (`host`) or in the 
docker containers (`docker`). You can also use `ci` if you want to have the same behavior as in Github action.
- the second parameter list the test files you want to execute. If empty, all the test suite will be launched.

For example: 

    ./run-tests.sh host "./__tests__/1-config.js"
    ./run-tests.sh docker "./__tests__/1-config.js" 
    ./run-tests.sh host
    ./run-tests.sh host "./__tests__/1-config.js  ./__tests__/2-handle-update.js"

Before testing with the `docker` or `ci` parameter, you have to install all the required dependencies 
in the playwright container with this command :

    ./test-init.sh

If you want to test with the `host` parameter, you will have to install manually all the required dependencies: 

```
yarn --cwd ./Test/EndToEnd --force
yarn global add cross-env
```


### Commit message

In order to have an explicit commit history, we are using some commits message convention with the following format:

    <type>(<scope>): <subject>

Allowed `type` are defined below.
`scope` value intends to clarify which part of the code has been modified. It can be empty or `*` if the change is a
global or difficult to assign to a specific part.
`subject` describes what has been done using the imperative, present tense.

Example:

    feat(admin): Add css for admin actions


You can use the `commit-msg` git hook that you will find in the `.githooks` folder : 

```
cp .githooks/commit-msg .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
```

#### Allowed message `type` values

- chore (automatic tasks; no production code change)
- ci (updating continuous integration process; no production code change)
- comment (commenting;no production code change)
- docs (changes to the documentation)
- feat (new feature for the user)
- fix (bug fix for the user)
- refactor (refactoring production code)
- style (formatting; no production code change)
- test (adding missing tests, refactoring tests; no production code change)

### Release process

We are using [semantic versioning](https://semver.org/) to determine a version number.

Before publishing a new release, there are some manual steps to take:

- Change the version number in the `composer.json` file
- Update the `CHANGELOG.md` file


Then, using the [Github CLI](https://github.com/cli/cli), you can: 
- create a draft release: `gh workflow run release.yml -f tag_name=vx.y.z -f draft=true`
- publish a prerelease:  `gh workflow run release.yml -f tag_name=vx.y.z -f prerelease=true`
- publish a release: `gh workflow run release.yml -f tag_name=vx.y.z`

Note that the Github action will fail if the tag `tag_name` already exits.

At the end of the Github action process, you will find a `okaeli-magento2-category-code-x.y.z.zip` file in the 
Github release assets.

 
