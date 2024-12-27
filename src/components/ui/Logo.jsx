import { ShoppingBag } from 'lucide-react';
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo flex items-center space-x-2">
      <span className="text-xl font-bold">STYLE</span>
      <ShoppingBag className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">SHEET</span>
    </div>
  );
}
