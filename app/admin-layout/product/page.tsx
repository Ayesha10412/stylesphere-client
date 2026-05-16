import Product from '@/components/modules/product/Product'
import PageHeading from '@/components/ui/PageHeading'

const ProductPage = () => {
  return (
   <>
   <PageHeading className=''>Product List</PageHeading>
   <Product />
   </>
  )
}

export default ProductPage