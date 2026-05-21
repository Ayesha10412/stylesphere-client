import ProductDetails from '@/components/modules/product/ProductDetails'
import PageHeading from '@/components/ui/PageHeading'

const ProductDetailsPage = async({ params }: { params: { id: string } }) => {
    const { id } =await params
        console.log(id);

  return (
      <>
         <PageHeading back="/admin-layout/product">Product Details</PageHeading> 
          <ProductDetails id={id}  />
      </>)
}

export default ProductDetailsPage