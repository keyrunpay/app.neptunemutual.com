import { Checkbox } from "@/common/Checkbox/Checkbox";
import { classNames } from "@/utils/classnames";
import { useState } from "react";
import { Trans } from "@lingui/macro";
import { Alert } from "@/common/Alert/Alert";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCoverInfoContext } from "@/common/Cover/CoverInfoContext";
import { getParsedKey } from "@/src/helpers/cover";

export const AcceptRulesForm = ({ onAccept, children, coverKey }) => {
  const router = useRouter();
  const coverPurchasePage = router.pathname.includes("purchase");
  const [checked, setChecked] = useState(false);
  const { activeIncidentDate, status } = useCoverInfoContext();

  const handleChange = (ev) => {
    setChecked(ev.target.checked);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (checked) {
      onAccept();
    }
  };

  if (status && status !== "Normal") {
    return (
      <Alert>
        <Trans>
          Cannot {coverPurchasePage ? "purchase policy" : "add liquidity"},
          since the cover status is
        </Trans>{" "}
        <Link
          href={`/reporting/${getParsedKey(
            coverKey
          )}/${activeIncidentDate}/details`}
        >
          <a className="font-medium underline hover:no-underline">{status}</a>
        </Link>
      </Alert>
    );
  }

  return (
    <>
      {/* Accept Rules Form */}
      <form onSubmit={handleSubmit}>
        <Checkbox
          id="checkid"
          name="checkinputname"
          checked={checked}
          onChange={handleChange}
        >
          {children}
        </Checkbox>
        <br />
        <button
          type="submit"
          disabled={!checked}
          className={classNames(
            !checked && "opacity-30 cursor-not-allowed",
            "bg-4e7dd9 text-EEEEEE py-3 px-4 mt-8 rounded-big w-full sm:w-auto"
          )}
        >
          <Trans>Next</Trans>&nbsp;&#x27F6;
        </button>
      </form>
    </>
  );
};
