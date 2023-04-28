import LogoIcon from "../assets/logo.svg";

export function Logo() {
  return (
    <div className="flex items-center gap-1 pointer-events-none">
      <img src={LogoIcon} className="w-10" />
      <span className="font-bold text-xl text-orange-theme">Sumz</span>
    </div>
  );
}
