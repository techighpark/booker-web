import useBookList from "../hook/useBookList";

export const BookList = () => {
  const { data } = useBookList();

  return (
    <div>
      {data?.seeBooks?.map(book => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
};
