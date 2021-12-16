import { Checkbox } from "@/components/UI/atoms/checkbox";
import Head from "next/head";

export default function Components() {
  return (
    <div>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-bg px-8 py-6">
        <form>
          <Checkbox id="checkid" name="checkinputname">
            I have read, understood, and agree to the terms of cover rules
          </Checkbox>
          <br />
          <button type="submit">submit</button>
        </form>
      </main>
    </div>
  );
}
