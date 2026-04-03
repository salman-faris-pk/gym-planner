import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


type Option = {
  value: string;
  label: string;
};

type FormSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
};

export function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs tracking-wide font-light text-white/90">
        {label}
      </Label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full mt-2 text-xs border-amber-50/20 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent position="popper" className="max-h-52 bg-black/85">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}