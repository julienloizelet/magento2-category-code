# Category Code extension for Magento 2

---

## Installation Guide

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Requirements](#requirements)
- [Installation methods](#installation-methods)
- [Post Installation](#post-installation)
  - [Enable the module](#enable-the-module)
  - [System Upgrade](#system-upgrade)
  - [Clear Cache](#clear-cache)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


### Requirements

- Magento >= 2.3

Before 2.3, the data patch method was not used to create an attribute, so the `okaeli_category_code` attribute should be
created with the old method.

### Installation methods

The preferred way of installing `okaeli/magento2-category-code` is through Composer. Simply add `okaeli/magento2-category-code` as a dependency:

    composer require okaeli/magento2-category-code

Optionally you can download the latest version [here](https://github.com/julienloizelet/magento2-category-code/releases) and install the decompressed code in your projects directory under `app/code/Okaeli/CategoryCode`.

### Post Installation

#### Enable the module

After the installment of the module source code, the module has to be enabled by the Magento 2 CLI.

    bin/magento module:enable Okaeli_CategoryCode

#### System Upgrade

After enabling the module, the Magento 2 system must be upgraded (here will the `okaeli_category_code` attribute be created).

If the system mode is set to production, run the compile command first. This is not necessary for the developer mode.

    bin/magento setup:di:compile

To upgrade the system, the upgrade command must be run.

    bin/magento setup:upgrade

#### Clear Cache

At last, the Magento 2 should be cleared by running the flush command.

    bin/magento cache:flush

Sometimes, other cache systems or services must be restarted first, e.g. Apache Webserver and PHP FPM.
Sometimes, you will have to run the following command too :

    bin/magento setup:static-content:deploy -f
