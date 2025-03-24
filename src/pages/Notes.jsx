import { FiEdit3, FiFilter } from "react-icons/fi";
 
const notes = [
  {
    id: 1,
    icon: "📝",
    title: "Terraform project brief",
    content:
      "No going all perfect, task to be done, Let me show the images of the project.",
    bgColor: "bg-[#c9db84]",
  },
  {
    id: 2,
    icon: "💼",
    title: "Terraform project brief",
    content:
      "No going all perfect, task to be done, Let me show the images of the project.",
    bgColor: "bg-[#dbe8a8]",
  },
  {
    id: 3,
    icon: "🧩",
    title: "Terraform project brief",
    content:
      "No going all perfect, task to be done, Let me show the images of the project.",
    bgColor: "bg-[#e9f2cc]",
  },
];
 
const Notes = () => {
  return (
    <div className="flex h-screen bg-gray-100 p-8">
      <div className="w-1/3 space-y-6">
        <h1 className="text-2xl font-bold mb-4">📑 All Notes</h1>
 
        {/* Filter icon added here with flex alignment */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-green-600">124 Notes</p>
          <FiFilter className="text-gray-600 text-lg cursor-pointer" />
        </div>
 
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${note.bgColor} p-6 rounded-lg flex items-start space-x-4`}
          >
            <span className="text-4xl">{note.icon}</span>
            <div>
              <h2 className="text-lg font-bold mb-2">{note.title}</h2>
              <p className="text-sm text-gray-700">{note.content}</p>
            </div>
          </div>
        ))}
      </div>
 
      <div className="w-2/3 p-8 bg-white rounded-lg shadow-md ml-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            📝 Terraform project brief
          </h2>
          <button className="bg-[#c9db84] text-black px-4 py-2 rounded-lg">
            Edit
          </button>
        </div>
        <p className="text-xs text-purple-500 mb-3">4 mins</p>
 
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg text-gray-600 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="6"
          defaultValue="Salsile Inc. is a well-established fashion retailer specializing in high-quality clothing and accessories for men and women. The client is looking to revamp their existing e-commerce website to enhance user experience, improve overall aesthetics, and increase online sales. The new design should reflect their brand identity as a modern, and customer-centric fashion store."
        />
 
        <div className="mt-16 flex justify-between items-center w-full">
          <div className="flex items-center space-x-4 text-gray-600 bg-gray-100 p-3 rounded-full w-1/3">
            <span className="text-2xl">🔠</span>
            <span className="italic">I</span>
            <span className="font-bold">B</span>
            <span className="underline">U</span>
            <span className="text-xl">↕️</span>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default Notes;