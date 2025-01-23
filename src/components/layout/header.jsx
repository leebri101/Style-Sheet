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
            <nav className=''>

            </nav>
        </header>
    )
}
