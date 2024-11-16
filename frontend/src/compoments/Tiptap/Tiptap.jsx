import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
// import {
//   FaBold,
//   FaListOl,
//   FaListUl,
//   FaRedo,
//   FaUndo,
// } from "react-icons/fa";

// import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";

// const MenuBar = ({ editor }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="menuBar">
//       <div>
//         <button
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={editor.isActive("bold") ? "is_active" : ""}
//         >
//           <FaBold />
//         </button>
//         <button
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 1 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 1 }) ? "is_active" : ""
//           }
//         >
//           <BsTypeH1 />
//         </button>
//         <button
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 2 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 2 }) ? "is_active" : ""
//           }
//         >
//           <BsTypeH2 />
//         </button>
//         <button
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 3 }).run()
//           }
//           className={
//             editor.isActive("heading", { level: 3 }) ? "is_active" : ""
//           }
//         >
//           <BsTypeH3 className="heading3" />
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={editor.isActive("bulletList") ? "is_active" : ""}
//         >
//           <FaListUl />
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={editor.isActive("orderedList") ? "is_active" : ""}
//         >
//           <FaListOl />
//         </button>
//       </div>
//       <div>
//         <button onClick={() => editor.chain().focus().undo().run()}>
//           <FaUndo />
//         </button>
//         <button onClick={() => editor.chain().focus().redo().run()}>
//           <FaRedo />
//         </button>
//       </div>
//     </div>
//   );
// };

export const Tiptap = ({ setDescription }) => {
  const dispatch = useDispatch()



  function removePTagsFromLists(html) {
    // Usuwamy wszystkie znaczniki <p> oraz </p> pomiędzy <ul> i </ul> oraz <ol> i </ol>
    return html.replace(/(<ul[\s\S]*?>|<ol[\s\S]*?>)([\s\S]*?)(<\/ul>|<\/ol>)/g, (match, openTag, content, closeTag) => {
      // Usuwamy znaczniki <p> oraz </p> tylko wewnątrz list
      const cleanedContent = content.replace(/<\/?p>/g, "");
      console.log('test')
      // Zwracamy całą strukturę z wyczyszczonymi <p>
      return `${openTag}${cleanedContent}${closeTag}`;
    });
  }

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      const cleanedHtml = removePTagsFromLists(html);

      dispatch(updateProduct({ description: cleanedHtml }));
      console.log(cleanedHtml);
      setDescription(cleanedHtml);
    },
  });

  return (
    <>
      <h4>Dodatkowy opis</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
