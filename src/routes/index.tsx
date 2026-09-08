import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/Button";
import { BrandMark, FormCard, PageFootnote, PageShell } from "@/components/FormCard";
import { InputField } from "@/components/InputField";
import { PasswordField } from "@/components/PasswordField";
import { SuccessMessage } from "@/components/SuccessMessage";
import { ValidationMessage } from "@/components/ValidationMessage";
import { useAuth } from "@/hooks/use-auth";
import { getFriendlyFirebaseErrorMessage } from "@/lib/firebase";
import { validateEmail, validateName, validatePassword } from "@/lib/validation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Create Your Account — YugamInternational School" },
      {
        name: "description",
        content:
          "Register for YugamInternational School: name, email and password with live inline validation.",
      },
      { property: "og:title", content: "Create Your Account — YugamInternational School" },
      {
        property: "og:description",
        content: "Register for YugamInternational School with live inline validation.",
      },
    ],
  }),
  component: RegisterPage,
});

type Errors = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  general?: string | null;
};

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof values, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const validateAll = (): Errors => ({
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  });

  const setField = (key: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, general: null }));
    if (touched[key] === true) {
      const check = { name: validateName, email: validateEmail, password: validatePassword }[key];
      setErrors((prev) => ({ ...prev, [key]: check(value) }));
    }
  };

  const blur = (key: keyof typeof values) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const check = { name: validateName, email: validateEmail, password: validatePassword }[key];
    setErrors((prev) => ({ ...prev, [key]: check(values[key]) }));
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validateAll();
    setErrors(next);
    setTouched({ name: true, email: true, password: true });
    if (next.name || next.email || next.password) return;

    setLoading(true);
    try {
      await register(values.name, values.email, values.password);
      setRegistered(true);
      setLoading(false);
      setTimeout(() => navigate({ to: "/details" }), 800);
    } catch (err: unknown) {
      setLoading(false);
      const friendlyMsg = getFriendlyFirebaseErrorMessage(err);
      if (
        friendlyMsg.toLowerCase().includes("email") ||
        (typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "auth/email-already-in-use")
      ) {
        setErrors((prev) => ({ ...prev, email: friendlyMsg }));
      } else if (
        friendlyMsg.toLowerCase().includes("password") ||
        (typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "auth/weak-password")
      ) {
        setErrors((prev) => ({ ...prev, password: friendlyMsg }));
      } else {
        setErrors((prev) => ({ ...prev, general: friendlyMsg }));
      }
    }
  }

  return (
    <PageShell>
      <BrandMark tag="SSE Console" />
      <FormCard
        title="Create Your Account"
        description="Set up your credentials. What you enter here carries through to the details step."
        banner={
          registered ? (
            <SuccessMessage
              title="Account created"
              description="Taking you to your details for a final validation pass."
            />
          ) : undefined
        }
      >
        {errors.general ? (
          <div className="mb-4">
            <ValidationMessage message={errors.general} />
          </div>
        ) : null}

        <form className="mt-6 space-y-4" noValidate onSubmit={handleSubmit}>
          <InputField
            id="reg-name"
            label="Name"
            placeholder="e.g. Khushal Verma"
            autoComplete="name"
            value={values.name}
            error={touched.name ? errors.name : null}
            valid={touched.name && !errors.name}
            onChange={(e) => setField("name")(e.target.value)}
            onBlur={blur("name")}
            disabled={loading || registered}
          />
          <InputField
            id="reg-email"
            label="Email"
            type="email"
            inputMode="email"
            spellCheck={false}
            placeholder="you@company.com"
            autoComplete="email"
            value={values.email}
            error={touched.email ? errors.email : null}
            valid={touched.email && !errors.email}
            onChange={(e) => setField("email")(e.target.value)}
            onBlur={blur("email")}
            disabled={loading || registered}
          />
          <PasswordField
            id="reg-password"
            label="Password"
            placeholder="At least one letter and one number"
            value={values.password}
            error={touched.password ? errors.password : null}
            hint={touched.password && !errors.password ? undefined : "Mix letters and numbers."}
            onChange={(e) => setField("password")(e.target.value)}
            onBlur={blur("password")}
            disabled={loading || registered}
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              loadingText="Creating account"
              disabled={registered}
            >
              Register
            </Button>
          </div>
        </form>
      </FormCard>
      <PageFootnote>
        Protected with Firebase Authentication. Step 1 of 2.
      </PageFootnote>
    </PageShell>
  );
}
