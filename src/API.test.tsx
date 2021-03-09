import { fetchPractices } from "./apis/PracticeApi";
describe("Async/Await", () => {
  test("the data is peanut butter", async () => {
    const response = await fetchPractices();
    response.map((item) => {
      console.log(item.fields);
    });
  });
});
