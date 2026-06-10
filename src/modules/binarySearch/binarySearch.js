export const DEFAULT_CELLS = [
  {
    id: 1,
    code: `
    def locate(cards, query):
                pass #we write logic later
    cards = [13, 11, 10, 7, 4, 3, 1, 0]
    query = 7
    output = 3
    result= locate(cards, query)
    print(result)
      `,
    output: "",
    isError: false,
    isEditing: false,
  },

  {
    id: 2,
    code: `# Binary Search

      def binary_search(arr, target):
          pass
      `,
    output: "",
    isError: false,
    isEditing: false,
  },

  {
    id: 3,
    code: `# Run Tests

      for arr, target, expected in tests:
          pass
      `,
    output: "",
    isError: false,
    isEditing: false,
  },
];

let globalPyodide = null;
let globalPyodidePromise = null;
let scriptLoadingPromise = null;

const loadPyodideScript = () => {
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }

    let script = document.querySelector('script[src*="pyodide.js"]');
    if (!script) {
      script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", () => {
      resolve();
    });
    script.addEventListener("error", (err) => {
      reject(new Error("Failed to load Pyodide script from CDN"));
    });
  });

  return scriptLoadingPromise;
};

export const initPyodide = async () => {
  if (globalPyodide) {
    return globalPyodide;
  }

  await loadPyodideScript();
  if (!window.loadPyodide) {
    throw new Error("loadPyodide is not defined on window");
  }

  if (!globalPyodidePromise) {
    globalPyodidePromise = window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
    });
  }

  globalPyodide = await globalPyodidePromise;
  return globalPyodide;
};

export const getPyodide = () => globalPyodide;

export const executePythonCode = async (code) => {
  if (!globalPyodide) {
    throw new Error("Python environment is loading. Please wait...");
  }

  // Capture stdout and stderr
  let stdoutBuffer = [];
  globalPyodide.setStdout({
    batched: (text) => {
      stdoutBuffer.push(text);
    }
  });
  globalPyodide.setStderr({
    batched: (text) => {
      stdoutBuffer.push(text);
    }
  });

  let result = globalPyodide.runPython(code);

  let finalOutput = stdoutBuffer.join("\n");
  if (result !== undefined && result !== null) {
    if (finalOutput) {
      finalOutput += "\n" + String(result);
    } else {
      finalOutput = String(result);
    }
  }

  if (!finalOutput) {
    finalOutput = "Cell executed successfully (no output)";
  }

  return finalOutput;
};

export const resetPythonNamespace = () => {
  if (globalPyodide) {
    try {
      globalPyodide.runPython(`
for name in list(globals().keys()):
    if not name.startswith('__'):
        del globals()[name]
      `);
    } catch (err) {
      console.error("Failed to reset Python namespace:", err);
    }
  }
};

