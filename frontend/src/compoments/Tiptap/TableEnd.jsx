import { useEditor, EditorContent } from "@tiptap/react";
import style from './TextEditor.module.scss'
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";


export const TableEnd = () => {
  const dispatch = useDispatch()

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `<p><b>RWS</b> - Dzienna referencyjna wartość spożycia</p>
      <p><b>&lt;&gt;</b> Nie ustalono dziennej referencyjnej wartości spożycia</p>`,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      dispatch(updateProduct({ tableEnd: html }));
    },
  });

  return (
    <div className={style.textEditorContainer}>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
