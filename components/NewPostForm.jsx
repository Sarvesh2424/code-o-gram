function NewPostForm() {
  return (
    <form className="flex flex-col gap-4 pt-16 pl-16">
      <h1 className="text-4xl text-white">New Post </h1>
      <input className="border border-white p-2 rounded-lg" />
      <select className="border border-white p-2 rounded-lg">
        <option>C++</option>
        <option>Java</option>
        <option>Python</option>
      </select>
      <input />
      <button></button>
    </form>
  );
}

export default NewPostForm;
