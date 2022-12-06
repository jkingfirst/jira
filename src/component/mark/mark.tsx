export const Mark = ({ keyword, name }: { keyword: string; name: string }) => {
  if (!keyword) {
    return <span>{name}</span>;
  }
  const unitNames = name.split(keyword);
  return (
    <>
      {unitNames.map((item, index) => {
        return (
          <span key={index}>
            {!item ? (
              <span style={{ color: "#f00" }}>{keyword}</span>
            ) : (
              <span>{item}</span>
            )}
          </span>
        );
      })}
    </>
  );
};
