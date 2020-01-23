import Clarifai from "clarifai";
import { env } from "./environment";

// This is where we will "predict", currently just using clarify
// I tried to use tensorflow as well but that was too much of a pain to figure out the bundling in such a short time
export const clarifai = new Clarifai.App({
  apiKey: env.IMG_API_KEY,
});

// Predict by passing in the base64 image string of the image
export const predict = async data => {
  try {
    const response = await clarifai.models.predict(Clarifai.GENERAL_MODEL, { base64: data });
    return (
      response.outputs[0].data.concepts
        .slice(0, 10)
        // pull only what we need
        .map(({ name, value }) => ({
          name,
          value,
        }))
        // remove no match items
        .filter(concept => {
          concept.value = concept.value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
          return !concept.name.startsWith("no ");
        })
    );
  } catch (err) {
    // null if omething happened. We check errors in our component
    return null;
  }
};
