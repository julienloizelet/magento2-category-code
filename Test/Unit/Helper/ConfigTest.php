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
 * @copyright  Copyright (c)  2022 Julien Loizelet
 * @author     Julien Loizelet <julienloizelet@okaeli.com>
 * @license    GNU GENERAL PUBLIC LICENSE Version 3
 *
 */

/**
 *
 *
 * @category Okaeli
 * @package  Okaeli_CategoryCode
 * @module   CategoryCode
 * @author   Julien Loizelet <julienloizelet@okaeli.com>
 *
 */

namespace Okaeli\CategoryCode\Test\Unit\Helper;

use Magento\Framework\TestFramework\Unit\Helper\ObjectManager;
use Magento\Store\Model\ScopeInterface;
use Okaeli\CategoryCode\Helper\Config;

class ConfigTest extends \PHPUnit\Framework\TestCase
{
    /**
     * @var Config
     */
    protected $helper;

    /**
     * @var \PHPUnit_Framework_MockObject_MockObject
     */
    private $scopeConfig;

    protected function setUp(): void
    {
        $objectManagerHelper = new ObjectManager($this);
        $className = Config::class;
        $arguments = $objectManagerHelper->getConstructArguments($className);

        /** @var \Magento\Framework\App\Helper\Context $context */
        $context = $arguments['context'];
        $this->scopeConfig = $context->getScopeConfig();

        $this->helper = $objectManagerHelper->getObject($className, $arguments);
    }

    public function testIsLayoutUpdateEnabled()
    {
        $scopeResult = true;
        $this->scopeConfig->expects($this->once())->method('getValue')->with(
            Config::XML_PATH_FRONTEND_LAYOUT_UPDATE,
            ScopeInterface::SCOPE_STORE
        )
            ->willReturn($scopeResult);
        $result = $this->helper->isLayoutUpdateEnabled();

        $this->assertEquals($scopeResult, $result);
    }

    public function testIsLayoutUpdateDisabled()
    {
        $scopeResult = false;
        $this->scopeConfig->expects($this->once())->method('getValue')->with(
            Config::XML_PATH_FRONTEND_LAYOUT_UPDATE,
            ScopeInterface::SCOPE_STORE
        )
            ->willReturn($scopeResult);
        $result = $this->helper->isLayoutUpdateEnabled();

        $this->assertEquals($scopeResult, $result);
    }
}
