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

use Magento\Catalog\Model\ResourceModel\Category\CollectionFactory;
use Magento\Framework\App\Helper\Context;
use Magento\Catalog\Model\Category;

class Data extends Config
{
    /**
     * @var Magento\Catalog\Model\ResourceModel\Category\CollectionFactory
     */
    protected $_collectionFactory;

    /**
     * @var array
     */
    protected $_categoryByCode = [];

    public const ATTRIBUTE_CODE = 'okaeli_category_code';

    /**
     * @param Context $context
     * @param CollectionFactory $collecionFactory
     */
    public function __construct(
        Context           $context,
        CollectionFactory $collecionFactory
    ) {
        $this->_collectionFactory = $collecionFactory;
        parent::__construct($context);
    }

    /**
     * Load a category by code
     *
     * @param string $categoryCode
     * @param array $attributes
     * @return Category
     */
    public function getCategoryByCode(string $categoryCode, array $attributes = []): Category
    {
        if (!isset($this->_categoryByCode[$categoryCode])) {
            $collection = $this->_collectionFactory
                ->create()
                ->addAttributeToFilter(self::ATTRIBUTE_CODE, $categoryCode)
                ->setPageSize(1);
            if (!empty($attributes)) {
                $collection->addAttributeToSelect($attributes);
            }
            $this->_categoryByCode[$categoryCode] = $collection->getFirstItem();
        }

        return $this->_categoryByCode[$categoryCode];
    }
}
