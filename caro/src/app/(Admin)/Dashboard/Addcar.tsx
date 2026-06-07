"use client";

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
import { useState } from "react";

const Addcar = () => {
  const [formData, setFormData] = useState({
    VehiclesName: "",
    VehiclesModel: "",
    VehiclesYear: "",
    VehiclesType: "",
    VehiclesWheel: "",
    VehiclesEngine: "",
    VehiclesAcceleration: "",
    VehiclesTopspeed: "",
    VehiclesSeat: "",
    VehiclesColor: "",
    VehiclesPrice: "",
    VehiclesDetails: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (!image) {
        setError("Please select an image");
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append("image", image);
      form.append("VehiclesName", formData.VehiclesName);
      form.append("VehiclesModel", formData.VehiclesModel);
      form.append("VehiclesYear", formData.VehiclesYear);
      form.append("VehiclesType", formData.VehiclesType);
      form.append("VehiclesWheel", formData.VehiclesWheel);
      form.append("VehiclesEngine", formData.VehiclesEngine);
      form.append("VehiclesAcceleration", formData.VehiclesAcceleration);
      form.append("VehiclesTopspeed", formData.VehiclesTopspeed);
      form.append("VehiclesSeat", formData.VehiclesSeat);
      form.append("VehiclesColor", formData.VehiclesColor);
      form.append("VehiclesPrice", formData.VehiclesPrice);
      form.append("VehiclesDetails", formData.VehiclesDetails);

      const response = await fetch(
        "http://localhost:8000/api/vehicles/register",
        {
          method: "POST",
          body: form,
        },
      );

      let result;
      try {
        result = await response.json();
        console.log("Response:", result);
      } catch (parseError) {
        const text = await response.text();
        console.error("Response text:", text);
        throw new Error(`Server error: ${text}`);
      }

      if (!response.ok) {
        throw new Error(
          result.message || `Failed to add vehicle: ${response.status}`,
        );
      }

      setMessage("Vehicle added successfully!");
      setFormData({
        VehiclesName: "",
        VehiclesModel: "",
        VehiclesYear: "",
        VehiclesType: "",
        VehiclesWheel: "",
        VehiclesEngine: "",
        VehiclesAcceleration: "",
        VehiclesTopspeed: "",
        VehiclesSeat: "",
        VehiclesColor: "",
        VehiclesPrice: "",
        VehiclesDetails: "",
      });
      setImage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <h1 className="text-2xl font-bold mb-4">Add Car</h1>
        <section className="w-[600px] m-auto bg-white p-4 rounded-2xl">
          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <p className="mt-6 text-[#909090] text-2xl">Car Information</p>
            <Label htmlFor="car-image" className="mt-4">
              Car Image
            </Label>
            <Input
              type="file"
              placeholder="Upload car image"
              className="mt-2"
              id="car-image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />

            <Label htmlFor="VehiclesName" className="mt-4">
              Car Name
            </Label>
            <Input
              type="text"
              placeholder="Enter car name"
              className="mt-2"
              name="VehiclesName"
              value={formData.VehiclesName}
              onChange={handleInputChange}
              required
            />
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="VehiclesModel" className="mt-4">
                  Car Model
                </Label>
                <Input
                  type="text"
                  placeholder="Enter car model"
                  className="mt-2"
                  name="VehiclesModel"
                  value={formData.VehiclesModel}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="VehiclesYear" className="mt-4">
                  Car Year
                </Label>
                <Input
                  type="text"
                  placeholder="Enter car year"
                  className="mt-2"
                  name="VehiclesYear"
                  value={formData.VehiclesYear}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="VehiclesType" className="mt-4">
                  Car Type
                </Label>
                <Select
                  value={formData.VehiclesType}
                  onValueChange={(value) =>
                    handleSelectChange("VehiclesType", value)
                  }
                >
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
                <Label htmlFor="VehiclesWheel" className="mt-4">
                  Wheeler Type
                </Label>
                <Select
                  value={formData.VehiclesWheel}
                  onValueChange={(value) =>
                    handleSelectChange("VehiclesWheel", value)
                  }
                >
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Select wheeler type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2">2 Wheeler</SelectItem>
                      <SelectItem value="4">4 Wheeler</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="mt-6 text-[#909090] text-2xl">Car Engine Details</p>

            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="VehiclesEngine">Engine</Label>
                <Input
                  type="text"
                  placeholder="Enter engine details"
                  className="mt-2 "
                  name="VehiclesEngine"
                  value={formData.VehiclesEngine}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="VehiclesAcceleration">Acceleration</Label>
                <Input
                  type="text"
                  placeholder="Enter acceleration details"
                  className="mt-2"
                  name="VehiclesAcceleration"
                  value={formData.VehiclesAcceleration}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <div className="w-1/2">
                <Label htmlFor="VehiclesTopspeed">Top Speed</Label>
                <Input
                  type="text"
                  placeholder="Enter top speed details"
                  className="mt-2 "
                  name="VehiclesTopspeed"
                  value={formData.VehiclesTopspeed}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="VehiclesSeat">Seat</Label>
                <Input
                  type="text"
                  placeholder="Enter seat details"
                  className="mt-2"
                  name="VehiclesSeat"
                  value={formData.VehiclesSeat}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <p className="mt-6 text-[#909090] text-2xl">
              Interior and Exterior Details
            </p>

            <Label htmlFor="VehiclesColor" className="mt-2">
              Color
            </Label>
            <Input
              type="text"
              placeholder="Enter color details"
              className="mt-2"
              name="VehiclesColor"
              value={formData.VehiclesColor}
              onChange={handleInputChange}
              required
            />

            <p className="mt-6 text-[#909090] text-2xl">
              Price and other Details
            </p>
            <Label htmlFor="VehiclesPrice" className="mt-2">
              Price
            </Label>
            <Input
              type="text"
              placeholder="Enter price details"
              className="mt-2"
              name="VehiclesPrice"
              value={formData.VehiclesPrice}
              onChange={handleInputChange}
              required
            />

            <Label htmlFor="VehiclesDetails" className="mt-2">
              Detail
            </Label>
            <Textarea
              placeholder="Enter details"
              className="mt-2"
              name="VehiclesDetails"
              value={formData.VehiclesDetails}
              onChange={handleInputChange}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[#00d20e] hover:bg-[#00d20e] text-white disabled:opacity-50"
            >
              {loading ? "Adding Car..." : "Add Car"}
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Addcar;
