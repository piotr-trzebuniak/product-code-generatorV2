import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import style from './TextEditor.module.scss'
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";


export const AdditionalInformation = ({onReset}) => {
  const dispatch = useDispatch()
  const contentText = `<p>Produkt nie może być stosowany jako substytut (zamiennik) prawidłowo zróżnicowanej diety. Zrównoważony sposób żywienia i prawidłowy tryb życia jest ważny dla funkcjonowania organizmu człowieka. Nie należy przekraczać maksymalnej zalecanej porcji do spożycia w ciągu dnia.</p>`

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: contentText,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      dispatch(updateProduct({ additionalInformation: html }));
    },
  });

  React.useEffect(() => {
    if (onReset && editor) {
      editor.commands.setContent(contentText); // Resetuj zawartość edytora
      dispatch(updateProduct({ shortDescription: '' })); // Resetuj stan Redux
    }
  }, [onReset, editor, dispatch]);

  return (
    <div className={style.textEditorContainer}>
      <h4>Informacja</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
