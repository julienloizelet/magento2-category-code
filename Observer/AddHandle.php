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

namespace Okaeli\CategoryCode\Observer;

use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Registry;
use Okaeli\CategoryCode\Helper\Data as HelperData;

class AddHandle implements ObserverInterface
{
    /**
     * @var Registry
     */
    protected $_registry;

    /**
     * @var HelperData
     */
    protected $_helper;

    /**
     * @param Registry $registry
     * @param HelperData $helper
     */
    public function __construct(
        Registry   $registry,
        HelperData $helper
    ) {
        $this->_registry = $registry;
        $this->_helper = $helper;
    }

    /**
     * Add specific layout handle
     *
     * @param \Magento\Framework\Event\Observer $observer
     * @return $this|void
     */
    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        if (!$this->_helper->isLayoutUpdateEnabled()) {
            return $this;
        }
        $categoryPage = ($observer->getData('full_action_name') == 'catalog_category_view');
        // We add handles only in a category page
        if (!$categoryPage) {
            return $this;
        }
        $category = $this->_registry->registry('current_category');
        if (!$category) {
            return $this;
        }
        $categoryCode = trim((string) $category->getData(HelperData::ATTRIBUTE_CODE));
        if (!empty($categoryCode)) {
            $layout = $observer->getData('layout');
            $layout->getUpdate()->addHandle('catalog_category_code_' . strtolower($categoryCode));
        }
    }
}
