import { useTryOn } from "../../stores/tryon";
const colours: Record<string, string> = { White: "#fff", "Sky blue": "#bde9fa", Navy: "#13294b", Grey: "#5a6470", Maroon: "#7b2639" };
export function LayeredViewer() {
  const { selected, view } = useTryOn(); const has = (id: string) => selected.find(x => x.id === id); const c = (id: string) => colours[has(id)?.colour ?? "Navy"];
  return <svg viewBox="0 0 300 430" role="img" aria-label={`Student in ${view} uniform`} className="h-full w-full max-h-[470px]">
    <defs><linearGradient id="skin" x1="0" x2="1"><stop stopColor="#b87a53"/><stop offset="1" stopColor="#d49a6a"/></linearGradient></defs>
    <rect width="300" height="430" rx="24" fill="#dceafb"/>
    <ellipse cx="150" cy="400" rx="105" ry="14" fill="#b5c9df"/>
    <circle cx="150" cy="73" r="41" fill="url(#skin)"/><path d="M110 60c5-38 72-37 81 3-22-16-57-19-81-3" fill="#1a1720"/>
    <path d="M128 104h44v28h-44z" fill="url(#skin)"/>
    {has("shirt") && <path d="M98 126 L128 112 H172 L202 126 L190 265 H110 Z" fill={c("shirt")} stroke="#b8c1ca" strokeWidth="2"/>}
    {has("trousers") && <><path d="M111 258 H150 V390 H112 Z" fill={c("trousers")}/><path d="M150 258 H189 V390 H151 Z" fill={c("trousers")}/></>}
    {has("tie") && <path d="M139 124h22l-4 22 10 57-17 18-17-18 10-57z" fill={c("tie")} stroke="#0a1930" strokeWidth="1"/>}
    {has("sweater") && <><path d="M96 126l34-14h40l34 14-10 142h-88z" fill={c("sweater")} opacity=".94"/><path d="M130 112l20 35 20-35" fill="#dceafb"/></>}
    {has("blazer") && <><path d="M95 128l34-16h42l34 16-12 143h-86z" fill={c("blazer")} opacity=".96"/><path d="M129 112l21 38 21-38" fill="#dceafb"/><circle cx="174" cy="209" r="3" fill="#f5a623"/></>}
    <path d="M105 389h46v11h-51zM150 389h45l5 11h-50z" fill="#25272b"/>
  </svg>;
}

