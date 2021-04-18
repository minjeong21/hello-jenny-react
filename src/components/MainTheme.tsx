export const MainTheme = ({
  themes,
}: {
  themes: { display_name: string; name: string; id: number }[];
}) => {
  return (
    <div className=" font-body weigth-400 font-gray-2 pb-l">
      {themes[0].display_name.toLowerCase()}
    </div>
  );
};

export default MainTheme;
