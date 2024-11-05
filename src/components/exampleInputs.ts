export type ExampleInput = {
    name: string;
    inputQuery: string;
    inputFields: InputField[]
}

export type InputField = {
    key: `${string}-${string}-${string}-${string}-${string}`;
    name: string;
    value: string
}


export const exampleInputs: ExampleInput[] = [
    {
        name: "Login by select count(*)",
        inputQuery: "select count(*)\n" +
            "    from table users\n" +
            "    where name='$name'\n" +
            "    and password='$password';",
        inputFields: [
            {key: crypto.randomUUID(), name: "$name", value: "admin"},
            {key: crypto.randomUUID(), name: "$password", value: "trustno1"},
        ]
    },
    // {
    //     name: "Login by select count(*) (sqli via line comment)",
    //     inputQuery: "select count(*)\n" +
    //         "    from table users\n" +
    //         "    where name='$name'\n" +
    //         "    and password='$password';",
    //     inputFields: [
    //         {key: crypto.randomUUID(), name: "$name", value: "admin' --"},
    //         {key: crypto.randomUUID(), name: "$password", value: "trustno1"},
    //     ]
    // },
    {
        name: "Search movie via name",
        inputQuery: "select id, title, genre, cover, rating\n" +
            "    from table movies\n" +
            "    where title like '%$title%';",
        inputFields: [
            {key: crypto.randomUUID(), name: "$title", value: "the"},
        ]
    },
    // {
    //     name: "Search movie via name (sqli via UNION)",
    //     inputQuery: "select id, title, genre, cover, rating\n" +
    //         "    from table movies\n" +
    //         "    where title like '%$title%';",
    //     inputFields: [
    //         {
    //             key: crypto.randomUUID(),
    //             name: "$title",
    //             value: "xxxxxx%' union select *,NULL,NULL from users --"
    //         },
    //     ]
    // },
    {
        name: "Filter movie via genre and/or rating",
        inputQuery: "select id, title, genre, cover, rating\n" +
            "    from table movies\n" +
            "    where genre like '%$genre%'\n" +
            "    and rating=$rating;",
        inputFields: [
            {key: crypto.randomUUID(), name: "$genre", value: "Comedy"},
            {key: crypto.randomUUID(), name: "$rating", value: "1"},
        ]
    },
    {
        name: "Juice Shop Login",
        inputQuery: "SELECT * FROM Users WHERE email = '$email' AND password = '$password' AND deletedAt IS NULL",
        inputFields: [
            {key: crypto.randomUUID(), name: "$email", value: "admin@juice-sh.op"},
            {key: crypto.randomUUID(), name: "$password", value: "SuperJuicer (maybe?)"}
        ]
    },
    {
        name: "Juice Shop Search",
        inputQuery: "SELECT * FROM Products WHERE ((name LIKE '%$q%' OR description LIKE '%$q%') AND deletedAt IS NULL) ORDER BY name",
        inputFields: [
            {key: crypto.randomUUID(), name: "$q", value: "Juice"}
        ]
    },
]
