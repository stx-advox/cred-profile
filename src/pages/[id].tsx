import { loadSCData } from "@cred-profile/sourcecred";
import { getNameTotalCred, scNameToBtc } from "@cred-profile/sourcecred/util";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Profile {
  name: string;
}

interface Props {
  profile: Profile;
  credScore: number;
}

export default function Profile({ credScore, profile }: Props) {
  return (
    <div className="container">
      <Head>
        <title>{`${profile.name} cred profile`}</title>
        <meta
          name="description"
          content={`${profile.name} has a contribution score of ${credScore}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello {profile.name}!</h1>

      <h2>You got a cred score of {credScore}</h2>
      <p>
        This number does not reflect your value you are a valuable member of the
        community we love you 💖💖💖💖💖
        <br />
        <br />
        this is just the start of helping show off how much folks appreciate the
        things you do in the advocates program!
      </p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await loadSCData();
  const participants = data.participants;
  console.log(participants.length);
  const paths: Array<{ params: { id: string } }> = participants.map((item) => {
    return {
      params: {
        id: scNameToBtc(item.identity.name),
      },
    };
  });
  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  let name = "";
  let score = 0;

  if (params) {
    name = params.id;
    score = await getNameTotalCred(name);
  }
  return {
    props: {
      credScore: Math.floor(score),
      profile: {
        name,
      },
    },
  };
};
