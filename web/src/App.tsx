import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home"; import { Catalog } from "./pages/Catalog"; import { Product } from "./pages/Product"; import { Cart } from "./pages/Cart"; import { Checkout } from "./pages/Checkout"; import { OrderStatus } from "./pages/OrderStatus"; import { Admin } from "./pages/Admin";
export default function App() { return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/catalog" element={<Catalog/>}/><Route path="/products/:id" element={<Product/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/orders/:id" element={<OrderStatus/>}/><Route path="/admin" element={<Admin/>}/></Routes></Layout> }

