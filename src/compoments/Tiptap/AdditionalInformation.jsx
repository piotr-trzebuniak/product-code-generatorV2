import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";


export const AdditionalInformation = ({ setDescription }) => {
  const dispatch = useDispatch()

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `<p>Produkt nie może być stosowany jako substytut (zamiennik) prawidłowo zróżnicowanej diety. Zrównoważony sposób żywienia i prawidłowy tryb życia jest ważny dla funkcjonowania organizmu człowieka. Nie należy przekraczać maksymalnej zalecanej porcji do spożycia w ciągu dnia.</p>`,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      dispatch(updateProduct({ additionalInformation: html }));
      console.log(html);
      setDescription(html);
    },
  });

  return (
    <>
      <h4>Informacja</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
