import useAuthorList from "../hook/useAuthorList";

export const AuthorList = () => {
  const { data } = useAuthorList();

  return (
    <div>
      {data?.seeAuthors?.map(author => (
        <div key={author.id}>{author.fullName}</div>
      ))}
    </div>
  );
};
