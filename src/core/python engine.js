let globalPyodide = null;
let globalPyodidePromise = null;
let scriptLoadingPromise = null;

/* -------------------------
   LOAD PYODIDE SCRIPT
-------------------------- */
const loadPyodideScript = () => {
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }

    let script = document.querySelector(
      'script[src*="pyodide.js"]'
    );

    if (!script) {
      script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", resolve);
    script.addEventListener("error", () =>
      reject(new Error("Failed to load Pyodide"))
    );
  });

  return scriptLoadingPromise;
};

/* -------------------------
   INIT PYODIDE
-------------------------- */
export const initPyodide = async () => {
  if (globalPyodide) return globalPyodide;

  await loadPyodideScript();

  if (!globalPyodidePromise) {
    globalPyodidePromise = window.loadPyodide({
      indexURL:
        "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    });
  }

  globalPyodide = await globalPyodidePromise;
  return globalPyodide;
};

/* -------------------------
   GET PYODIDE INSTANCE
-------------------------- */
export const getPyodide = () => globalPyodide;

/* -------------------------
   EXECUTE CODE
-------------------------- */
export const executePythonCode = async (code) => {
  if (!globalPyodide) {
    throw new Error("Python environment is loading...");
  }

  const stdoutBuffer = [];

  globalPyodide.setStdout({
    batched: (text) => {
      stdoutBuffer.push(text);
    },
  });

  globalPyodide.setStderr({
    batched: (text) => {
      stdoutBuffer.push(text);
    },
  });

  let result;

  try {
    result = await globalPyodide.runPythonAsync(code);

    let finalOutput = stdoutBuffer.join("\n");

    if (result !== undefined && result !== null) {
      finalOutput = finalOutput
        ? `${finalOutput}\n${String(result)}`
        : String(result);
    }

    if (!finalOutput.trim()) {
      finalOutput = "Cell executed successfully (no output)";
    }

    return finalOutput;
  } catch (error) {
    const printedOutput = stdoutBuffer.join("\n");

    const errorText =
      error?.message || error?.toString() || "Unknown Python Error";

    return printedOutput
      ? `${printedOutput}\n\n❌ ${errorText}`
      : `❌ ${errorText}`;
  }
};
/* -------------------------
   RESET NAMESPACE
-------------------------- */
export const resetPythonNamespace = () => {
  if (!globalPyodide) return;

  try {
    globalPyodide.runPython(`
for name in list(globals().keys()):
    if not name.startswith('__'):
        del globals()[name]
`);
  } catch (err) {
    console.error("Reset failed:", err);
  }
};
