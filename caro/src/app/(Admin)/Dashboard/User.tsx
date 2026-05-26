import { Button } from "@/components/ui/button";


const User = () => {
  return (
    <>
      <section className="p-3 bg-white w-[calc(100%-20px)] mt-3">
        <h2 className="text-3xl">Register User</h2>
        <main>
          <table
            className="text-start w-full"
            style={{
              tableLayout: "fixed",
              borderSpacing: "0 8px",
              borderCollapse: "separate",
            }}
          >
            <thead>
              <tr className="text-left text-[20px] ">
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Name
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Email
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Phone Number
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Address
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Licence Number
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-500">
                <td>Ram</td>
                <td>eg@gmail.com</td>
                <td>1234567890</td>
                <td>123 Main St</td>
                <td>Licence123</td>
                <td>
                  <Button className="bg-red-500 p-3 rounded-2xl text-white">
                    Block
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </section>
    </>
  );
};

export default User;
