import { ReactNode } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

interface IFormProviderProps {
  children: ReactNode;
  onSubmit: () => void;
  methods: UseFormReturn<any, any>;
}

export default function FormProvider({
  children,
  onSubmit,
  methods,
}: IFormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
