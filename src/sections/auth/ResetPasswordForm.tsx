import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { ForgotPassword } from "../../redux/slices/auth";
import { RootState } from "../../redux/store";

type Inputs = {
  email: string;
};

export default function AuthResetPasswordForm() {
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm<Inputs>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "demo@tawk.com" },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      //   Send API Request
      dispatch(ForgotPassword(data) as unknown as AnyAction);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" />

      <Button
        // loading={isLoading}
        disabled={isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Send Request
      </Button>
    </FormProvider>
  );
}
