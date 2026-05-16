import MyStore from "@/components/modules/store/MyStore";
import PageHeading from "@/components/ui/PageHeading";

const MyStorePage = () => {
  return (
    <>
      <PageHeading className="">My Store</PageHeading>
      <MyStore />
    </>
  );
};

export default MyStorePage;
