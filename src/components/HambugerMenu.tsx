const HamberMenu = ({
  open,
  toggleMenu,
}: {
  open: boolean;
  toggleMenu: () => void;
}) => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col justify-center rounded">
        <div className="relative sm:max-w-xl mx-auto">
          <nav x-data="{ open: false }">
            <button
              className="text-gray-500 w-9 h-9 relative focus:outline-none bg-white rounded"
              onClick={toggleMenu}
            >
              <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                    open ? "rotate-45" : " -translate-y-1.5"
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-200 ease-in-out ${
                    open ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-200 ease-in-out ${
                    open ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HamberMenu;
