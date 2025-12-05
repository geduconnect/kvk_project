import React from 'react'
import { HomeCarousel } from './HomeCarousel'
import { ProductCategory } from './listing/ProductCategory'
import { HomeCarousel2 } from './HomeCarousel2'
import { Affiliations } from './Affiliations'
import { HomeProducts } from './popular/HomeProducts'
import { DailyDealsProducts } from './dailydeals/DailyDealsProducts'
import { SmartFarmingProducts } from './smartfarming/SmartFarmingProducts'
import { SeasonalProducts } from './seasonalproducts/SeasonalProducts'
import { GrowthPromoters } from './pesticides/GrowthPromoters'
import { DailyDealsCategory } from './dailydeals/DailyDealsCategory'
import { AllCategoriesProducts } from './categorywise/AllCategoriesProducts'

export const Home = () => {
  return (
    <>
      <HomeCarousel />
      <ProductCategory />
      <HomeCarousel2 />
      <HomeProducts />
      <DailyDealsProducts />
      <AllCategoriesProducts />
      {/* <GrowthPromoters categoryId={4} categoryName="Pesticides" /> */}
      
      <Affiliations />

    </>
  )
}
