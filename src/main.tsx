import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./routes.tsx";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider resetCSS={true}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);
