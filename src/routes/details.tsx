import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/Button";
import { BrandMark, FormCard, PageFootnote, PageShell } from "@/components/FormCard";
import { InputField } from "@/components/InputField";
import { PasswordField } from "@/components/PasswordField";
import { SuccessMessage } from "@/components/SuccessMessage";
import { LogoutIcon } from "@/components/ui/icons";
import { useAuth } from "@/hooks/use-auth";
import {
  DEMO_MOBILE,
  DEMO_USERNAME,
  readInMemorySession,
  saveInMemorySession,
  type SessionUser,
} from "@/lib/session";
import {
  validateEmail,
  validateMobile,
  validateName,
  validatePassword,
  validateUsername,
} from "@/lib/validation";

export const Route = createFileRoute("/details")({
  head: () => ({
    meta: [
      { title: "Details & Validation — YugamInternational School" },
      {
        name: "description",
        content:
          "Review and validate your profile: name, password, mobile number, username and email.",
      },
      { property: "og:title", content: "Details & Validation — YugamInternational School" },
      {
        property: "og:description",
        content: "Review and validate your profile fields before continuing.",
      },
    ],
  }),
  component: DetailsPage,
});

const CHECKS = {
  name: validateName,
  password: validatePassword,
  mobile: validateMobile,
  username: validateUsername,
  email: validateEmail,
} as const;

type FieldKey = keyof typeof CHECKS;
type Errors = Partial<Record<FieldKey, string | null>>;

function DetailsPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth();

  const [values, setValues] = useState<SessionUser>(() => {
    const session = readInMemorySession();
    return {
      name: session?.name ?? "",
      password: session?.password ?? "",
      mobile: session?.mobile ?? DEMO_MOBILE,
      username: session?.username ?? DEMO_USERNAME,
      email: session?.email ?? "",
    };
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);

  // Protected Route Check: redirect unauthenticated users to the registration page
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Sync profile data when user changes or session is restored
  useEffect(() => {
    const session = readInMemorySession();
    if (session) {
      setValues((prev) => ({
        ...prev,
        name: session.name || prev.name,
        email: session.email || prev.email,
        password: session.password || prev.password,
        mobile: session.mobile || prev.mobile || DEMO_MOBILE,
        username: session.username || prev.username || DEMO_USERNAME,
      }));
    } else if (user) {
      setValues((prev) => ({
        ...prev,
        name: user.displayName ?? prev.name,
        email: user.email ?? prev.email,
        mobile: prev.mobile || DEMO_MOBILE,
        username: prev.username || DEMO_USERNAME,
      }));
    }
  }, [user]);

  const setField = (key: FieldKey) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setValidated(false);
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: CHECKS[key](value) }));
    }
  };

  const blur = (key: FieldKey) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: CHECKS[key](values[key]) }));
  };

  async function handleValidate(event: FormEvent) {
    event.preventDefault();
    const next: Errors = {
      name: validateName(values.name),
      password: validatePassword(values.password),
      mobile: validateMobile(values.mobile),
      username: validateUsername(values.username),
      email: validateEmail(values.email),
    };

    setErrors(next);
    setTouched({ name: true, password: true, mobile: true, username: true, email: true });

    if (Object.values(next).some(Boolean)) {
      setValidated(false);
      return;
    }

    setValidating(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    saveInMemorySession(values);
    setValidating(false);
    setValidated(true);
  }

  async function handleLogout() {
    await logout();
    navigate({ to: "/" });
  }

  const fieldState = (key: FieldKey) => ({
    error: touched[key] ? errors[key] : null,
    valid: Boolean(touched[key]) && !errors[key],
  });

  if (authLoading) {
    return (
      <PageShell>
        <BrandMark tag="Step 2 of 2" />
        <FormCard
          title="Detail & Validation"
          description="Checking authentication status..."
        >
          <div className="py-12 text-center text-sm text-muted-foreground">
            Loading profile...
          </div>
        </FormCard>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <BrandMark tag="Step 2 of 2" />
      <FormCard
        title="Detail & Validation"
        description="Values carried from registration are prefilled. Correct any field, then run the validation pass."
        banner={
          validated ? (
            <SuccessMessage
              title="Credentials validated"
              description="All 5 fields passed. You can review or edit before logging out."
            />
          ) : undefined
        }
      >
        <form className="mt-6 space-y-4" noValidate onSubmit={handleValidate}>
          <InputField
            id="d-name"
            label="Name"
            spellCheck={false}
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField("name")(e.target.value)}
            onBlur={blur("name")}
            {...fieldState("name")}
          />
          <PasswordField
            id="d-password"
            label="Password"
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => setField("password")(e.target.value)}
            onBlur={blur("password")}
            {...fieldState("password")}
          />
          <InputField
            id="d-mobile"
            label="Mobile Number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel"
            value={values.mobile}
            onChange={(e) => setField("mobile")(e.target.value)}
            onBlur={blur("mobile")}
            {...fieldState("mobile")}
          />
          <InputField
            id="d-username"
            label="Username"
            spellCheck={false}
            autoComplete="username"
            value={values.username}
            onChange={(e) => setField("username")(e.target.value)}
            onBlur={blur("username")}
            {...fieldState("username")}
          />
          <InputField
            id="d-email"
            label="Email"
            type="email"
            inputMode="email"
            spellCheck={false}
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField("email")(e.target.value)}
            onBlur={blur("email")}
            {...fieldState("email")}
          />

          <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handleLogout}
              icon={<LogoutIcon className="size-4 shrink-0" />}
            >
              Logout
            </Button>
            <Button type="submit" loading={validating} loadingText="Validating">
              Validate
            </Button>
          </div>
        </form>
      </FormCard>
      <PageFootnote>
        Protected with Firebase Authentication. Step 2 of 2.
      </PageFootnote>
    </PageShell>
  );
}
