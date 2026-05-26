import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Addcar = () => {
  return (
    <>
      <main>
        <h1 className="text-2xl font-bold mb-4">Add Car</h1>
        <section className="w-[600px] m-auto bg-white p-4 rounded-2xl">
          <p className="mt-6 text-[#909090] text-2xl">Car Information</p>
          <Label htmlFor="car-image" className="mt-4">
            Car Image
          </Label>
          <Input
            type="file"
            placeholder="Upload car image"
            className="mt-2"
            name="car-image"
          />

          <Label htmlFor="car-name" className="mt-4">
            Car Name
          </Label>
          <Input
            type="text"
            placeholder="Enter car name"
            className="mt-2"
            name="car-name"
          />
          <div className="flex gap-4">
            <div className="w-1/2">
              <Label htmlFor="car-model" className="mt-4">
                Car Model
              </Label>
              <Input
                type="text"
                placeholder="Enter car model"
                className="mt-2"
                name="car-model"
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="car-year" className="mt-4">
                Car Year
              </Label>
              <Input
                type="text"
                placeholder="Enter car year"
                className="mt-2"
                name="car-year"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <Label htmlFor="car-type" className="mt-4">
                Car Type
              </Label>
              <Select>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select car type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Gasoline">Gasoline</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2">
              <Label htmlFor="Wheeler" className="mt-4 ">
                Wheeler Type
              </Label>
              <Select>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select wheeler type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="2 Wheeler">2 Wheeler</SelectItem>
                    <SelectItem value="4 Wheeler">4 Wheeler</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="mt-6 text-[#909090] text-2xl">Car Engine Details</p>

          <div className="flex gap-4">
            <div className="w-1/2">
              <Label htmlFor="Engine">Engine</Label>
              <Input
                type="text"
                placeholder="Enter engine details"
                className="mt-2 "
                name="Engine"
              />
            </div>
            <div className="w-1/2">
              <Label>Acceleration</Label>
              <Input
                type="text"
                placeholder="Enter acceleration details"
                className="mt-2"
                name="Acceleration"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <div className="w-1/2">
              <Label htmlFor="HorsePower">Horse Power</Label>
              <Input
                type="text"
                placeholder="Enter horse power details"
                className="mt-2 "
                name="HorsePower"
              />
            </div>
            <div className="w-1/2">
              <Label>Top Speed</Label>
              <Input
                type="text"
                placeholder="Enter top speed details"
                className="mt-2"
                name="TopSpeed"
              />
            </div>
          </div>

          <p className="mt-6 text-[#909090] text-2xl">
            Interior and Exterior Details
          </p>
          <Label className="mt-2">Seat</Label>
          <Input
            type="text"
            placeholder="Enter seat details"
            className="mt-2"
            name="Seat"
          />

          <Label className="mt-2">Color</Label>
          <Input
            type="text"
            placeholder="Enter color details"
            className="mt-2"
            name="Color"
          />

          <p className="mt-6 text-[#909090] text-2xl">
            Price and other Details
          </p>
          <Label className="mt-2">Price</Label>
          <Input
            type="text"
            placeholder="Enter price details"
            className="mt-2"
            name="Price"
          />

          <Label className="mt-2">Detail</Label>
          <Textarea
            placeholder="Enter  details"
            className="mt-2"
            name="Detail"
          />
  
          <Button className="mt-4 bg-[#00d20e] hover:bg-[#00d20e] text-white">
            Add Car
          </Button>
        </section>
      </main>
    </>
  );
};

export default Addcar;
