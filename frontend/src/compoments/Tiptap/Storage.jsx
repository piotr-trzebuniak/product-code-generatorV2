import { useEditor, EditorContent } from "@tiptap/react";
import style from './TextEditor.module.scss'
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";


export const Storage = () => {
  const dispatch = useDispatch()

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `<p>Przechowywać w suchym i ciemnym miejscu, w temperaturze 0-25ºC, w sposób niedostępny dla małych dzieci.</p>`,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      dispatch(updateProduct({ storage: html }));
    },
  });

  return (
    <div className={style.textEditorContainer}>
      <h4>Przechowywanie</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
