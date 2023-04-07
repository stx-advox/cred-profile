import Head from "next/head";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FormEvent } from "react";
import { ChangeEvent } from "react";

export default function Home() {
  // const { doAuth } = useConnect();
  // const login = () => doAuth();
  const { push } = useRouter();
  const [name, setName] = useState("");
  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);
  const search = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      push(`/${name}`);
    },
    [push, name]
  );
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Show off your contributions to the community"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <form onSubmit={search}>
          <h1>Cred Profile</h1>
          <input
            type="text"
            placeholder="just gimme a btc name"
            value={name}
            onChange={handleNameChange}
          />
          <button type="submit" onClick={search}>
            Find
          </button>
        </form>
      </main>
    </div>
  );
}
