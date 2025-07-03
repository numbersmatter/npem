import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function UserProfile() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: handle form submission (API call, etc.)
    alert("Profile submitted!\n" + JSON.stringify(form, null, 2));
  }

  return (
    <div className="container mx-auto max-w-4xl px-0 py-4 sm:px-6 lg:px-8">
      <ProfileCard>
        <PersonalInfoForm />
      </ProfileCard>
    </div>
  );
}

{/* <div className="overflow-hidden bg-white/80 sm:rounded-lg shadow-lg  dark:bg-emerald-950/80">
  <div className="px-4 py-5 sm:px-6">
    <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 text-center">
      Personal Information
    </h1>
  </div>
  <div className="px-4 py-5 sm:p-6">

    <PersonalInfoForm />
  </div>
</div> */}

function ProfileCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="bg-white/80 dark:bg-emerald-950/80 shadow-lg p-6">
      {children}
    </Card>
  );
}




function PersonalInfoForm() {
  return <form className="grid grid-cols-1 gap-6 md:grid-cols-2" >
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right">
        Name
      </Label>
      <Input
        id={"id"}
        key={"key"}
        name={"name"}
        // defaultValue={fields.name.initialValue}
        className="col-span-3 max-w-sm"
      />
      {/* <div className="col-span-3 col-start-2">
        {fields.name.errors &&
          fields.name.errors.map((error, index) => (
            <p key={index} className="text-sm text-red-500">
              {error}
            </p>
          ))}
      </div> */}
    </div>

    <div>
      <label
        htmlFor="firstName"
        className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1"
      >
        First Name
      </label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        required
        className="w-full rounded-md border border-emerald-200 dark:border-emerald-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100" />
    </div>
    <div>
      <label
        htmlFor="lastName"
        className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1"
      >
        Last Name
      </label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        required
        className="w-full rounded-md border border-emerald-200 dark:border-emerald-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100" />
    </div>
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1"
      >
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className="w-full rounded-md border border-emerald-200 dark:border-emerald-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100" />
    </div>
    <div>
      <label
        htmlFor="phone"
        className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1"
      >
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        required
        className="w-full rounded-md border border-emerald-200 dark:border-emerald-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100" />
    </div>
    <Button type="submit" size="lg" className="w-full mt-4">
      Save Profile
    </Button>
  </form>;
}
