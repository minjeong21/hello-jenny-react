export const MainTheme = ({
  themes,
}: {
  themes: { display_name: string; name: string; id: number }[];
}) => {
  const targetThemes = themes.length > 2 ? themes.splice(0, 2) : themes;

  return (
    <div className="flex">
      {targetThemes.map((theme, index) => (
        <div key={index} className="text-sm text-gray-500 pb-1 pr-1 flex-wrap">
          {theme.display_name}
        </div>
      ))}
    </div>
  );
};

export default MainTheme;
