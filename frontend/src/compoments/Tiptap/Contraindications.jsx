import { useEditor, EditorContent } from "@tiptap/react";
import style from './TextEditor.module.scss'
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";


export const Contraindications = () => {
  const dispatch = useDispatch()

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `<p>Nadwrażliwość na którykolwiek ze składników preparatu. W okresie ciąży i karmienia piersią przed zastosowaniem należy skonsultować się z lekarzem lub farmaceutą.</p>`,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      dispatch(updateProduct({ contraindications: html }));
    },
  });

  return (
    <div className={style.textEditorContainer}>
      <h4>Przeciwwskazania</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
