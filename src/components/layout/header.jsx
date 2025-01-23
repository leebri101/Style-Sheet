import { Menu, Search, ShoppingCart, Heart, Globe } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header= () =>{
    const[mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
                    <Link to="/cart"
                </div>
            </nav>
        </header>
    )
}
