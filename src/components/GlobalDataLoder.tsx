import { useEffect } from "react";
import {
  useCollegeDivisionStore,
  useTransferStatisticsStore,
} from "../store/transferStatistics";
// import { Outlet } from "react-router-dom";
import Loading from "./common/Loading";
import { Outlet } from "react-router-dom";

export default function GlobalDataLoader() {
  const collegeDivisionsStore = useCollegeDivisionStore();

  const transferStatisticsStore = useTransferStatisticsStore();

  useEffect(() => {
    if (!collegeDivisionsStore.data) {
      collegeDivisionsStore.fetchData();
    }
    if (!transferStatisticsStore.data) {
      transferStatisticsStore.fetchData();
    }
  }, [
    collegeDivisionsStore.data,
    transferStatisticsStore.data,
    collegeDivisionsStore.fetchData,
    transferStatisticsStore.fetchData,
  ]);

  const isLoading =
    collegeDivisionsStore.isLoading || transferStatisticsStore.isLoading;
  const error = collegeDivisionsStore.error || transferStatisticsStore.error;
  const isDataLoaded =
    collegeDivisionsStore.data !== null &&
    transferStatisticsStore.data !== null;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    throw error;
  }

  if (!isDataLoaded) {
    return null;
  }

  return <Outlet />;
}
