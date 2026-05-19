import AddProduct from '@/components/modules/product/AddProduct'
import PageHeading from '@/components/ui/PageHeading'

const AddProductPage = () => {
  return (
      <>
          <PageHeading back="/admin-layout/product">Add Product</PageHeading>
          <AddProduct />
      </>)
}

export default AddProductPage