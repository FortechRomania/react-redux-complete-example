import React from "react";

export default ( ) => (
    <div>
        <h1>Login</h1>
        <label htmlFor="username">
            Username
            <input id="username" name="username" type="text" />
        </label>

        <label htmlFor="password">
            Password
            <input id="password" name="password" type="password" />
        </label>

    </div>
);
