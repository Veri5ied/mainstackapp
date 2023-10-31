"use client";
import { useState } from "react";
import AppLayout from "@/layout/AppLayout";
import { CiCircleInfo } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";
import { BsArrowDownLeft } from "react-icons/bs";
import EmptyState from "@/components/empty-state/EmptyState";
import Slider from "@/components/slider/Slider";
import { MultiSelect } from "react-multi-select-component";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import axiosInstance from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import apiRoutes from "@/utils/apiRoutes";
import Loading from "@/components/loading/Loading";
import { mkConfig, generateCsv, download } from "export-to-csv";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryContainer,
} from "victory";

export default function Home() {
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>([]);
  const [selectedStatus, setSelectedStatus] = useState<any>([]);

  const [filteredTransact, setFilteredTransact] = useState<any>([]);
  const [state, setState] = useState<any>([]);

  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const fetchWalletBalances = async () => {
    const res = await axiosInstance.get(apiRoutes.wallet);
    return res;
  };

  const { data: walletbalance, isLoading } = useQuery({
    queryKey: ["walletbalance"],
    queryFn: () => fetchWalletBalances(),
  });

  const wallet_res = walletbalance?.data;

  const fetchTransactions = async () => {
    const res = await axiosInstance.get(apiRoutes.transaction);
    return res;
  };

  const { data: transactions, isLoading: loading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(),
  });

  const transaction_res = transactions?.data;

  const csvdata = transaction_res?.map((transaction: any) => {
    return {
      date: transaction?.date,
      amount: transaction?.amount,
      status: transaction?.status,
      product_name: transaction?.metadata?.product_name,
      name: transaction?.metadata?.name,
    };
  });

  const csv = csvdata ? generateCsv(csvConfig)(csvdata) : undefined;
  const handleExport = () => {
    download(csvConfig)(csv as any);
  };

  const handleApplyFilters = () => {
    const filteredTransactions = transaction_res?.filter((transaction: any) => {
      return (
        selectedStatus
          .map((status: { value: string }) => status.value?.toLowerCase())
          .includes(transaction?.status?.toLowerCase()) ||
        selectedTransaction
          .map((transactions: { value: string }) =>
            transactions.value?.toLowerCase()
          )
          .includes(transaction?.metadata?.product_name?.toLowerCase())
      );
    });

    setFilteredTransact(filteredTransactions);
    setShowSlider(false);
  };

  const displayTransactions =
    filteredTransact?.length === 0
      ? selectedStatus?.length === 0
        ? transaction_res
        : filteredTransact
      : filteredTransact;

  const handleClearFilter = () => {
    setSelectedStatus([]);
    setSelectedTransaction([]);
    setState([
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ]);
  };

  const transactionOptions = [
    { label: "Store Transactions", value: "Store Transactions" },
    { label: "Get Tipped", value: "Get Tipped" },
    { label: "Withdrawals", value: "Withdrawals" },
    { label: "Chargebacks", value: "Chargebacks" },
    { label: "Cashbacks", value: "Cashbacks" },
    { label: "Refer & Earn", value: "Refer & Earn" },
  ];

  const statusOptions = [
    { label: "Successful", value: "Successful" },
    { label: "Pending", value: "Pending" },
    { label: "Failed", value: "Failed" },
  ];

  const data = [
    { x: "Apr 1, 2022", y: 8 },
    { x: "Apr 30, 2022", y: 8 },
  ];

  const tickValues = [8, 8];

  return (
    <AppLayout>
      <div className="home__container">
        <div className="home__container-top">
          <div className="home__container-left">
            <div className="home__container-left-header">
              <div className="home__container-left-content">
                <p>Available Balance</p>
                <h2>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    `USD ${wallet_res?.balance?.toLocaleString()}`
                  )}
                </h2>
              </div>
              <button>Withdraw</button>
            </div>
            <div className="home__container-left-chart">
              <VictoryChart width={762} height={257}>
                <VictoryLine
                  interpolation="natural"
                  style={{
                    data: { stroke: "#FF5403" },
                    parent: { border: "1px solid #ccc" },
                  }}
                  data={data}
                />
                <VictoryAxis dependentAxis={false} tickValues={tickValues} />
              </VictoryChart>
            </div>
          </div>
          <div className="home__container-right">
            <div className="home__container-right-items">
              <p>
                Ledger Balance
                <CiCircleInfo />
              </p>
              <h3>
                {isLoading ? (
                  <Loading />
                ) : (
                  `USD ${wallet_res?.ledger_balance?.toLocaleString()}`
                )}
              </h3>
            </div>
            <div className="home__container-right-items">
              <p>
                Total Payout
                <CiCircleInfo />
              </p>
              <h3>
                {isLoading ? (
                  <Loading />
                ) : (
                  `USD ${wallet_res?.total_payout?.toLocaleString()}`
                )}
              </h3>
            </div>
            <div className="home__container-right-items">
              <p>
                Total Revenue
                <CiCircleInfo />
              </p>
              <h3>
                {isLoading ? (
                  <Loading />
                ) : (
                  `USD ${wallet_res?.total_revenue?.toLocaleString()}`
                )}
              </h3>
            </div>
            <div className="home__container-right-items">
              <p>
                Pending Payout <CiCircleInfo />
              </p>
              <h3>
                {isLoading ? (
                  <Loading />
                ) : (
                  `USD ${wallet_res?.pending_payout?.toLocaleString()}`
                )}
              </h3>
            </div>
          </div>
        </div>
        <div className="home__container-bottom">
          <div className="home__container-bottom--header">
            <div className="home__container--header-left">
              <h2>{displayTransactions?.length} Transactions</h2>
              <p>Your transactions for the last 7 days</p>
            </div>
            <div className="home__container--header-right">
              <button onClick={() => setShowSlider(!showSlider)}>
                Filter <MdKeyboardArrowDown size={22} />
              </button>
              <button onClick={handleExport}>
                Export list <AiOutlineDownload size={22} />
              </button>
            </div>
          </div>
          <div className="home__container-bottom-transactions">
            {loading && (
              <div
                className="loading__container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Loading />
              </div>
            )}
            {!loading && displayTransactions?.length === 0 && (
              <EmptyState onClick={handleClearFilter} />
            )}
            {!loading &&
              displayTransactions?.length > 0 &&
              displayTransactions?.map((transaction: any, idx: number) => (
                <div className="transaction--items" key={idx}>
                  <div className="transaction--items-left">
                    <div
                      className="transaction-icon"
                      style={{
                        backgroundColor:
                          transaction?.status === "successful"
                            ? "#E3FCF2"
                            : "#F9E3E0",
                      }}
                    >
                      <BsArrowDownLeft
                        size={22}
                        color={
                          transaction?.status === "successful"
                            ? "#075132"
                            : "#961100"
                        }
                      />
                    </div>
                    <div className="transaction--item-content">
                      <p>
                        {transaction?.metadata?.product_name
                          ? transaction?.metadata?.product_name
                          : "No product name"}
                      </p>
                      <span>{transaction?.metadata?.name}</span>
                    </div>
                  </div>
                  <div className="transaction--items-right">
                    <h3>USD {transaction?.amount}</h3>
                    <p>{transaction?.date}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Slider show={showSlider} setShowNav={setShowSlider} title="Filter">
        <div className="home__filter-slider-container">
          <div className="home__filter-ranges-options">
            <div className="filter-date-options">Today</div>
            <div className="filter-date-options">Last 7 days</div>
            <div className="filter-date-options">This month</div>
            <div className="filter-date-options">Last 3 months</div>
          </div>
          <div className="home__filter-date-range">
            <label>Date Range</label>
            {/* <DateRange
              editableDateInputs={true}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            /> */}
            <div className="date_range-input">
              <input type="date" />
              <input type="date" />
            </div>
          </div>
          <div className="home__filter-transaction-select">
            <label>Transaction Type</label>
            <MultiSelect
              options={transactionOptions}
              value={selectedTransaction}
              onChange={setSelectedTransaction}
              labelledBy="Select"
              className="filter-select-input"
              disableSearch
              hasSelectAll={false}
            />
          </div>
          <div className="home__filter-transaction-select">
            <label>Transaction Status</label>
            <MultiSelect
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              labelledBy="Select"
              className="filter-select-input"
              disableSearch
              hasSelectAll={false}
            />
          </div>
          <div className="home__filter-slider-btns">
            <button className="clear-filter">Clear</button>
            <button className="apply-filter" onClick={handleApplyFilters}>
              Apply
            </button>
          </div>
        </div>
      </Slider>
    </AppLayout>
  );
}
