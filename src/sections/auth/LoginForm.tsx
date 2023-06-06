import { useState } from "react";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { Link as RouterLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeSlash } from "phosphor-react";
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  CustomTheme,
} from "@mui/material";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { LoginUser } from "../../redux/slices/auth";
import { RootState } from "../../redux/store";

type Inputs = {
  email: string;
  password: string;
};

export default function AuthLoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading } = useSelector((state: RootState) => state.auth);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "demo@tawk.com",
    password: "demo1234",
  };

  const methods = useForm<Inputs>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      dispatch(LoginUser(data) as unknown as AnyAction);
    } catch (error: any) {
      console.error(error);
      reset();
      setError("root.serverError", {
        //afterSubmit
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.root && <Alert severity="error">{errors.root.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to="/auth/reset-password"
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot password?
        </Link>
      </Stack>

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        disabled={isLoading}
        // loading={isLoading}
        sx={{
          bgcolor: "text.primary",
          color: (theme: CustomTheme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme: CustomTheme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Login
      </Button>
    </FormProvider>
  );
}
