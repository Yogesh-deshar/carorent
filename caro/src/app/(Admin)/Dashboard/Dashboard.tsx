import Image from "next/image";

const Dashboard = () => {
  return (
    <>
      <section className="mt-6 p-3 ">
        <div className="bg-white rounded-2xl w-full p-3">
          <h2 className="text-4xl">Dashboard</h2>
          <div className="w-[calc(100%-80px)] flex items-center">
            <div
              className="w-[500px] h-[200px] bg-white rounded-2xl  gap-5  m-3 flex items-center justify-center"
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <span className="text-9xl ">4</span>
              <p className="text-7xl">Users</p>
            </div>

            <div
              className="w-[400px] h-[200px] bg-white rounded-2xl  flex flex-col items-center justify-center text-4xl"
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <span>45000</span>
              <p>Revenue</p>
            </div>

            <div className="grid gap-3 p-2 h-[200px] ">
              <div
                className="col-span-1 row-span-2  w-[300px]  bg-white rounded-2xl flex items-center justify-center gap-3 text-3xl"
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <span>5</span>
                <p>Rented</p>
              </div>
              <div
                className="col-span-1 row-span-1  bg-white rounded-2xl flex items-center justify-center gap-3 text-3xl"
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <span>5</span>
                <p>Rented</p>
              </div>
            </div>
          </div>
        </div>
        <main className="mt-6 bg-white rounded-2xl  p-3">
          <table
            className="text-start w-full"
            style={{
              tableLayout: "fixed",
              borderSpacing: "0 8px",
              borderCollapse: "separate",
            }}
          >
            <thead className=" border-b-2">
              <tr className="text-left text-[20px]">
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Image
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Car Name
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Model
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Category
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Type
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Price per day
                </th>
                <th className="text-left w-1/7 border-b-2 border-gray-200">
                  Available
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="mt-2">
                <td className="w-1/7">
                  <Image
                    width={40}
                    height={40}
                    src="/test1.jpg"
                    alt="car image"
                  />
                </td>
                <td className="w-1/7">car name</td>
                <td className="w-1/7">2020</td>
                <td className="w-1/7">Electric</td>
                <td className="w-1/7">sedan</td>
                <td className="w-1/7">$50</td>
                <td className="w-1/7">Yes</td>
              </tr>
            </tbody>
          </table>
        </main>
      </section>
    </>
  );
};

export default Dashboard;
