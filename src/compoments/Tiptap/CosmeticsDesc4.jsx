import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";



export const CosmeticsDesc4 = ({ setDescription }) => {
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

      dispatch(updateProduct({ cosmeticsDescription4: cleanedHtml }));
      // console.log(cleanedHtml);
      setDescription(cleanedHtml);
    },
  });

  return (
    <>
      <h4>Akapit 4</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
