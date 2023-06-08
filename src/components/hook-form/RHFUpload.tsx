import { useFormContext, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { UploadAvatar } from "../upload";

interface RHFUploadAvatarProps {
  name: string;
  maxSize: number;
  onDrop: (acceptedFiles: any) => void;
}

export function RHFUploadAvatar({ name, ...other }: RHFUploadAvatarProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadAvatar
            accept={{
              "image/*": [],
            }}
            error={!!error}
            file={field.value}
            {...other}
          />

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
