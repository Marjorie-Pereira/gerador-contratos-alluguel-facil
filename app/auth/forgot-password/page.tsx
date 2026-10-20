"use client";
import InputField from "@/components/InputField";
import InputGroupField from "@/components/InputGroupField";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const resetPasswordSchema = z.object({
  email: z.email("E-mail inválido").nonempty("Preencha este campo"),
});

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });
  const resetPassword: SubmitHandler<
    z.infer<typeof resetPasswordSchema>
  > = async ({ email }) => {
    console.log(email);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/update-password",
    });
  };
  return isSubmitted ? (
    <div className="m-auto max-w-1/3 text-center">
      <h1 className="text-blue-950 text-xl font-semibold mb-10">
        Verifique sua caixa de entrada e siga as instruções
      </h1>
    </div>
  ) : (
    <div className="m-auto bg-white max-w-1/3 shadow-md px-10 py-10 border-b border-zinc-300">
      <h1 className="text-blue-950 text-2xl font-semibold mb-10">
        Insira seu email para criar nova senha
      </h1>
      <form onSubmit={handleSubmit(resetPassword)}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <InputGroupField
              icon={<Mail />}
              id={field.name}
              inputProps={{ ...field, disabled: isSubmitting }}
              label="e-mail"
              placeholder="seu@email.com.br"
              className="mb-4"
              invalid={fieldState.invalid}
              errors={[fieldState.error]}
            />
          )}
        />

        <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
          ENVIAR
        </Button>
      </form>
    </div>
  );
}
