import AdminGuard from "@/components/AdminGuard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Dashboard from "./Dashboard";
import User from "./User";
import Addcar from "./Addcar";
import Rented from "./Rented";

const AdminDashboard = () => {
  return (
    <AdminGuard>
      <section className="bg-[#f0f0f0]  ">
        <Tabs defaultValue="dashboard" orientation="vertical">
          <TabsList className="flex flex-col gap-2 w-[200px]   rounded-none bg-white !h-full">
            <TabsTrigger
              value="dashboard"
              className="  data-[state=active]:bg-[#00d20e]  data-[state=active]:text-white w-[200px] p-3 text-xl"
            >
              DashBoard
            </TabsTrigger>
            <TabsTrigger
              value="User"
              className=" data-[state=active]:bg-[#00d20e]  data-[state=active]:text-white w-[200px] p-3 text-xl"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="Rented"
              className=" data-[state=active]:bg-[#00d20e]  data-[state=active]:text-white w-[200px] p-3 text-xl"
            >
              Rented
            </TabsTrigger>
            <TabsTrigger
              value="Addcar"
              className=" data-[state=active]:bg-[#00d20e]  data-[state=active]:text-white w-[200px] p-3 text-xl"
            >
              Add Car
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="User">
            <User />
          </TabsContent>

          <TabsContent value="Rented">
            <Rented />
          </TabsContent>

          <TabsContent value="Addcar">
            <Addcar />
          </TabsContent>
        </Tabs>
      </section>
    </AdminGuard>
  );
};

export default AdminDashboard;
