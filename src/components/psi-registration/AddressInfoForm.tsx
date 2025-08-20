
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddressInfoFormProps {
  fullAddress: string;
  city: string;
  zipCode: string;
  setFullAddress: (value: string) => void;
  setCity: (value: string) => void;
  setZipCode: (value: string) => void;
  onComplete: () => void;
}

export const AddressInfoForm = ({
  fullAddress,
  city,
  zipCode,
  setFullAddress,
  setCity,
  setZipCode,
  onComplete
}: AddressInfoFormProps) => {
  return (
    <form className="space-y-4 md:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullAddress">Full address</Label>
        <Input
          id="fullAddress"
          value={fullAddress}
          onChange={(e) => setFullAddress(e.target.value)}
          className="rounded-md h-11 md:h-12"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger id="city" className="rounded-md h-11 md:h-12">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lagos">Lagos</SelectItem>
            <SelectItem value="abuja">Abuja</SelectItem>
            <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
            <SelectItem value="kano">Kano</SelectItem>
            <SelectItem value="ibadan">Ibadan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="zipCode">Zip code</Label>
        <Select value={zipCode} onValueChange={setZipCode}>
          <SelectTrigger id="zipCode" className="rounded-md h-11 md:h-12">
            <SelectValue placeholder="Select a zip code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="23401">23401</SelectItem>
            <SelectItem value="90001">90001</SelectItem>
            <SelectItem value="10001">10001</SelectItem>
            <SelectItem value="60601">60601</SelectItem>
            <SelectItem value="30301">30301</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button
        type="button"
        onClick={onComplete}
        className="w-full bg-[#0D264B] text-white py-5 md:py-6 rounded-md mt-4"
        disabled={!fullAddress || !city || !zipCode}
      >
        Complete registration
      </Button>
    </form>
  );
};
