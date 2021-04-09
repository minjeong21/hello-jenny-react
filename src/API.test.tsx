import { fetchWritings } from "./apis/WritingApi";
describe("Async/Await", () => {
  test("the data is peanut butter", async () => {
    const response = await fetchWritings();
    response.map((item) => {
      console.log(item.fields);
    });
  });
});
