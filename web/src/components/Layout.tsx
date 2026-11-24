import { Link, NavLink } from "react-router-dom";
import { useCart } from "../stores/cart";
export function Layout({ children }: { children: React.ReactNode }) { const items = useCart(s => s.items); return <div className="site-shell"><header className="topbar"><Link to="/" className="wordmark">Uniform<em>Nepal</em></Link><nav className="nav-links"><NavLink to="/">Home</NavLink><NavLink to="/catalog">Uniforms</NavLink><NavLink to="/products/summer-dress">Try on</NavLink><NavLink to="/cart" className="cart-pill">{items.length}</NavLink></nav></header><main className="app-main">{children}</main></div> }

