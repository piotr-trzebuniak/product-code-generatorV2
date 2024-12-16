import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import style from "./TextEditor.module.scss";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";
import Button from "../Button/Button";

export const CosmeticsDescSplit = ({ onReset }) => {
  const dispatch = useDispatch();
  const [cleanedHtml, setCleanedHtml] = useState("");

  function removePTagsFromLists(html) {
    return html.replace(
      /(<ul[\s\S]*?>|<ol[\s\S]*?>)([\s\S]*?)(<\/ul>|<\/ol>)/g,
      (match, openTag, content, closeTag) => {
        const cleanedContent = content.replace(/<\/?p>/g, "");
        return `${openTag}${cleanedContent}${closeTag}`;
      }
    );
  }

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const cleaned = removePTagsFromLists(html);
      setCleanedHtml(cleaned); // Zaktualizuj stan cleanedHtml
    },
  });

  function splitHtmlContent(html) {
    const header1 = "<h3><strong>Składniki, które pokochasz:</strong></h3>";
    const header2 = "<h3><strong>Przeznaczenie:</strong></h3>";
  
    if (!html.includes(header1)) {
      console.error(`Nagłówek "${header1}" nie został znaleziony.`);
      return;
    }
  
    const [beforeIngredients, afterIngredients] = html.split(header1);
  
    if (!afterIngredients) {
      console.error(`Nie można podzielić kodu HTML po nagłówku "${header1}".`);
      return;
    }
  
    // Tworzenie parsera DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(beforeIngredients, "text/html");
  
    // Wyciąganie wszystkich akapitów
    const paragraphs = Array.from(doc.querySelectorAll("p"));
  
    // Wyodrębnij treść każdego akapitu
    const sentences = paragraphs.map((p) => p.outerHTML);
    console.log(sentences)
  
    if (sentences.length === 0) {
      console.error("Nie znaleziono akapitów w treści przed nagłówkiem.");
      return;
    }
  
    // Podział na dwie części
    const midpoint = Math.ceil(sentences.length / 2);
    console.log(midpoint)
    const opis1Parts = sentences.slice(0, midpoint); // Pierwsza połowa
    const opis2Parts = sentences.slice(midpoint);   // Druga połowa
  
    const opis1 = opis1Parts.join(" "); // Połącz akapity w string HTML
    console.log(opis1)
    const opis2 = opis2Parts.join(" "); // Połącz akapity w string HTML
  
    if (!afterIngredients.includes(header2)) {
      console.error(
        `Nagłówek "${header2}" nie został znaleziony w części po "${header1}".`
      );
      return;
    }
  
    const [ingredientsToPurpose, restAfterPurpose] =
      afterIngredients.split(header2);
  
    const opis3 = `${header1}${ingredientsToPurpose}`;
    const opis4 = `${header2}${restAfterPurpose}`;
  
    // Zapisz do Redux
    dispatch(
      updateProduct({
        cosmeticsDescription1: opis1,
        cosmeticsDescription2: opis2,
        cosmeticsDescription3: opis3,
        cosmeticsDescription4: opis4,
      })
    );
  }

  useEffect(() => {
    if (onReset && editor) {
      editor.commands.setContent("");
      dispatch(updateProduct({ shortDescription: "" }));
    }
  }, [onReset, editor, dispatch]);

  return (
    <div className={style.textEditorContainer}>
      <h4>Podział</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <Button
        onClick={() => {
          if (!cleanedHtml) {
            console.error("cleanedHtml jest puste lub niezdefiniowane.");
            return;
          }
          splitHtmlContent(cleanedHtml);
        }}
      >
        Podziel
      </Button>
    </div>
  );
};
