import AdminCustomLayout from "@/components/AdminLayout";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";


const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
   const session = await getSession();
   //console.log("session:",session)
   if (!session) {
    redirect("/auth/signin");
   }
//console.log("getting sesssion")
  return <AdminCustomLayout>{children}</AdminCustomLayout>;
};
export const dynamic = "force-dynamic";
export default AdminLayout;
