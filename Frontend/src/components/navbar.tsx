import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-around items-center p-4 w-full font-semibold bg-slate-200 mb-5 stick top-0 max-md:flex-col max-md:gap-5">
      <h1 className="flex items-center max-md:basis-full">
        Bienvenue
        <span className="material-symbols-outlined pl-2 text-yellow-500">
          waving_hand
        </span>
      </h1>
      <Link to={"/generate"}>
        <button className="flex items-center max-md:basis-full">
          <span className="material-symbols-outlined pr-2">qr_code_2_add</span>
          Generateur de QR code
        </button>
      </Link>
      <Link to={"/scan"}>
        <button className="flex items-center max-md:basis-full">
          <span className="material-symbols-outlined pr-2">
            qr_code_scanner
          </span>
          Scanner un QR code
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
