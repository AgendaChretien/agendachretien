import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl flex-col font-bold underline text-primary flex gap-4">
        Hello world!
        <button className="btn btn-primary btn-outline">Click me!</button>
      </h1>
    </div>
  );
}
