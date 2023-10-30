"use client";
import { useState } from "react";
import AppLayout from "@/layout/AppLayout";
import { CiCircleInfo } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";
import { BsArrowDownLeft } from "react-icons/bs";
import { sampledata } from "@/utils/data";
import EmptyState from "@/components/empty-state/EmptyState";
import Slider from "@/components/slider/Slider";
import { MultiSelect } from "react-multi-select-component";

export default function Home() {
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>([]);
  const [selectedStatus, setSelectedStatus] = useState<any>([]);

  const handleClearFilter = () => {
    console.log("Clear Filter");
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

  return (
    <AppLayout>
      <div className="home__container">
        <div className="home__container-top">
          <div className="home__container-left">
            <div className="home__container-left-header">
              <div className="home__container-left-content">
                <p>Available Balance</p>
                <h2>USD 120,500.00</h2>
              </div>
              <button>Withdraw</button>
            </div>
          </div>
          <div className="home__container-right">
            <div className="home__container-right-items">
              <p>
                Ledger Balance
                <CiCircleInfo />
              </p>
              <h3>USD 0.00</h3>
            </div>
            <div className="home__container-right-items">
              <p>
                Total Payout
                <CiCircleInfo />
              </p>
              <h3>USD 55,080.00</h3>
            </div>
            <div className="home__container-right-items">
              <p>
                Total Revenue
                <CiCircleInfo />
              </p>
              <h3>USD 175,580.00</h3>
            </div>
            <div className="home__container-right-items">
              <p>
                Pending Payout <CiCircleInfo />
              </p>
              <h3>USD 0.00</h3>
            </div>
          </div>
        </div>
        <div className="home__container-bottom">
          <div className="home__container-bottom--header">
            <div className="home__container--header-left">
              <h2>{sampledata.length} Transactions</h2>
              <p>Your transactions for the last 7 days</p>
            </div>
            <div className="home__container--header-right">
              <button onClick={() => setShowSlider(!showSlider)}>
                Filter <MdKeyboardArrowDown size={22} />
              </button>
              <button>
                Export list <AiOutlineDownload size={22} />
              </button>
            </div>
          </div>
          <div className="home__container-bottom-transactions">
            {sampledata?.map(
              ({ narration, name, price, date, status }, idx) => (
                <div className="transaction--items" key={idx}>
                  <div className="transaction--items-left">
                    <div
                      className="transaction-icon"
                      style={{
                        backgroundColor:
                          status === "success" ? "#E3FCF2" : "#F9E3E0",
                      }}
                    >
                      <BsArrowDownLeft
                        size={22}
                        color={status === "success" ? "#075132" : "#961100"}
                      />
                    </div>
                    <div className="transaction--item-content">
                      <p>{narration}</p>
                      <span>{name}</span>
                    </div>
                  </div>
                  <div className="transaction--items-right">
                    <h3>{price}</h3>
                    <p>{date}</p>
                  </div>
                </div>
              )
            )}
            {/* <EmptyState onClick={handleClearFilter} /> */}
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
          <div className="home__filter-date-range"></div>
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
            <button className="apply-filter">Apply</button>
          </div>
        </div>
      </Slider>
    </AppLayout>
  );
}
