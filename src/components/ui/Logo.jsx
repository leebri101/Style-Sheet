import { ShoppingBag } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <ShoppingBag className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">STYLE</span>
      <span className="text-xl font-bold text-primary"> - </span>
      <span className="text-xl font-bold">SHEET</span>
    </div>
  );
}
