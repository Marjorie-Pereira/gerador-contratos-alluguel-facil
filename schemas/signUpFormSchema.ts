import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.email("E-mail inválido").nonempty("Preencha este campo"),
  password: z.string().min(8, "Deve ter no mínimo 8 caracteres"),
  keepLogged: z.boolean().optional(),
});

export type loginFormData = z.infer<typeof loginFormSchema>;

// export const signUpFormSchema = z.object({
//   email: z.email("E-mail inválido").nonempty("Preencha este campo"),
//   password: z.string().min(8, "Deve ter no mínimo 8 caracteres"),
//   keepLogged: z.boolean().optional(),
// });

// export type signUpFormData = z.infer<typeof signUpFormSchema>;
