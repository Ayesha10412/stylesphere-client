import EditProduct from "@/components/modules/product/EditProduct";
import PageHeading from "@/components/ui/PageHeading";

const EditProductPage =async ({ params }: { params: { id: string } }) => {
    const { id } =await params
    console.log("id:",id)
  return (
    <>
      <PageHeading back="/admin-layout/product">Edit Product</PageHeading>
      <EditProduct id={id} />
    </>
  );
};

export default EditProductPage;
