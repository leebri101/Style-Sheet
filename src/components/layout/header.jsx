import { Dialog, DialogPanel } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart, Heart, Globe } from 'lucide-react';
import './Header.css';

const Header= () => {
    const[mobileMenuOpen, setMobileMenuOpen] = useState(false)
    {/* 
    const cartItemsCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0))*/}
    const navigation = [
        { name: 'WOMEN', href: '/women' },
        { name: 'MENs', href: '/mens' },
        { name: 'KIDS', href: '/kids' },
    ]

    return(
        <header className="header">
            <nav className="header-nav" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="header-logo">
                    <span className="sr-only">Style</span>
                    <div>-Sheet</div>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button type="button" className="header-mobile-menu-button" onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open Main Menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                        key={item.name}
                        to={item.href}
                        className="text-sm font-semibold leading-text-gray-900 hover:text-gray-600"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link to="/login" className="text-sm font-semibold leading-text-gray-900 hover:text-gray-600">
                    Login 
                    </Link>
                    <Link to="/register" className="text-sm font-semibold leading-text-gray-900 hover:text-gray-600">
                    Register
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
                    <button className="text-gray-700 hover:text-900">
                        <Globe className="h-6 w-6"/>
                    </button>
                    <button className="text-gray-700 hover:text-900">
                        <Globe className="h-6 w-6"/>
                    </button>
                    <Link to="/cart" className="text-gray-700 hover:text-gary-900 relative">
                    {/* Shopping Cart indicator to display item count 
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                            {cartItemsCount}
                        </span>
                    )}*/}
                    </Link>
                </div>
            </nav>
            <Dialog as="div" className="mobile-menu" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}/>
                <div className="fixed inset-0 z-10">
                    <DialogPanel className="mobile-menu-panel"/>
                    <div className="flex items-center justify-between">
                        <Link to="/" className="header-logo">
                            <span className="sr-only">Style - </span>
                            <div>SHEET</div>
                        </Link>
                        <button type="button" className="header-mobile-menu-close-button" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Close Menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">

                        </div>
                    </div>
                </div>
        </header>
    )
}
