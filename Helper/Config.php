<?php
/**
 * Okaeli_CategoryCode  Extension
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the GNU GENERAL PUBLIC LICENSE Version 3
 * that is bundled with this package in the file LICENSE
 *
 * @category Okaeli
 * @package Okaeli_CategoryCode
 * @copyright  Copyright (c)  2019 Julien Loizelet
 * @author     Julien Loizelet <julienloizelet@okaeli.com>
 * @license    GNU GENERAL PUBLIC LICENSE Version 3
 *
 */

/**
 *
 * @category Okaeli
 * @package  Okaeli_CategoryCode
 * @module   CategoryCode
 * @author   Julien Loizelet <julienloizelet@okaeli.com>
 *
 */

namespace Okaeli\CategoryCode\Helper;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Helper\AbstractHelper;

class Config extends AbstractHelper
{
    const XML_PATH_FRONTEND_LAYOUT_UPDATE = 'catalog/frontend/okaeli_category_layout_update';

    public function isLayoutUpdateEnabled($storeId = null)
    {
        return $this->scopeConfig->getValue(
            self::XML_PATH_FRONTEND_LAYOUT_UPDATE,
            ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
            $storeId
        );
    }
}
