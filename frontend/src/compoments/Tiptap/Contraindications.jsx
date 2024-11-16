import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";


export const Contraindications = ({ setDescription }) => {
  const dispatch = useDispatch()

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `<p>Nadwrażliwość na którykolwiek ze składników preparatu. W okresie ciąży i karmienia piersią przed zastosowaniem należy skonsultować się z lekarzem lub farmaceutą.</p>`,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      dispatch(updateProduct({ contraindications: html }));
      console.log(html);
      setDescription(html);
    },
  });

  return (
    <>
      <h4>Przeciwwskazania</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
