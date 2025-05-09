import { toast } from "react-toastify";
import { exceptions } from "./translationExceptions";

// Funkcja do zamiany fraz na placeholdery
export const replaceWithPlaceholders = (text, exceptions) => {
  let map = {};
  exceptions.forEach((phrase, index) => {
    const placeholder = `__PLACEHOLDER_${index}__`;
    const regex = new RegExp(phrase, "g");
    text = text.replace(regex, placeholder);
    map[placeholder] = phrase;
  });
  return { updatedText: text, map };
};

// Funkcja do przywracania oryginalnych fraz z placeholderów
export const restorePlaceholders = (text, map) => {
  Object.entries(map).forEach(([placeholder, original]) => {
    const regex = new RegExp(placeholder, "g");
    text = text.replace(regex, original);
  });
  return text;
};

// Funkcja tłumacząca tekst z obsługą wyjątków
export const translateWithExceptions = async (text, lang) => {
  const { updatedText, map } = replaceWithPlaceholders(text, exceptions);
  
  try {
    const translated = await translateText(updatedText, lang);
    return restorePlaceholders(translated, map);
  } catch (error) {
    // Wyświetl powiadomienie o błędzie
    toast.error(`${error.message} Proszę spróbować ponownie.`);
    // Rzuć błąd dalej, aby przerwać proces tłumaczenia
    throw new Error(`Nieudane tłumaczenie: ${error.message}`);
  }
};


// Funkcja do tłumaczenia wszystkich pól
export const translateAllFields = async (
  productData,
  initialState,
  setIsTranslating // Dodajemy parametr funkcji do aktualizacji stanu ładowania
) => {
  const fieldsToTranslate = [
    "productName",
    "description",
    "shortDescription",
    "ingredients",
    "howToUse",
    "bulletpoints",
    "contraindications",
    "storage",
    "additionalInformation",
    "cosmeticsDescription1",
    "cosmeticsDescription2",
    "cosmeticsDescription3",
    "cosmeticsDescription4",
    "tableEnd",
    "producer",
    "responsibleEntity",
  ];

  const translatedData = {};

  try {
    for (const field of fieldsToTranslate) {
      const original = productData[field]?.pl;
      const originalDefault = initialState.product[field]?.pl;

      if (original) {
        // jeśli wartość jest identyczna jak w initialState, użyj gotowych tłumaczeń
        if (original === originalDefault) {
          translatedData[field] = {
            ...productData[field],
            en: initialState.product[field]?.en || "",
            de: initialState.product[field]?.de || "",
            fr: initialState.product[field]?.fr || "",
            it: initialState.product[field]?.it || "",
          };
        } else {
          const { updatedText, map } = replaceWithPlaceholders(
            original,
            exceptions
          );
          
          // Użyj Promise.all, ale obsłuż błędy dla każdego tłumaczenia
          const translations = await Promise.all([
            translateText(updatedText, "en-GB").catch(error => {
              toast.error(`Błąd tłumaczenia na angielski: ${error.message}`);
              throw error;
            }),
            translateText(updatedText, "de").catch(error => {
              toast.error(`Błąd tłumaczenia na niemiecki: ${error.message}`);
              throw error;
            }),
            translateText(updatedText, "fr").catch(error => {
              toast.error(`Błąd tłumaczenia na francuski: ${error.message}`);
              throw error;
            }),
            translateText(updatedText, "it").catch(error => {
              toast.error(`Błąd tłumaczenia na włoski: ${error.message}`);
              throw error;
            })
          ]);
          
          const [enRaw, deRaw, frRaw, itRaw] = translations;
          
          const en = restorePlaceholders(enRaw, map);
          const de = restorePlaceholders(deRaw, map);
          const fr = restorePlaceholders(frRaw, map);
          const it = restorePlaceholders(itRaw, map);

          translatedData[field] = {
            ...productData[field],
            en,
            de,
            fr,
            it,
          };
        }
      }
    }

    const sizeUnitPl = productData.size.unit.pl;
    const initialSizeUnitPl = initialState.product.size.unit.pl;

    // Tłumaczenie ingredientsTable
    const translatedIngredients = await Promise.all(
      productData.ingredientsTable.map(async (ingredient) => {
        try {
          const translatedIngredient = {
            ...ingredient,
            ingredient: {
              ...ingredient.ingredient,
              en: ingredient.ingredient.pl
                ? await translateWithExceptions(ingredient.ingredient.pl, "en-GB")
                : "",
              de: ingredient.ingredient.pl
                ? await translateWithExceptions(ingredient.ingredient.pl, "de")
                : "",
              fr: ingredient.ingredient.pl
                ? await translateWithExceptions(ingredient.ingredient.pl, "fr")
                : "",
              it: ingredient.ingredient.pl
                ? await translateWithExceptions(ingredient.ingredient.pl, "it")
                : "",
            },
            ingredientValue: {
              ...ingredient.ingredientValue,
              en: ingredient.ingredientValue.pl
                ? await translateWithExceptions(
                    ingredient.ingredientValue.pl,
                    "en-GB"
                  )
                : "",
              de: ingredient.ingredientValue.pl
                ? await translateWithExceptions(ingredient.ingredientValue.pl, "de")
                : "",
              fr: ingredient.ingredientValue.pl
                ? await translateWithExceptions(ingredient.ingredientValue.pl, "fr")
                : "",
              it: ingredient.ingredientValue.pl
                ? await translateWithExceptions(ingredient.ingredientValue.pl, "it")
                : "",
            },
            additionalLines: await Promise.all(
              (ingredient.additionalLines || []).map(async (line) => ({
                ...line,
                ingredient: {
                  ...line.ingredient,
                  en: line.ingredient.pl
                    ? await translateWithExceptions(line.ingredient.pl, "en-GB")
                    : "",
                  de: line.ingredient.pl
                    ? await translateWithExceptions(line.ingredient.pl, "de")
                    : "",
                  fr: line.ingredient.pl
                    ? await translateWithExceptions(line.ingredient.pl, "fr")
                    : "",
                  it: line.ingredient.pl
                    ? await translateWithExceptions(line.ingredient.pl, "it")
                    : "",
                },
                ingredientValue: {
                  ...line.ingredientValue,
                  en: line.ingredientValue.pl
                    ? await translateWithExceptions(
                        line.ingredientValue.pl,
                        "en-GB"
                      )
                    : "",
                  de: line.ingredientValue.pl
                    ? await translateWithExceptions(line.ingredientValue.pl, "de")
                    : "",
                  fr: line.ingredientValue.pl
                    ? await translateWithExceptions(line.ingredientValue.pl, "fr")
                    : "",
                  it: line.ingredientValue.pl
                    ? await translateWithExceptions(line.ingredientValue.pl, "it")
                    : "",
                },
              }))
            ),
          };

          return translatedIngredient;
        } catch (error) {
          // Jeśli wystąpi błąd przy tłumaczeniu składnika, przerwij cały proces
          throw new Error(`Błąd przy tłumaczeniu składnika: ${error.message}`);
        }
      })
    );

    translatedData.ingredientsTable = translatedIngredients;

    // Tłumaczenie jednostki rozmiaru
    translatedData.size = {
      ...productData.size,
      unit: {
        pl: sizeUnitPl || "",
        en:
          sizeUnitPl === initialSizeUnitPl
            ? initialState.product.size.unit.en || ""
            : sizeUnitPl
            ? await translateWithExceptions(sizeUnitPl, "en-GB")
            : "",
        de:
          sizeUnitPl === initialSizeUnitPl
            ? initialState.product.size.unit.de || ""
            : sizeUnitPl
            ? await translateWithExceptions(sizeUnitPl, "de")
            : "",
        fr:
          sizeUnitPl === initialSizeUnitPl
            ? initialState.product.size.unit.fr || ""
            : sizeUnitPl
            ? await translateWithExceptions(sizeUnitPl, "fr")
            : "",
        it:
          sizeUnitPl === initialSizeUnitPl
            ? initialState.product.size.unit.it || ""
            : sizeUnitPl
            ? await translateWithExceptions(sizeUnitPl, "it")
            : "",
      },
    };

    const portionUnitPl = productData.portion.unit.pl;
    const initialPortionUnitPl = initialState.product.portion.unit.pl;

    // Tłumaczenie jednostki porcji
    translatedData.portion = {
      ...productData.portion,
      unit: {
        pl: portionUnitPl || "",
        en:
          portionUnitPl === initialPortionUnitPl
            ? initialState.product.portion.unit.en || ""
            : portionUnitPl
            ? await translateWithExceptions(portionUnitPl, "en-GB")
            : "",
        de:
          portionUnitPl === initialPortionUnitPl
            ? initialState.product.portion.unit.de || ""
            : portionUnitPl
            ? await translateWithExceptions(portionUnitPl, "de")
            : "",
        fr:
          portionUnitPl === initialPortionUnitPl
            ? initialState.product.portion.unit.fr || "" // Poprawiono błąd z .de na .fr
            : portionUnitPl
            ? await translateWithExceptions(portionUnitPl, "fr")
            : "",
        it:
          portionUnitPl === initialPortionUnitPl
            ? initialState.product.portion.unit.it || "" // Poprawiono błąd z .de na .it
            : portionUnitPl
            ? await translateWithExceptions(portionUnitPl, "it")
            : "",
      },
    };

    return translatedData;
  } catch (error) {
    // W przypadku jakiegokolwiek błędu podczas tłumaczenia
    toast.error(`Proces tłumaczenia został przerwany: ${error.message}`);
    
    // Zmień stan ładowania na false, jeśli został przekazany
    if (setIsTranslating) {
      setIsTranslating(false);
    }
    
    // Rzuć błąd dalej, aby komponent mógł go obsłużyć
    throw error;
  }
};


export const translateText = async (text, targetLang) => {
  try {
    // Użyj zmiennej środowiskowej lub defaultowego URL na podstawie środowiska
    const API_URL = import.meta.env.VITE_API_URL || 
                    (window.location.hostname === 'localhost' 
                      ? 'http://localhost:3000' 
                      : 'https://product-code-generatorv2-4.onrender.com');
    
    const response = await fetch(`${API_URL}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang }),
    });

    const data = await response.json();

    if (!response.ok || !data.translatedText) {
      console.warn("Błąd tłumaczenia lub brak tekstu.");
      throw new Error(`Tłumaczenie na język ${targetLang} nie powiodło się.`);
    }

    return data.translatedText;
  } catch (error) {
    console.error("Błąd połączenia z API tłumaczenia:", error);
    // Zamiast zwracać oryginalny tekst, rzucamy błąd, który musi być obsłużony przez funkcję wywołującą
    throw new Error(`Błąd tłumaczenia na język ${targetLang}: ${error.message}`);
  }
};