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

use Magento\Store\Model\ScopeInterface;
use Magento\Framework\App\Helper\AbstractHelper;

class Config extends AbstractHelper
{
    public const XML_PATH_FRONTEND_LAYOUT_UPDATE = 'catalog/frontend/okaeli_category_layout_update';

    /**
     * Get layout update enabled config
     *
     * @var bool
     */
    protected $_isLayoutEnabled;

    /**
     * Retrieve is_layout_enabled configuration value
     *
     * @param null|int|string $storeId
     * @return bool
     */
    public function isLayoutUpdateEnabled($storeId = null): bool
    {
        if ($this->_isLayoutEnabled === null) {
            $this->_isLayoutEnabled = (bool) $this->scopeConfig->getValue(
                self::XML_PATH_FRONTEND_LAYOUT_UPDATE,
                ScopeInterface::SCOPE_STORE,
                $storeId
            );
        }

        return $this->_isLayoutEnabled;
    }
}
