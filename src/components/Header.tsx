import { useThemeStore } from "@/stores/themeStore";

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Current theme: {theme}</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default Header;
