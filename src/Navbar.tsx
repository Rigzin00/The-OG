import { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-sm transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          width: isScrolled ? '120px' : 'auto',
          padding: isScrolled ? '12px 16px' : '12px 24px'
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0"></div>

          <span className={`font-medium text-gray-900 whitespace-nowrap transition-all duration-500 ease-in-out ${
            isScrolled ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'
          }`}>
            Joseph Alexander
          </span>

          <div className={`flex items-center gap-6 transition-all duration-500 ease-in-out ${
            isScrolled ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'
          }`} style={{ overflow: 'hidden' }}>
            <a href="#work" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Work
            </a>
            <a href="#services" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Services
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Pricing
            </a>
            <a href="#blog" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Blog
            </a>
            <button className="px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-900 hover:border-gray-300 transition-colors">
              Contact
            </button>
          </div>

          <div className={`flex items-center gap-1.5 transition-all duration-500 ease-in-out ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
