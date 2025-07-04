import React, { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
};

const initialData: FormData = {
  firstName: "",
  lastName: "",
  address: "",
  email: "",
};

const steps = [
  "Name",
  "Address",
  "Email",
  "Review",
];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    alert("Submitted!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold mb-4">Step {step + 1}: {steps[step]}</h2>

      {step === 0 && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name</label>
            <input
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <label className="block mb-1">Address</label>
          <input
            name="address"
            value={data.address}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-2">
          <div>
            <strong>First Name:</strong> {data.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {data.lastName}
          </div>
          <div>
            <strong>Address:</strong> {data.address}
          </div>
          <div>
            <strong>Email:</strong> {data.email}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prev}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}