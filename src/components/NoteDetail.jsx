import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, updateNote } from "../store/notesSlice";
import { fetchOpenAI } from "../api";
import { format } from "date-fns";

export const NoteDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const note = useSelector((state) =>
    state.notes.find((note) => note.id === params.id)
  );
  const dispatch = useDispatch();
  const handleChangeTitle = (e) => {
    dispatch(
      updateNote({
        ...note,
        title: e.target.value,
      })
    );
  };
  const handleChangeContent = (e) => {
    dispatch(
      updateNote({
        ...note,
        content: e.target.value,
      })
    );
  };

  const handleDelete = () => {
    navigate("/");
    dispatch(deleteNote(params.id));
  };
  const handleSubmit = async () => {
    const data = await fetchOpenAI(note.content);
    dispatch(
      updateNote({
        ...note,
        summary: data.choices[0].message.content,
      })
    );
  };
  return (
    <div className="p-6 bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <div>
          <time className="block text-sm text-gray-400">
            {format(note.time, "yyyy MM dd HH:mm")}
          </time>
          <input
            type="text"
            onChange={handleChangeTitle}
            className="text-2xl font-bold bg-transparent focus-within:outline-blue-500"
            value={note.title}
          />
        </div>
        <div>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
          >
            삭제
          </button>
        </div>
      </div>
      <section className="flex ">
        <div className="flex-1 p-4 mr-4 bg-gray-800 rounded">
          <h2 className="mb-2 text-lg font-semibold">메모</h2>
          <textarea
            value={note.content}
            onChange={handleChangeContent}
            className="w-full h-64 p-2 bg-gray-700 rounded resize-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 mt-4 bg-blue-600 rounded hover:bg-blue-500"
          >
            요약
          </button>
        </div>
        <div className="flex-1 p-4 bg-gray-800 rounded">
          <h3 className="mb-2 text-lg font-semibold">요약 결과</h3>
          <div className="h-64 p-2 text-gray-300 bg-gray-700 rounded">
            {note.summary}
          </div>
        </div>
      </section>
    </div>
  );
};
