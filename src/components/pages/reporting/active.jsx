import { useState } from "react";
import { NeutralButton } from "@/components/UI/atoms/button/neutral-button";
import { Container } from "@/components/UI/atoms/container";
import { Grid } from "@/components/UI/atoms/grid";
import { SearchAndSortBar } from "@/components/UI/molecules/search-and-sort";
import { ActiveReportingCard } from "@/components/UI/organisms/reporting/ActiveReportingCard";
import { ActiveReportingEmptyState } from "@/components/UI/organisms/reporting/ActiveReportingEmptyState";
import { useActiveReportings } from "@/src/hooks/useActiveReportings";
import { getParsedKey } from "@/src/helpers/cover";
import Link from "next/link";
import { useSearchResults } from "@/src/hooks/useSearchResults";
import { useCovers } from "@/src/context/Covers";
import { sortData } from "@/utils/sorting";

export const ReportingActivePage = () => {
  const { data, loading, hasMore, handleShowMore } = useActiveReportings();
  const { getInfoByKey } = useCovers();
  const { searchValue, setSearchValue, filtered } = useSearchResults({
    list: data.incidentReports,
    filter: (item, term) => {
      const info = getInfoByKey(item.key);

      return info.projectName.toLowerCase().indexOf(term.toLowerCase()) > -1;
    },
  });

  const [sortType, setSortType] = useState({ name: "A-Z" });

  const filteredActiveCardInfo = filtered.map((item) => {
    const activeCardInfo = getInfoByKey(item.key);

    return { ...activeCardInfo, activeReporting: item };
  });

  const searchHandler = (ev) => {
    setSearchValue(ev.target.value);
  };

  const isEmpty = data.incidentReports.length === 0;

  return (
    <Container className={"pt-16 pb-36"}>
      <div className="flex justify-end">
        <SearchAndSortBar
          searchValue={searchValue}
          onSearchChange={searchHandler}
          sortType={sortType}
          setSortType={setSortType}
        />
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && isEmpty && <ActiveReportingEmptyState />}

      <Grid className="mb-24 mt-14">
        {sortData(filteredActiveCardInfo, sortType.name).map(
          ({ activeReporting }) => {
            return (
              <Link
                href={`/reporting/${getParsedKey(
                  activeReporting.id.split("-")[0]
                )}/${activeReporting.id.split("-")[1]}/details`}
                key={activeReporting.id}
              >
                <a className="rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-4e7dd9">
                  <ActiveReportingCard
                    coverKey={activeReporting.key}
                    incidentDate={activeReporting.incidentDate}
                  />
                </a>
              </Link>
            );
          }
        )}
      </Grid>
      {!loading && hasMore && (
        <NeutralButton
          className={"rounded-lg border-0.5"}
          onClick={handleShowMore}
        >
          Show More
        </NeutralButton>
      )}
    </Container>
  );
};
