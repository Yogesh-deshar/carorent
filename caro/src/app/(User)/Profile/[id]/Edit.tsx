import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Edit = () => {
  return (
    <>
      <section>
        <form
          action=""
          className="w-[450px] gird object-center border border-[#DEDCDC] p-4 rounded-2xl"
        >
          <p className="text-2xl">Personal Information</p>
          <Label htmlFor="name">Name</Label>
          <Input type="text" />

          <Label htmlFor="name" className="mt-3">Email</Label>
          <Input type="text" />

          <Label htmlFor="name" className="mt-3">Phone Number</Label>
          <Input type="Number" maxLength={10} max={10} />

          <Label htmlFor="name" className="mt-3">
            Driving license
          </Label>
          <Input type="text" />

          <p className="text-2xl mt-3">Address</p>
          <Label htmlFor="name" className="mt-3">Country</Label>
          <Input type="text" />

          <Label htmlFor="name" className="mt-3 ">City</Label>
          <Input type="text" />

          <Button className="mt-3 bg-green-500 p-2 w-full">
            Save Changes
          </Button>
        </form>
      </section>
    </>
  );
};

export default Edit;
