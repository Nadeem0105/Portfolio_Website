import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0B] text-[#F0EAD6] font-mono p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#D4961A]">404 - PAGE_NOT_FOUND</h2>
      <p className="text-xs text-[#8A8A96] mb-6">The requested module could not be resolved.</p>
      <Link
        href="/"
        className="px-4 py-2 border border-[#D4961A] text-[#D4961A] rounded hover:bg-[#D4961A]/10 transition-colors text-xs font-bold"
      >
        RETURN_TO_BASE
      </Link>
    </div>
  );
}
