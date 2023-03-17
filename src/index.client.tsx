// @ts-expect-error
import { createRoot } from "react-dom";
import App from "./App.client";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

// Note: in this example, the initial page is rendered on the client.
// However, the intended solution (which isn't built out yet) is to
// have the server send the initial HTML, and hydrate from it.
