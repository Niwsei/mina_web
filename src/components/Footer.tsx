export function Footer(){
  return (
    <footer className="border-t">
      <div className="container py-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span>© {new Date().getFullYear()} YourCafe</span>
        <span className="text-[var(--muted)]">
          เปิด 8:00–21:00 • <a className="underline" href="https://maps.google.com" target="_blank" rel="noreferrer">ดูแผนที่</a>
        </span>
      </div>
    </footer>
  );
}