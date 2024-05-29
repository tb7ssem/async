const array = ["item1", "item2", "houssem"];
const urls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/2",
];

// Delay finction that retuns a promise resolved after a specified time
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Async function to iterate over the array with a 1-second delay between logs
async function iterateWithAsyncAwait(array) {
  for (const value of array) {
    console.log(value);
    await delay(1000);
  }
}

//Awaiting a call

async function awaitCall() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:comeback latair", error);
  }
}

async function chainedAsyncFunctions() {
  await iterateWithAsyncAwait(array);
  await iterateWithAsyncAwait(array);
  await awaitCall();
}

async function concurrentRequests() {
  const [response1, response2] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/todos/1"),
    fetch("https://jsonplaceholder.typicode.com/todos/2"),
  ]);

  if (!response1.ok || !response2.ok) {
    throw new Error("one or both api requests failed");
  }

  const data1 = await response1.json();
  const data2 = await response2.json();
  console.log(data1, data2);
}

async function parallelCalls(urls) {
  try {
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const allResponses = await Promise.all(
      responses.map(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Rquest failed for ${response.url} : ${response.status}`
          );
        }
        return response.json();
      })
    );
    console.log("Results: ", allResponses);
  } catch (error) {
    console.error("Error:feching urls ", error);
  }
}
parallelCalls(urls);
