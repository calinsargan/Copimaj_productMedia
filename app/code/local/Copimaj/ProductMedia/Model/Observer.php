<?php

class Copimaj_ProductMedia_Model_Observer {
    /**
     * Observes the catalog_block_product_list_collection event
     * @return Mage_Catalog_Model_Resource_Category_Collection
     */

    public function addOnlyNewFilter($observer){
        $productCollection = $observer->getEvent()->getCollection();

        $currentCat = Mage::registry('current_category');
        if ( $currentCat->getParentId() == Mage::app()->getStore()->getRootCategoryId() )
        {
            // current category is a toplevel category
            $loadCategory = $currentCat;
        } else {
            // current category is a sub-(or subsub-, etc...)category of a toplevel category
            // load the parent category of the current category
            $loadCategory = Mage::getModel('catalog/category')->load($currentCat->getParentId());
        }
        $subCategoriesName[] = $loadCategory->getName();
        $subCategoriesName[] = $currentCat->getName();

        $todayDate  = Mage::app()->getLocale()->date()->toString(Varien_Date::DATETIME_INTERNAL_FORMAT);

        if (in_array('Noutati',$subCategoriesName)) {
            $productCollection->addAttributeToFilter('news_from_date', array('date' => true, 'to' => $todayDate))
                ->addAttributeToFilter('news_to_date', array('or' => array(
                    0 => array('date' => true, 'from' => $todayDate),
                    1 => array('is' => new Zend_Db_Expr('null')))
                ), 'left');

            $observer->getEvent()->setCollection($productCollection);
        }
        return $productCollection;
    }

}