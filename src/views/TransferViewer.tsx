import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

import Filter from "../components/Filter";
import StatCardsContainer from "../components/StatsCards";
import { useEffect } from "react";

import {
  useCollegeDivisionStore,
  useTransferStatisticsStore,
} from "../store/transferStatistics";
import Loading from "../components/Loading";

export default function TransferViewer() {
  const collegeDivisions = useCollegeDivisionStore();
  const transferStatistics = useTransferStatisticsStore();


  useEffect(() => {
    if (!collegeDivisions.data) {
      collegeDivisions.fetchData();
    }
    if (!transferStatistics.data) {
      transferStatistics.fetchData();
    }
  }, []);

  if (collegeDivisions.error || transferStatistics.error) {
    throw new Error("사전 데이터 로딩 실패");
  }

  if (
    collegeDivisions.loading ||
    transferStatistics.loading ||
    !collegeDivisions.data ||
    !transferStatistics.data
  ) {
    return <Loading />;
  }


  return (
    <>
      <Helmet>
        <title>전북대학교 전학/전과 현황</title>
      </Helmet>
      <Box mt={4}>
        <Filter />
        <StatCardsContainer />
      </Box>
    </>
  );
}
