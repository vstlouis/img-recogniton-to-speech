import { env } from "./environment";

// we always get back data in english for now but the app can be configured to take a from
// value as well
const DEFAULT_LANGUAGE = "en";

// Thhis is where we translate text from one language to another
export const translateTextTo = async (text, lang) => {
  const url = encodeURI(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${env.TRANSLATION_API_KEY}&text=${text}&lang=${DEFAULT_LANGUAGE}-${lang}`,
  );
  const res = await fetch(url);
  const response = await res.json();
  if (response.code !== 200 || response.text.length === 0) {
    throw new Error("unable to retrieve transaltion");
  }
  return response.text[0];
};
