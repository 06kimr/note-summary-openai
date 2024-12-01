import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addNote } from "../store/notesSlice";

export const Empty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    const id = uuidv4();
    const newNote = {
      id,
      title: "새로운 노트",
      content: "",
      time: Date.now(),
      summary: "",
    };
    dispatch(addNote(newNote));
    navigate(`/notes/${note.id}`);
  };
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900">
      <div className="mb-6 text-5xl">
        <span>🎤</span>
      </div>
      <p className="mb-4 text-xl">노트를 만들어보세요</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
      >
        노트 작성
      </button>
    </div>
  );
};
