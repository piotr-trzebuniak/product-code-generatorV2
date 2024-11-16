import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";


export const Bulletpoints = ({ setDescription, initialContent }) => {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.product);



  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent || productData.bulletpoints || "",

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      dispatch(updateProduct({ bulletpoints: html }));
      console.log(html);
      setDescription(html);
    },
  });

  useEffect(() => {
    if (editor && productData.bulletpoints !== editor.getHTML()) {
      editor.commands.setContent(productData.bulletpoints || "");
    }
  }, [productData.bulletpoints, editor]); 


  return (
    <>
      <h4>Dlaczego warto stosować?
      </h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
