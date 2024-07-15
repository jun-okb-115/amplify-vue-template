// import { amplifyClient } from "./amplify-utils";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../amplify/data/resource";

export async function generateRecipe(formData: FormData) {
  const amplifyClient = generateClient<Schema>();
  const response = await amplifyClient.queries.askBedrock({
    ingredients: [formData.get("ingredients")?.toString() || ""],
  });

  const res = JSON.parse(response.data?.body!);
  const content = res.content[0].text;
  return content || "";
}
