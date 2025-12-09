// inside Navbar.jsx or a Logo component
import { Link } from 'react-router';
import logoImg from '../../../src/assets/UrbanPulsLogo-removebg-preview.png';
const UrbanPulseLogo = () => (
<Link to="/">
    <div className="flex items-center space-x-2 cursor-pointer p-2">
   <img className="w-10 h-10" src={logoImg} alt="" />
        <span className="text-2xl font-bold -mb-2.5">
            <span className="text-[#2c4a5e]">Urban</span>
            <span className="text-[#ea6540]">Pulse</span>
        </span>
    </div>
</Link>
);

export default UrbanPulseLogo