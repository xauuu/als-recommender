import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ItemPopular from "./../../components/ItemPopular/index";
import { getTopNovels } from "./../../apis/home";
import { useQuery } from "@tanstack/react-query";

const PopularSection = () => {
  const { data: topWeek, isLoading: isLoadingW } = useQuery(["weekly", 5], () => getTopNovels(5));
  const { data: topMonth, isLoading: isLoadingM } = useQuery(["monthly", 5], () => getTopNovels(5));
  const { data: topAll, isLoading: isLoadingA } = useQuery(["all", 5], () => getTopNovels(5));
  return (
    <div className="section-popular">
      <div className="section-popular__title">Popular</div>
      <Tabs variant="pills" defaultActiveKey="weekly" className="mb-3 custom-tab">
        <Tab eventKey="weekly" title="Weekly">
          {!isLoadingW && topWeek.map((novel, index) => <ItemPopular serial={index + 1} novel={novel} key={index} />)}
        </Tab>
        <Tab eventKey="monthly" title="Monthly">
          {!isLoadingM && topMonth.map((novel, index) => <ItemPopular serial={index + 1} novel={novel} key={index} />)}
        </Tab>
        <Tab eventKey="all" title="All">
          {!isLoadingA && topAll.map((novel, index) => <ItemPopular serial={index + 1} novel={novel} key={index} />)}
        </Tab>
      </Tabs>
    </div>
  );
};

export default PopularSection;
