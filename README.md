# Okaeli_CategoryCode

----------------------

```
@category   Okaeli  
@package    Okaeli_CategoryCode  
@author     Julien Loizelet <julienloizelet@okaeli.com>  
@copyright  Copyright (c)  2019 Julien Loizelet  
@license    GNU GENERAL PUBLIC LICENSE Version 3
  
```

## Description

`Okaeli_CategoryCode` is a Magento® 2 extension that will add a "code" attribute to categories.

![Okaeli CategoryCode Admin Field screenshot](doc/images/okaeli-category-code-field.png)

The main purpose of this is to have a unique identifier to manage categories (better than `id` that could be dependent of the environment).

In addition, this extension can add a new handle in the category page layout depending on this unique identifier. This should be used to put the design of a 
specific category in your Version Control System tool (e.g by modifying a xml file) instead of doing that in the `Layout Update XML` backend field. 


## Installation

### Requirements

- Magento >= 2.3 

Before 2.3, the data patch method was not used to create an attribute, so the `okaeli_category_code` attribute should be
created with the old method.

### Installation methods

The preferred way of installing `okaeli/magento2-category-code` is through Composer. Simply add `okaeli/magento2-category-code` as a dependency:

    composer.phar require okaeli/magento2-category-code

Optionally you can download the latest version [here](https://github.com/julienloizelet/magento2-category-code/releases) and install the decompressed code in your projects directory under `app/code/Okaeli/CategoryCode`.

## Post Installation

### Enable the module

After the installment of the module source code, the module has to be enabled by the Magento® 2 CLI.

    bin/magento module:enable Okaeli_CategoryCode

### System Upgrade

After enabling the module, the Magento® 2 system must be upgraded (here will the `okaeli_category_code` attribute be created).

If the system mode is set to production, run the compile command first. This is not necessary for the developer mode.

    bin/magento setup:di:compile

To upgrade the system, the upgrade command must be run.

    bin/magento setup:upgrade

### Clear Cache

At last, the Magento® 2 should be cleared by running the flush command.

    bin/magento cache:flush

Sometimes, other cache systems or services must be restarted first, e.g. Apache Webserver and PHP FPM.
Sometimes, you will have to run the following command too :

    bin/magento setup:static-content:deploy -f



## Usage

### Features

1. If you have to load a specific category, you should use the `Okaeli\CategoryCode\Helper\Data::getCategoryByCode` method.
As the code is unique and does not depend on the environment, you are sure to retrieve the wanted category. This would not be the case if 
you were using the Id or even worse, the name ...

2. If you need to update layout of a category and do not want to do it in the backend, you should use the handle
`catalog_category_code_here-the-code-of-the-category`

For example, suppose that you need to remove the title of the category page **only** for the category having the code `modify-me`.
Then, you could create a `catalog_category_code_modify-me.xml` in the `app/design/frontend/MyCompany/MyTheme/Magento_Catalog/layout` folder with the following content :

    <?xml version="1.0"?>
    <page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" layout="2columns-left" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
        <body>
            <referenceBlock name="page.main.title" remove="true"/>
        </body>
    </page>


### Configurations

This module comes with one configuration :

  * `Stores > Configuration > Catalog > Catalog > Add category code handle`

  This configuration allows you to enable / disable frontend layout update. If `Yes` is selected,
a new handle depending on the category code (e.g `catalog_category_code_` concatened with the category code in lowercase)

  

  ![Okaeli CategoryCode Settings screenshot](doc/images/okaeli-category-code-settings.png)

## Technical Notes

### No rewrite. Events driven development.

This extension is **0 rewrite**  guaranteed. The following event is listened:

  * `layout_load_before` : used to add custom handle in layout.


### Coding Standards

This extension has been checked with the [Magento Extension Quality Program Coding Standard](https://github.com/magento/magento-coding-standard).
You can find the output of the command `phpcs /path/to/Okaeli/CategoryCode/sources --standard=Magento2` in [this file](doc/coding-standard/magento-eqp.txt).

## Support

If you encounter any problems or bugs, please create an issue on
[GitHub](https://github.com/julienloizelet/magento2-category-code/issues).

## Contribution

Any contribution is highly welcome. The best possibility to provide any code is to open
a [pull request on GitHub](https://help.github.com/articles/using-pull-requests).

## License

[GNU General Public License, version 3 (GPLv3)](http://opensource.org/licenses/gpl-3.0)
