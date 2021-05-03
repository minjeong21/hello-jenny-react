export const MainTheme = ({
  themes,
}: {
  themes: { display_name: string; name: string; id: number }[];
}) => {
  return (
    <div className="flex">
      {themes.map((theme) => (
        <div className="text-sm text-gray-500 pb-1 pr-1">
          {theme.display_name}
        </div>
      ))}
    </div>
  );
};

export default MainTheme;
