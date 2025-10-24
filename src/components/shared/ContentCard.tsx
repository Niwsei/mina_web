import type { PropsWithChildren } from "react";

export function ContentCard({
  image,
  badge,
  header,
  footer,
  children,
}: PropsWithChildren<{
  image?: React.ReactNode;
  badge?: string;
  header: React.ReactNode;
  footer: React.ReactNode;
}>) {
  return (
    <article className="content-card">
      {image}
      <div className="content-card-body">
        <div className="relative">
          {badge && <span className="content-card-badge">{badge}</span>}
          <header className="flex items-start justify-between gap-3 mt-4">{header}</header>
        </div>
        {children}
        <div className="content-card-footer">{footer}</div>
      </div>
    </article>
  );
}
