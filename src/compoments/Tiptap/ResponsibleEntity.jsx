import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";


export const ResponsibleEntity = ({ setDescription }) => {
  const dispatch = useDispatch()

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      dispatch(updateProduct({ responsibleEntity: html }));
      console.log(html);
      setDescription(html);
    },
  });

  return (
    <>
      <h4>Podmiot odpowiedzialny</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
