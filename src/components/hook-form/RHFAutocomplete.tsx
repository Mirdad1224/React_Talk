import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { ReactNode } from "react";

interface IRHFAutocompleteProps {
  name: string;
  label: string;
  helperText?: ReactNode;
  multiple: boolean;
  freeSolo: boolean;
  options: string[];
  ChipProps: any;
}

export default function RHFAutocomplete<T extends IRHFAutocompleteProps>({
  name,
  label,
  helperText,
  ...other
}: T) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
