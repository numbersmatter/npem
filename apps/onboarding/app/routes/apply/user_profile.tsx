import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

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
      <div
        className="overflow-hidden bg-white/80 sm:rounded-lg shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold mb-6 text-emerald-800 dark:text-emerald-200 text-center">
          User Profile
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
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
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-emerald-200 dark:border-emerald-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100"
            />
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
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-emerald-200 dark:border-emerald-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100"
            />
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
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-emerald-200 dark:border-emerald-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100"
            />
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
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-emerald-200 dark:border-emerald-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100"
            />
          </div>
          <Button type="submit" size="lg" className="w-full mt-4">
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
}