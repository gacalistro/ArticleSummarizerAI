import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="w-full py-3">
      <nav className="flex items-center justify-between mb-6">
        <Logo />

        <a
          href="https://github.com/gahcalistro"
          target="_blank"
          className="px-3 py-1 font-medium text-gray-100 tracking-wider bg-gray-900 rounded-full hover:border hover:border-gray-900 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
        >
          Github
        </a>
      </nav>
    </header>
  );
}
