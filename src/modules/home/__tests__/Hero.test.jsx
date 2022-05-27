import React from "react";
import { render, screen, act } from "@/utils/unit-tests/test-utils";
import { i18n } from "@lingui/core";
import { HomeHero } from "@/modules/home/Hero";
import * as ProtocolHook from "@/src/hooks/useProtocolDayData";
import * as Router from "next/router";
import { convertFromUnits, toBN } from "@/utils/bn";
import { formatCurrency } from "@/utils/formatter/currency";
import { formatPercent } from "@/utils/formatter/percent";

const protocolDayData = [
  {
    date: 1649980800,
    totalLiquidity: "42972266000000000000000000",
  },
  {
    date: 1650067200,
    totalLiquidity: "43002586813333333333333335",
  },
  {
    date: 1650153600,
    totalLiquidity: "43005074813333333333333335",
  },
  {
    date: 1650240000,
    totalLiquidity: "43019312813333333333333335",
  },
];

const mockFunction = (file, method, returnData) => {
  jest.spyOn(file, method).mockImplementation(() => returnData);
};

const getChangeData = (data) => {
  if (data && data.length >= 2) {
    const lastSecond = toBN(data[data.length - 2].totalLiquidity);
    const last = toBN(data[data.length - 1].totalLiquidity);

    const diff =
      lastSecond.isGreaterThan(0) &&
      last.minus(lastSecond).dividedBy(lastSecond);
    return {
      last: last.toString(),
      diff: diff && diff.absoluteValue().toString(),
      rise: diff && diff.isGreaterThanOrEqualTo(0),
    };
  } else if (data && data.length == 1) {
    return {
      last: toBN(data[0].totalLiquidity).toString(),
      diff: null,
      rise: false,
    };
  }
};

describe("Hero test", () => {
  mockFunction(ProtocolHook, "useProtocolDayData", {
    data: protocolDayData,
    loading: false,
  });

  mockFunction(Router, "useRouter", { locale: "en" });

  beforeEach(() => {
    act(() => {
      i18n.activate("en");
    });
    render(<HomeHero />);
  });

  test("should render the component correctly", () => {
    const wrapper = screen.getByTestId("hero-container");
    expect(wrapper).toBeInTheDocument();
  });

  test("should render TVL info `HomeCard` component", () => {
    const wrapper = screen.getByTestId("tvl-homecard");
    expect(wrapper).toBeInTheDocument();
  });

  test("should render available & reporting info `HomeMainCard` component", () => {
    const wrapper = screen.getByTestId("homemaincard");
    expect(wrapper).toBeInTheDocument();
  });

  test("should have element with `Total Liquidity` text", () => {
    const text = "Total Liquidity";
    const wrapper = screen.getByText(text);
    expect(wrapper).toBeInTheDocument();
  });

  test("should render correct total liquidity value", () => {
    const changeData = getChangeData(protocolDayData);
    const currencyText = formatCurrency(
      convertFromUnits(changeData?.last || "0").toString(),
      "en"
    ).short;
    const wrapper = screen.getByTestId("changedata-currency");
    expect(wrapper).toHaveTextContent(currencyText);
  });

  test("should render total liquidity info", () => {
    const wrapper = screen.getByTestId("changedata-percent");
    expect(wrapper).toBeInTheDocument();
  });

  test("should render correct change percentage", () => {
    const changeData = getChangeData(protocolDayData);
    const percentText = formatPercent(changeData.diff, "en");
    const wrapper = screen
      .getByTestId("changedata-percent")
      .querySelector("span:nth-child(2)");
    expect(wrapper).toHaveTextContent(percentText);
  });

  test("should render TotalLiquidityChart component", () => {
    const wrapper = screen.getByTestId("liquidity-chart-wrapper");
    expect(wrapper).toBeInTheDocument();
  });
});
