import logoCeub from "/logo-ceub.png";

const Header = () => {
  return (
    <header className="bg-[linear-gradient(to_right,_#9A238B_51%,_#340C2F_100%)] text-white w-full px-4 py-3">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-2">
        <div className="flex items-center gap-4">
          <img src={logoCeub} alt="CEUB Logo" className="h-12 w-auto" />
          <h1 className="text-white text-xl md:text-2xl font-semibold">
            Núcleo de Esportes
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
