import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import appStylesHref from "./app.css";
import Nav from "./components/Nav";
import { authenticator } from "./services/auth.server";


export const links = () => [{ rel: "stylesheet", href: appStylesHref }];


export const loader = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request);
    return { user };
}



export default function App() {
    const { user } = useLoaderData();

    // Check if the current route is the signup pag
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {/* Render the <Nav /> component only if it's not the signup page */}
                {user && <Nav />}
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
