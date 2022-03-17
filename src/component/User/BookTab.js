export const BookTab = profile => {
  return (
    <div>
      {profile?.followingBook?.map(book => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
};
