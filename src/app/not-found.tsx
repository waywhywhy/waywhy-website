import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-32 text-center">
      <p className="text-sm font-semibold tracking-wide text-accent-hover uppercase">404</p>
      <h1 className="mt-2 text-4xl font-bold">This page doesn&apos;t exist</h1>
      <p className="mt-3 text-fg-2">It may have moved, or the link may be wrong.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/docs" variant="ghost">
          Documentation
        </ButtonLink>
      </div>
    </div>
  );
}
