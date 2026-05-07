export function makeRandomPromise() {
    return new Promise((resolve, reject) => {
        const value = Math.floor(Math.random() * 101);
        if (value > 20) {
            resolve(`успех (${value})`);
        } else {
            reject(`ошибка (${value})`);
        }
    });
}

export function runThenCatchDemo() {
    console.log("[promiseDemo] then/catch/finally:");
    return makeRandomPromise()
        .then((result) => console.log("  resolved →", result))
        .catch((error) => console.log("  rejected →", error))
        .finally(() => console.log("  finally → промис завершён"));
}

export async function runAsyncAwaitDemo() {
    console.log("[promiseDemo] async/await:");
    try {
        const result = await makeRandomPromise();
        console.log("  resolved →", result);
    } catch (error) {
        console.log("  rejected →", error);
    } finally {
        console.log("  finally → промис завершён");
    }
}

export async function runPromiseDemo() {
    await runThenCatchDemo();
    await runAsyncAwaitDemo();
}
