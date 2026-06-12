import AddOrder from "@/components/modules/order/AddOrder";
import PageHeading from "@/components/ui/PageHeading";

const ProductOrderPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
  return (
    <>
          <PageHeading>Order your product</PageHeading>
          <AddOrder />
    </>
  );
};

export default ProductOrderPage;
